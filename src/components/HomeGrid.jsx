import { categories } from '../data/categories'
import { places } from '../data/places'

export function HomeGrid({ onSelectCategory }) {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-logo">
          <span className="logo-flame">🔥</span>
          <span className="logo-text">Austin Vibe</span>
        </div>
        <p className="home-tagline">Where should you go tonight? The locals already voted.</p>
      </header>

      <div className="category-grid">
        {categories.map(cat => {
          const count = places[cat.slug]?.length ?? 0
          return (
            <button
              key={cat.slug}
              className="category-card"
              onClick={() => onSelectCategory(cat.slug)}
              style={{ '--cat-color': cat.color }}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-desc">{cat.description}</span>
              <span className="cat-count">{count} spots</span>
            </button>
          )
        })}
      </div>

      <footer className="home-footer">
        <p>Community-ranked by Austin locals · No algorithms · No paid placement</p>
      </footer>
    </div>
  )
}
