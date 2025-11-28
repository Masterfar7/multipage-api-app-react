import { useState } from 'react'
import { getWeather } from '../api/api'

export default function WeatherPage() {
  const [city, setCity] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError('')
    setData(null)

    try {
      const result = await getWeather(city)
      setData(result)
    } catch (err: any) {
      setError(err.message || 'Город не найден')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Погода</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Введите город (например: Москва, Лондон)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Загрузка...' : 'Показать погоду'}
        </button>
      </form>

      {error && <div className="loading error">{error}</div>}

      {data && (
        <div className="result">
          <h2>{data.city}, {data.country}</h2>
          <p>Сейчас: <strong>{data.current.temp}°C</strong></p>
          <p>Ветер: {data.current.wind} м/с</p>
          <h3>Прогноз на 3 дня:</h3>
          {data.daily.map((day: any) => (
            <div key={day.date} style={{ margin: '0.8rem 0' }}>
              <strong>{new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</strong><br />
              {day.min}°C ... {day.max}°C, осадки: {day.precip} мм
            </div>
          ))}
        </div>
      )}
    </>
  )
}