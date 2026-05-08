import { useState, useEffect } from 'react'
import { HomeGrid } from './components/HomeGrid'
import { VibeList } from './components/VibeList'
import { categories } from './data/categories'

function getSlugFromPath() {
  const path = window.location.pathname.replace(/^\//, '').split('/')[0]
  return path || null
}

function isValidSlug(slug) {
  return categories.some(c => c.slug === slug)
}

export default function App() {
  const [activeSlug, setActiveSlug] = useState(() => {
    const slug = getSlugFromPath()
    return slug && isValidSlug(slug) ? slug : null
  })

  useEffect(() => {
    const slug = getSlugFromPath()
    if (slug && isValidSlug(slug)) {
      setActiveSlug(slug)
    }
  }, [])

  const navigate = (slug) => {
    if (slug) {
      window.history.pushState({}, '', `/${slug}`)
      setActiveSlug(slug)
    } else {
      window.history.pushState({}, '', '/')
      setActiveSlug(null)
    }
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onPop = () => {
      const slug = getSlugFromPath()
      setActiveSlug(slug && isValidSlug(slug) ? slug : null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (activeSlug) {
    return <VibeList slug={activeSlug} onBack={() => navigate(null)} />
  }

  return <HomeGrid onSelectCategory={(slug) => navigate(slug)} />
}
