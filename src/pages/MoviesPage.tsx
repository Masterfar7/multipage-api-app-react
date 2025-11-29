import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/api";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  return (
    <>
      <h1>Фильмы</h1>

      <form onSubmit={handleSearch} className="form-group">
        <input
          type="text"
          placeholder="Название фильма"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Поиск..." : "Найти"}
        </button>
      </form>

      {loading && (
        <div className="loading">Поиск...</div>
      )}

      {/* Сетка фильмов */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movies/${movie.imdbID}`}
            className="movie-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.Title}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300x450?text=No+Image";
              }}
            />

            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
          </Link>
        ))}
      </div>

      {!loading && movies.length === 0 && query && (
        <p
          style={{
            textAlign: "center",
            marginTop: "3rem",
            color: "#8b949e",
          }}
        >
          Ничего не найдено
        </p>
      )}
    </>
  );
}
