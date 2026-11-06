export function VoteButtons({ placeId, score, userVote, onVote }) {
  return (
    <div className="vote-controls">
      <button
        className={`vote-btn vote-up${userVote === 'up' ? ' active' : ''}`}
        onClick={() => onVote(placeId, 'up')}
        aria-label="Upvote"
      >
        ▲
      </button>
      <span className="vote-score">{score}</span>
      <button
        className={`vote-btn vote-down${userVote === 'down' ? ' active' : ''}`}
        onClick={() => onVote(placeId, 'down')}
        aria-label="Downvote"
      >
        ▼
      </button>
    </div>
  )
}
