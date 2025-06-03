import './PlaylistSongInfo.css'
import '../../CommonStyles/CommonStyles.css'

const PlaylistSongInfo = props => {
  const {
    songNumber,
    track,
    album,
    duration,
    artists,
    addedDuration,
    id,
    onClickOfItem,
    isSelected,
  } = props
  const convertMillisToMinSec = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${formattedSeconds}`
  }

  const getTimeAgo = isoDate => {
    const now = new Date()
    const past = new Date(isoDate)

    const diffMs = now - past
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffMonths = Math.floor(diffDays / 30)

    if (diffDays < 1) return 'Today'
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffMonths === 1) return '1 month ago'
    return `${diffMonths} months ago`
  }

  const onClickOfPlaylistItem = () => {
    onClickOfItem(id)
  }
  const containerStyle = isSelected ? 'playlist-selected-item-container' : ''
  return (
    <li
      className={`playlist-item-container ${containerStyle}`}
      onClick={onClickOfPlaylistItem}
    >
      <div className="track-and-artists">
        <p className="item-text track-text">{track}</p>
        <p className="item-text artists-text">
          {artists.map(artist => artist.name).join(', ')}
        </p>
      </div>
      <p className="item-text no-display song-number">{songNumber}</p>
      <p className="item-text track-text no-display">{track}</p>
      <p className="item-text album-text no-display">{album}</p>
      <p className="item-text duration-text">
        {convertMillisToMinSec(duration)}
      </p>
      <p className="item-text artists-text no-display">
        {artists.map(artist => artist.name).join(', ')}
      </p>
      <p className="item-text added-duration no-display">
        {getTimeAgo(addedDuration)}
      </p>
    </li>
  )
}

export default PlaylistSongInfo
