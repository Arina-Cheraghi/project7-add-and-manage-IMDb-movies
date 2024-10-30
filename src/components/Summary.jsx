import React from 'react';
import { average } from '../utils';

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div className='dets'>
        <p>
          <span>{watched.length}</span> movies
        </p>
        <p>
          <span>⭐</span>
          {avgImdbRating.toFixed(2)} IMDb Rating
        </p>
        <p>
          <span>⭐</span>
          {avgUserRating.toFixed(2)} User Rating
        </p>
        <p>
          <span>⏳</span>
          {avgRuntime.toFixed(0)} min
        </p>
      </div>
    </div>
  );
}

export default Summary;
