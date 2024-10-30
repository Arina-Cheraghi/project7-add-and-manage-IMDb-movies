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

// اول یک custom hook برای localStorage می‌سازیم
function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(function () {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

function App() {
  const [query, setQuery] = useLocalStorageState("", "searchQuery");
  const [movies, setMovies] = useLocalStorageState([], "searchResults");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(() => {
    const stored = localStorage.getItem("selectedMovie");
    return stored ? JSON.parse(stored) : null;
  });
  
  // استفاده از localStorage برای watched movies
  const [watched, setWatched] = useLocalStorageState([], "watched");

  useEffect(() => {
    localStorage.setItem("selectedMovie", JSON.stringify(selectedId));
  }, [selectedId]);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(function () {
    const controller = new AbortController();
    
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=8de2af02&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        
        if (data.Response === "False") throw new Error("Movie not found");
        
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name === "AbortError") {
          // Ignore abort errors
          return;
        }
        
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 300); 
    
    return function () {
      controller.abort();
      clearTimeout(timeoutId);
    };
}, [query]);

  return (
    <div className="App">
      <Header movies={movies} query={query} setQuery={setQuery} />
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
