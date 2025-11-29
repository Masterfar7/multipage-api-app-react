import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies, getMovieByTitle } from "../api/api";

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const POPULAR = ["Inception", "The Dark Knight", "Interstellar", "Avatar", "Titanic"];

  // Загружаем популярные при открытии
  useEffect(() => {
    async function loadPopular() {
      setLoading(true);
      const results = await Promise.all(
        POPULAR.map((title) => getMovieByTitle(title))
      );
      setMovies(results);
      setLoading(false);
    }
    loadPopular();
  }, []);

  // Поиск
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results || []);
    setLoading(false);
  }

  return (
    <>
      <h1>Фильмы</h1>

      <form onSubmit={handleSearch} className="form-group">
        <input
          type="text"
          placeholder="Название фильма..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Поиск..." : "Найти"}
        </button>
      </form>

      {loading && <div className="loading">Загрузка...</div>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movies/${movie.imdbID}`}
            className="movie-card"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movie.Title}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300x450?text=No+Poster";
              }}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
          </Link>
        ))}
      </div>

      {!loading && movies.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Ничего не найдено
        </p>
      )}
    </>
  );
}
