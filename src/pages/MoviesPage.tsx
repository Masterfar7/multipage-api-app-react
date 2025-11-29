import { useState } from 'react'
import { searchMovies } from '../api/api'
import { Link } from 'react-router-dom'

export default function MoviesPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    const result = await searchMovies(query)
    setMovies(result)
    setLoading(false)
  }

  return (
    <div className="card">

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Введите название фильма..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '0.7rem 1rem',
            width: '70%',
            maxWidth: '400px',
            marginRight: '1rem'
          }}
        />
        <button
          style={{
            padding: '0.8rem 1.2rem',
            background: 'var(--accent)',
            color: 'white',
            borderRadius: '0.7rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Поиск
        </button>
      </form>

      {loading && (
        <p style={{ textAlign: 'center', fontSize: '1.3rem' }}>Загрузка...</p>
      )}

      <div className="movie-grid">
        {movies.map((m) => (
          <Link
            key={m.imdbID}
            to={`/movie/${m.imdbID}`}
            className="movie-card"
          >
            <img
              src={
                m.Poster && m.Poster !== 'N/A'
                  ? m.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={m.Title}
            />
            <strong>{m.Title}</strong>
            <div>{m.Year}</div>
          </Link>
        ))}
      </div>

      {movies.length === 0 && !loading && (
        <p style={{ textAlign: 'center', opacity: 0.6 }}>
          Ничего не найдено. Введите название фильма.
        </p>
      )}
    </div>
  )
}
