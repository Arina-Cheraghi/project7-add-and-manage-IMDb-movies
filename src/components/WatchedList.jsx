import React from "react";
import "../assets/WatchedList.css";

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="w-list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.Title} poster`} />
          <div className="w-list-info">
            <h3>{movie.title}</h3>
            <div className="w-list-rating">
              <span>⭐ {movie.imdbRating} IMDb </span>
              <span>⭐ {movie.userRating} User </span>
              <span>⏳ {movie.runtime} min</span>
            </div>
          </div>
          <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>&times;</button>
        </li>
      ))}
    </ul>
  );
}

export default WatchedList;
