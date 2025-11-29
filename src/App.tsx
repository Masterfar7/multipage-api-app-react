import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WeatherPage from './pages/WeatherPage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import ConverterPage from './pages/ConverterPage'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/weather">Погода</Link>
        <Link to="/movies">Фильмы</Link>
        <Link to="/converter">Конвертер</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </>
  )
}
