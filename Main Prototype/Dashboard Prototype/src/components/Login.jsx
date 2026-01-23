import { useState } from 'react'
import { login } from '../utils/auth'
import './Login.css'

function Login({ onLogin }) {
  const [pin, setPin] = useState('')
  const [tan, setTan] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(pin, tan)
    
    if (result.success) {
      onLogin(result.user)
    } else {
      setError(result.error || 'Login fehlgeschlagen')
    }
    
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🐾 PetFinder</h1>
        <h2>Anmeldung</h2>
        <p className="login-hint">
          Bitte geben Sie Ihre PIN und TAN ein, um sich anzumelden.
        </p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="pin">PIN</label>
            <input
              type="text"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="z.B. 1234"
              maxLength="6"
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tan">TAN</label>
            <input
              type="text"
              id="tan"
              value={tan}
              onChange={(e) => setTan(e.target.value.toUpperCase())}
              placeholder="z.B. ABC123"
              maxLength="8"
              required
              autoComplete="off"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Kein Konto? Bitte wenden Sie sich an einen Administrator.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

