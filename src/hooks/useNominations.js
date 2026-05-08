import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'austin-vibe-nominations'

function loadNominations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveNominations(nominations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nominations))
}

export function useNominations(categorySlug) {
  const [nominations, setNominations] = useState([])

  useEffect(() => {
    const all = loadNominations()
    setNominations(all[categorySlug] || [])
  }, [categorySlug])

  const addNomination = useCallback((name, address) => {
    const nomination = {
      id: `nom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      address: address.trim(),
      vibeDesc: 'Community-nominated spot',
      neighborhood: address.trim() || 'Austin',
      tags: ['community'],
      baseScore: 0,
      votes: 0,
      pending: true,
      source: 'community',
      nominatedAt: Date.now(),
    }

    setNominations(prev => {
      const all = loadNominations()
      const updated = [...prev, nomination]
      all[categorySlug] = updated
      saveNominations(all)
      return updated
    })

    return nomination
  }, [categorySlug])

  const upvoteNomination = useCallback((nominationId) => {
    setNominations(prev => {
      const all = loadNominations()
      const updated = prev.map(n => {
        if (n.id !== nominationId) return n
        const newVotes = (n.votes || 0) + 1
        return { ...n, votes: newVotes, pending: newVotes < 5 }
      })
      all[categorySlug] = updated
      saveNominations(all)
      return updated
    })
  }, [categorySlug])

  return { nominations, addNomination, upvoteNomination }
}
