import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchMovies, type MovieShort } from '../api/api'

const POPULAR = ['Inception', 'Interstellar', 'Avatar', 'Titanic', 'The Matrix']

export default function MoviesPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<MovieShort[]>([])
  const [loading, setLoading] = useState(false)

  // Загружаем популярные фильмы при открытии страницы
  useEffect(() => {
    loadPopular()
  }, [])

  // Загрузка популярных фильмов
  const loadPopular = async () => {
    setLoading(true)
    const results = await Promise.all(
      POPULAR.map(title => searchMovies(title).then(r => r[0]))
    )
    setMovies(results.filter(Boolean))
    setLoading(false)
  }

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    const results = await searchMovies(query)
    setMovies(results)
    setLoading(false)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Поиск фильмов</h1>

      {/* Форма поиска */}
      <form
        onSubmit={onSearch}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <input
          type="text"
          placeholder="Введите название..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '0.6rem',
            border: '1px solid #ccc',
            width: '260px',
            fontSize: '1rem'
          }}
        />

        <button
          type="submit"
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '0.6rem',
            border: 'none',
            background: 'var(--accent)',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Найти
        </button>
      </form>

      {loading && (
        <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>Загрузка...</div>
      )}

      {/* Список фильмов */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center'
        }}
      >
        {movies.map(movie => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}   // ← ВАЖНО! Теперь работает
            className="movie-card"
            style={{
              width: '180px',
              textDecoration: 'none',
              color: 'inherit',
              padding: '0.5rem',
              borderRadius: '0.8rem',
              background: 'white',
              boxShadow: 'var(--shadow)',
              textAlign: 'center'
            }}
          >
            <img
              src={
                movie.Poster && movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.Title}
              style={{
                width: '100%',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '0.6rem',
                marginBottom: '0.5rem'
              }}
            />

            <strong>{movie.Title}</strong>
            <div style={{ opacity: 0.7 }}>{movie.Year}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
