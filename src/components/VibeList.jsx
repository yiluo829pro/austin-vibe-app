import { useState, useMemo } from 'react'
import { categories } from '../data/categories'
import { places as allPlaces } from '../data/places'
import { useVotes } from '../hooks/useVotes'
import { useNominations } from '../hooks/useNominations'
import { PlaceCard } from './PlaceCard'
import { NominateForm } from './NominateForm'
import { Toast, useToast } from './Toast'

const TOP_N = 10

function computeScore(place, votes) {
  const vote = votes[place.id]
  const voteBonus = vote === 'up' ? 1 : vote === 'down' ? -1 : 0
  return place.baseScore + voteBonus
}

export function VibeList({ slug, onBack }) {
  const category = categories.find(c => c.slug === slug)
  const seedPlaces = [
    ...(allPlaces[slug] || []),
    ...(allPlaces[`${slug}_extra`] || []),
  ]
  const { votes, castVote } = useVotes(slug)
  const { nominations, addNomination } = useNominations(slug)
  const [expanded, setExpanded] = useState(false)
  const { toast, showToast, setToast } = useToast()

  const rankedPlaces = useMemo(() => {
    const all = [
      ...seedPlaces,
      ...nominations,
    ]
    return all
      .map(p => ({ ...p, displayScore: computeScore(p, votes) }))
      .sort((a, b) => b.displayScore - a.displayScore)
  }, [seedPlaces, nominations, votes])

  const visiblePlaces = expanded ? rankedPlaces : rankedPlaces.slice(0, TOP_N)
  const hiddenCount = rankedPlaces.length - TOP_N

  const handleVote = (placeId, direction) => {
    const result = castVote(placeId, direction)
    if (result?.error === 'rate_limited') {
      showToast('Easy there — max 10 votes per hour.')
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    const title = `Austin Vibe — ${category?.name}`
    const text = `Where should we go? Vote on the best ${category?.name} spots in Austin 🔥`
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard!')
    }
  }

  if (!category) {
    return (
      <div className="not-found">
        <p>Vibe not found.</p>
        <button className="back-btn" onClick={onBack}>← Back to vibes</button>
      </div>
    )
  }

  return (
    <div className="vibe-list-page">
      <div className="vibe-header">
        <button className="back-btn" onClick={onBack}>← All vibes</button>
        <button className="share-btn" onClick={handleShare}>Share ↗</button>
      </div>

      <div className="vibe-hero">
        <span className="vibe-emoji">{category.emoji}</span>
        <h1 className="vibe-title">{category.name}</h1>
        <p className="vibe-description">{category.description}</p>
        <span className="vibe-spot-count">{rankedPlaces.length} spots</span>
      </div>

      <div className="places-list">
        {visiblePlaces.map((place, idx) => (
          <PlaceCard
            key={place.id}
            place={place}
            rank={idx + 1}
            userVote={votes[place.id] || null}
            displayScore={place.displayScore}
            onVote={handleVote}
          />
        ))}
      </div>

      {!expanded && hiddenCount > 0 && (
        <button
          className="expand-btn"
          onClick={() => setExpanded(true)}
        >
          ▾ Show {hiddenCount} more spots
        </button>
      )}

      {expanded && hiddenCount > 0 && (
        <button
          className="expand-btn collapse"
          onClick={() => setExpanded(false)}
        >
          ▴ Show less
        </button>
      )}

      <NominateForm onNominate={addNomination} />

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
