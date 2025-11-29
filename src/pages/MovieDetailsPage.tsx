import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieById } from '../api/api'

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    getMovieById(id)
      .then(setMovie)
      .catch(() => setMovie(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.3rem' }}>Загрузка...</div>
  }

  if (!movie) {
    return <div className="card" style={{ textAlign: 'center', color: '#e74c3c' }}>
      Фильм не найден
    </div>
  }

  return (
    <div className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2.2rem' }}>
        {movie.Title} ({movie.Year})
      </h2>

      {movie.Poster !== 'N/A' && (
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={{
            display: 'block',
            margin: '0 auto 1.5rem',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow)',
          }}
        />
      )}

      <div style={{ lineHeight: '1.9', fontSize: '1.1rem' }}>
        {movie.Genre && <p><strong>Жанр:</strong> {movie.Genre}</p>}
        {movie.Director && <p><strong>Режиссёр:</strong> {movie.Director}</p>}
        {movie.Actors && <p><strong>Актёры:</strong> {movie.Actors}</p>}
        {movie.Plot && (
          <>
            <p><strong>Описание:</strong></p>
            <p style={{ margin: '0.5rem 0 1rem' }}>{movie.Plot}</p>
          </>
        )}
        {movie.imdbRating && <p><strong>IMDB:</strong> {movie.imdbRating}/10</p>}
      </div>

      <Link
        to="/movies"
        style={{
          display: 'block',
          width: '200px',
          margin: '2rem auto 0',
          padding: '0.8rem',
          background: 'var(--accent)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '0.8rem',
          textDecoration: 'none',
          fontWeight: '600',
          boxShadow: 'var(--shadow)',
          transition: '0.2s',
        }}
      >
        ← Назад к поиску
      </Link>
    </div>
  )
}
