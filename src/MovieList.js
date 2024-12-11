import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("Iron Man");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedMovie, setExpandedMovie] = useState(null);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/`;

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce duration

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchMovies = useCallback(async () => {
    if (!debouncedSearchTerm) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${debouncedSearchTerm}&page=${page}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies((prev) => [...prev, ...data.Search]);
      } else {
        setError(data.Error || "Failed to fetch movies");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    }
    setLoading(false);
  }, [API_KEY, API_URL, page, debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    setMovies([]);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMovieDetails = (imdbID) => {
    setExpandedMovie((prev) => (prev === imdbID ? null : imdbID));
  };

  return (
    <div className="max-w-3xl mx-auto font-sans p-6 bg-gray-900 text-gray-100">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 border border-gray-700 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-800 text-gray-200 placeholder-gray-400"
      />
      {loading && page === 1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="text-center text-teal-400 text-lg">Loading...</div>
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      <ul className="space-y-6">
        {movies.map((movie) => (
          <li
            key={movie.imdbID}
            className="p-5 border border-gray-700 rounded-md hover:shadow-lg hover:shadow-teal-500/50 cursor-pointer transition-shadow"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => toggleMovieDetails(movie.imdbID)}
            >
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              {expandedMovie === movie.imdbID ? (
                <AiOutlineUp className="text-xl text-teal-400" />
              ) : (
                <AiOutlineDown className="text-xl text-teal-400" />
              )}
            </div>
            {expandedMovie === movie.imdbID && (
              <div className="mt-4">
                <p className="text-sm text-gray-400">Year: {movie.Year}</p>
                <p className="text-sm text-gray-400">Type: {movie.Type}</p>
                {movie.Poster !== "N/A" && (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="mt-4 rounded-md shadow-md"
                  />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {loading && page > 1 && (
        <div className="text-center text-teal-400 mt-6">
          Fetching more movies...
        </div>
      )}
    </div>
  );
};

export default MovieList;
