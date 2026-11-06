import { VoteButtons } from './VoteButtons'

const RANK_STYLES = {
  1: { label: '🥇', className: 'rank-gold' },
  2: { label: '🥈', className: 'rank-silver' },
  3: { label: '🥉', className: 'rank-bronze' },
}

export function PlaceCard({ place, rank, userVote, displayScore, onVote }) {
  const rankStyle = RANK_STYLES[rank]
  const isPending = place.pending === true
  const isCommunity = place.source === 'community' && !isPending

  return (
    <div className={`place-card${isPending ? ' pending' : ''}`}>
      <div className="place-rank">
        {rankStyle ? (
          <span className={rankStyle.className}>{rankStyle.label}</span>
        ) : (
          <span className="rank-num">{rank}</span>
        )}
      </div>

      <div className="place-info">
        <div className="place-name-row">
          <span className="place-name">{place.name}</span>
          {isCommunity && (
            <span className="badge badge-community">community</span>
          )}
          {isPending && (
            <span className="badge badge-pending">pending</span>
          )}
        </div>
        <p className="place-vibe-desc">{place.vibeDesc}</p>
        <div className="place-meta">
          <span className="place-neighborhood">{place.neighborhood}</span>
          {place.address && place.address !== place.neighborhood && (
            <span className="place-address">{place.address}</span>
          )}
        </div>
        {place.tags && place.tags.length > 0 && (
          <div className="place-tags">
            {place.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <VoteButtons
        placeId={place.id}
        score={displayScore}
        userVote={userVote}
        onVote={onVote}
      />
    </div>
  )
}
