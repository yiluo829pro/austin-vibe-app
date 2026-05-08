import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'austin-vibe-votes'
const RATE_LIMIT_KEY = 'austin-vibe-vote-timestamps'
const MAX_VOTES_PER_HOUR = 10

function loadVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveVotes(votes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
}

function getVoteTimestamps() {
  try {
    return JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]')
  } catch {
    return []
  }
}

function recordVoteTimestamp() {
  const now = Date.now()
  const timestamps = getVoteTimestamps().filter(t => now - t < 3600000)
  timestamps.push(now)
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps))
}

function isRateLimited() {
  const now = Date.now()
  const recent = getVoteTimestamps().filter(t => now - t < 3600000)
  return recent.length >= MAX_VOTES_PER_HOUR
}

export function useVotes(categorySlug) {
  const [votes, setVotes] = useState({})

  useEffect(() => {
    const all = loadVotes()
    setVotes(all[categorySlug] || {})
  }, [categorySlug])

  const castVote = useCallback((placeId, direction) => {
    if (isRateLimited()) return { error: 'rate_limited' }

    setVotes(prev => {
      const all = loadVotes()
      const categoryVotes = { ...prev }
      const current = categoryVotes[placeId]

      if (current === direction) {
        delete categoryVotes[placeId]
      } else {
        categoryVotes[placeId] = direction
      }

      all[categorySlug] = categoryVotes
      saveVotes(all)
      recordVoteTimestamp()
      return categoryVotes
    })

    return { error: null }
  }, [categorySlug])

  const getVote = useCallback((placeId) => {
    return votes[placeId] || null
  }, [votes])

  return { votes, castVote, getVote }
}
