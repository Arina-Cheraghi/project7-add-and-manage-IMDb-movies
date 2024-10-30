import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import Summary from "./components/Summary";
import WatchedList from "./components/WatchedList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const tempQuery = "interstellar";


  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);

  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(function () {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=58765773&s=${tempQuery}`,
          { signal: controller.signal })

        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json()
        setMovies(data.Search);
        setError("");
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        if (err.name !== "Abort") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies()
    return function () {
      controller.abort();
    }
  }, []);

  return (
    <div className="App">
      <Header movies={movies} />
      <Main>
        <Box>
          {!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie} movies={movies} />}
          {error && <ErrorMessage message={error} />}
          {isLoading && <Loader />}
        </Box>
        <Box>
          {selectedId ? <MovieDetails
            watched={watched}
            onAddWatched={handleAddWatched}
            onCloseMovie={handleCloseMovie}
            selectedId={selectedId} />
            :
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>}
        </Box>
      </Main>
    </div>
  );
}

export default App;
