const OMDB_KEY = '1eeaebfd'

export type MovieShort = {
  Title: string
  Year: string
  Poster: string
  imdbID: string
}

export type MovieFull = {
  Title: string
  Year: string
  Poster: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  imdbRating: string
}

export const searchMovies = async (query: string): Promise<MovieShort[]> => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(query)}`
  )
  const data = await res.json()
  return data.Response === 'True' ? data.Search : []
}

export const getMovieById = async (id: string): Promise<MovieFull> => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}&plot=full`
  )
  const data = await res.json()
  if (data.Response === 'False') throw new Error('Фильм не найден')
  return data
}

// ========== ПОГОДА (Open-Meteo) ==========
export type WeatherResult = {
  city: string
  country: string
  current: { temp: number; wind: number }
  daily: { date: string; min: number; max: number; precip: number }[]
}

export const getWeather = async (city: string): Promise<WeatherResult> => {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru`
  )
  const geoData = await geoRes.json()

  if (!geoData.results?.length) {
    throw new Error('Город не найден')
  }

  const { latitude, longitude, name, country } = geoData.results[0]

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=3&timezone=auto`
  )
  const weatherData = await weatherRes.json()

  return {
    city: name,
    country,
    current: {
      temp: weatherData.current.temperature_2m,
      wind: weatherData.current.wind_speed_10m,
    },
    daily: weatherData.daily.time.map((date: string, i: number) => ({
      date,
      min: weatherData.daily.temperature_2m_min[i],
      max: weatherData.daily.temperature_2m_max[i],
      precip: weatherData.daily.precipitation_sum[i],
    })),
  }
}

// ========== КОНВЕРТЕР ВАЛЮТ (exchangerate.host с твоим ключом) ==========
const CURRENCY_API_KEY = 'd8b9d0b46e2f4ba01a0931346c0bac5d'

export type CurrencyResult = {
  success: boolean
  query: { from: string; to: string; amount: number }
  info: { quote: number }
  result: number
}

export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<CurrencyResult> => {
  const res = await fetch(
    `https://api.exchangerate.host/convert?access_key=${CURRENCY_API_KEY}&from=${from}&to=${to}&amount=${amount}`
  )
  const data = await res.json()

  if (!data.success) {
    throw new Error('Ошибка при конвертации')
  }

  return data
}
