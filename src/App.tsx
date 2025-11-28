import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WeatherPage from './pages/WeatherPage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import ConverterPage from './pages/ConverterPage'

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <nav>
        <Link to="/" className={pathname === '/' ? 'active' : ''}>Главная</Link>
        <Link to="/weather" className={pathname === '/weather' ? 'active' : ''}>Погода</Link>
        <Link to="/movies" className={pathname === '/movies' || pathname.startsWith('/movie/') ? 'active' : ''}>Фильмы</Link>
        <Link to="/converter" className={pathname === '/converter' ? 'active' : ''}>Конвертер</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/converter" element={<ConverterPage />} />
      </Routes>
    </>
  )
}