import './AlbumSongItem.css'
import '../../CommonStyles/CommonStyles.css'

const AlbumSongItem = props => {
  const {
    songNumber,
    track,
    duration,
    artists,
    id,
    onClickOfItem,
    isSelected,
  } = props
  const artistsNames = artists.map(artist => artist.name).join(', ')
  const convertMillisToMinSec = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${formattedSeconds}`
  }

  const onClickOfAlbumItem = () => {
    onClickOfItem(id)
  }
  const containerStyle = isSelected ? 'playlist-selected-item-container' : ''
  return (
    <li
      className={`album-item-container ${containerStyle}`}
      onClick={onClickOfAlbumItem}
    >
      <div className="track-and-artists">
        <p className="item-text track">{track}</p>
        <p className="item-text artists-names">{artistsNames}</p>
      </div>
      <p className="item-text track-number no-display">{songNumber}</p>
      <p className="item-text track no-display">{track}</p>
      <p className="item-text song-duration">
        {convertMillisToMinSec(duration)}
      </p>
      <p className="item-text artists-names no-display">{artistsNames}</p>
    </li>
  )
}

export default AlbumSongItem
