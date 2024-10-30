import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import "../assets/MovieDetails.css";
import Loader from "./Loader";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(() => {
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    return ratings[selectedId] || 0;
  });

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setLoading(true);
          
          const cachedMovie = localStorage.getItem(`movie-${selectedId}`);
          if (cachedMovie) {
            setMovie(JSON.parse(cachedMovie));
            setLoading(false);
            return;
          }

          const res = await fetch(
            `http://www.omdbapi.com/?i=${selectedId}&apikey=58765773`
          );
          const data = await res.json();
          setMovie(data);
          
          localStorage.setItem(`movie-${selectedId}`, JSON.stringify(data));
          
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `movie: ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(() => {
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    if (userRating > 0) {
      localStorage.setItem(
        'userRatings', 
        JSON.stringify({ ...ratings, [selectedId]: userRating })
      );
    }
  }, [userRating, selectedId]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);

    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    delete ratings[selectedId];
    localStorage.setItem('userRatings', JSON.stringify(ratings));
    
    onCloseMovie();
  }

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}
                <br></br>
                &bull;
                {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐{imdbRating} IMDb Rating</p>
            </div>
          </header>
          <section className="details-main">
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />
                  {Number(userRating) > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className="rated">
                  you already rated this movie {watchedUserRating} ⭐
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
