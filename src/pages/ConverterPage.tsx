import { useState } from 'react'
import { convertCurrency } from '../api/api'

const currencies = ['USD', 'EUR', 'RUB', 'GBP', 'JPY', 'CNY', 'KZT', 'UAH', 'BYN', 'PLN']

export default function ConverterPage() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('RUB')
  const [result, setResult] = useState<CurrencyResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || amount <= 0) {
      setError('Введите корректную сумму')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await convertCurrency(amount, from, to)
      setResult(data)
    } catch (err) {
      setError('Ошибка при конвертации. Проверьте валюты')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Конвертер валют</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="Сумма"
          />
        </div>

        <div className="form-group">
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Конвертировать'}
        </button>
      </form>

      {error && <div className="card" style={{ color: '#e74c3c' }}>{error}</div>}

      {result && (
        <div className="card currency-result">
          <p>
            {amount} {from} = <strong>{result.result.toFixed(2)} {to}</strong>
          </p>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem', opacity: 0.9 }}>
            Курс: 1 {from} = {result.info.quote.toFixed(4)} {to}
          </p>
        </div>
      )}
    </>
  )
}