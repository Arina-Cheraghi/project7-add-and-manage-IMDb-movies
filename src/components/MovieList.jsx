import React, { useState, useEffect } from "react";
import "../assets/Main.css"

function MovieList({movies, onSelectMovie}) {

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
