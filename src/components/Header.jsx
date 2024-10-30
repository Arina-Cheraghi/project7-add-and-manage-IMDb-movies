import React, { useState } from "react";
import "../assets/Header.css";

const Header = ({ movies = [], query, setQuery }) => {

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🍿usePopcorn</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="search for movies..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <p className="results-count">
          found <strong>{movies.length}</strong> results
        </p>
      </div>
    </div>
  );
};

export default Header;
