import { useState } from 'react'

export function NominateForm({ onNominate }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onNominate(name, address)
    setName('')
    setAddress('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="nominate-section">
      <h3 className="nominate-title">Know a spot that's missing?</h3>
      <p className="nominate-sub">Nominate it — 5 upvotes and it joins the list.</p>
      {submitted ? (
        <div className="nominate-success">
          Nice one! Your nomination is pending. Share the list to get it voted up.
        </div>
      ) : (
        <form className="nominate-form" onSubmit={handleSubmit}>
          <input
            className="nominate-input"
            type="text"
            placeholder="Place name *"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={80}
            required
          />
          <input
            className="nominate-input"
            type="text"
            placeholder="Neighborhood or address (optional)"
            value={address}
            onChange={e => setAddress(e.target.value)}
            maxLength={100}
          />
          <button
            className="nominate-btn"
            type="submit"
            disabled={!name.trim()}
          >
            Nominate this spot
          </button>
        </form>
      )}
    </div>
  )
}
