import { useState, useEffect } from 'react'
import { generateInvitationCode } from '../utils/auth'
import './InvitationCodes.css'

function InvitationCodes() {
  const [codes, setCodes] = useState([])
  const [newCode, setNewCode] = useState(null)

  const loadCodes = () => {
    const storedCodes = JSON.parse(localStorage.getItem('petfinder_invitation_codes') || '[]')
    setCodes(storedCodes)
  }

  useEffect(() => {
    loadCodes()
  }, [])

  const handleGenerateCode = () => {
    const code = generateInvitationCode()
    const codeData = {
      code: code,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      used: false
    }
    
    // Store in localStorage
    const storedCodes = JSON.parse(localStorage.getItem('petfinder_invitation_codes') || '[]')
    storedCodes.push(codeData)
    localStorage.setItem('petfinder_invitation_codes', JSON.stringify(storedCodes))
    
    setNewCode(codeData)
    loadCodes()
  }

  return (
    <div className="invitation-codes">
      <div className="section-header">
        <h2>Einladungscodes</h2>
        <button className="btn-primary" onClick={handleGenerateCode}>
          + Neuen Code generieren
        </button>
      </div>

      {newCode && (
        <div className="success-card">
          <h3>✅ Einladungscode generiert!</h3>
          <div className="credentials">
            <p><strong>Code:</strong> <code>{newCode.code}</code></p>
            <p><strong>Gültig bis:</strong> {new Date(newCode.expiresAt).toLocaleDateString('de-DE')}</p>
            <p className="hint">Dieser Code kann verwendet werden, um Benutzer zu Suchaktionen einzuladen.</p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => setNewCode(null)}
          >
            Schließen
          </button>
        </div>
      )}

      <div className="codes-list">
        <h3>Alle Einladungscodes ({codes.length})</h3>
        {codes.length === 0 ? (
          <p className="empty-state">Noch keine Codes generiert.</p>
        ) : (
          <table className="codes-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Erstellt am</th>
                <th>Gültig bis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((codeData, index) => {
                const isExpired = new Date(codeData.expiresAt) < new Date()
                return (
                  <tr key={index}>
                    <td><code>{codeData.code}</code></td>
                    <td>{new Date(codeData.createdAt).toLocaleDateString('de-DE')}</td>
                    <td>{new Date(codeData.expiresAt).toLocaleDateString('de-DE')}</td>
                    <td>
                      <span className={`status-badge ${isExpired || codeData.used ? 'inactive' : 'active'}`}>
                        {codeData.used ? 'Verwendet' : isExpired ? 'Abgelaufen' : 'Aktiv'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default InvitationCodes

