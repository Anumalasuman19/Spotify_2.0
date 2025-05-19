import {useEffect, useState, useRef} from 'react'
import SideBar from '../SideBar/SideBar'
import './PlaylistDetails.css'

export const PlaylistInfo = props => {
  const {imgUrl, playlistName, featureName} = props
  return (
    <div className="playlist-info-container">
      <img src={imgUrl} alt="nsnv" className="playlist-img" />
      <div className="info">
        <p className="feature-name">{featureName}</p>
        <h1 className="playlist-name">{playlistName}</h1>
        <p className="artists-names">Mickey J. Meyer</p>
      </div>
    </div>
  )
}
const PlaylistItemInfo = props => {
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
      <p className="item-text">{songNumber}</p>
      <p className="item-text">{track}</p>
      <p className="item-text">{album}</p>
      <p className="item-text">{convertMillisToMinSec(duration)}</p>
      <p className="item-text">{artists[0].name}</p>
      <p className="item-text">{getTimeAgo(addedDuration)}</p>
    </li>
  )
}

export const AudioPlayer = ({track, imgUrl}) => {
  const audioRef = useRef(null)
  const [artists, SetArtist] = useState('')
  useEffect(() => {
    if (audioRef.current && track.previewUrl) {
      SetArtist(track.artists[0].name)
      audioRef.current.load() // Reloads new src
      audioRef.current.play().catch(error => {
        console.warn('Auto-play failed:', error)
      })
    }
  }, [track])
  return (
    <div className="audio-container">
      {/* Song Info */}
      <div className="song-info">
        <img src={imgUrl} alt="Album Art" className="album-image" />
        <div className="song-and-artist">
          <p className="song-title">{track.name}</p>
          <p className="song-title">{artists}</p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="audio-controls">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          ref={audioRef}
          controls
          src={track.previewUrl}
          className="audio-element"
        />
      </div>

      {/* Volume Control */}
      <div className="volume-control">
        <span role="img" aria-label="volume">
          🔊
        </span>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="70"
          className="volume-slider"
        />
      </div>
    </div>
  )
}

export const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const PlaylistDetails = ({match}) => {
  const [playlistApiStatus, SetPlaylistApiStatus] = useState(apiStatus.initial)
  const [playlistData, SetPlaylistData] = useState({})
  const [currentSelectedTrack, SetCurrentSelectedTrack] = useState({})

  const toCamelCase = str =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

  const convertKeysToCamelCase = obj => {
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item))
    }
    if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const newKey = toCamelCase(key)
        acc[newKey] = convertKeysToCamelCase(value)
        return acc
      }, {})
    }
    return obj
  }

  const makePlaylistApi = async () => {
    SetPlaylistApiStatus(apiStatus.inprogress)
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`

    try {
      const response = await fetch(url)
      const rawData = await response.json()
      const jsonData = convertKeysToCamelCase(rawData)
      SetPlaylistData(jsonData)
      SetPlaylistApiStatus(apiStatus.success)
      console.log(jsonData)
    } catch {
      SetPlaylistApiStatus(apiStatus.failure)
    }
  }

  const loadingView = () => (
    <div className="loader-or-failure-container">
      <img
        className="spotify-icon"
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747385633/spotify-logo_fdkhrw.png"
        alt="fsfs"
      />
      <h1 className="loading-text">Loading...</h1>
    </div>
  )

  const onClickOfTryAgain = () => {
    makePlaylistApi()
  }

  const failureView = () => (
    <div className="loader-or-failure-container">
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={onClickOfTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  const onClickOfPlaylistItem = id => {
    const selectedItem = playlistData.tracks.items.find(
      item => item.track.id === id,
    )
    console.log(selectedItem.track.artists[0].name)

    if (selectedItem) {
      SetCurrentSelectedTrack(selectedItem.track)
    }
  }

  const renderSection = () => {
    const padding = '60px'
    let content
    switch (playlistApiStatus) {
      case apiStatus.inprogress:
        content = loadingView()
        break
      case apiStatus.failure:
        content = failureView()
        break
      case apiStatus.success: {
        const imageUrl =
          playlistData.images?.[0]?.url ?? 'https://via.placeholder.com/150'

        const trackItems = Array.isArray(playlistData.tracks?.items)
          ? playlistData.tracks.items
          : []
        content = (
          <div className="playlist-content-container">
            <div>
              <button type="button" className="back-button">
                <p className="back-text">Back</p>
              </button>
              <PlaylistInfo
                imgUrl={imageUrl}
                playlistName={playlistData.name}
                featureName="Editor's picks"
              />
              <div className="playlist-item-container">
                <p className="item-text" style={{padding}}>
                  Track
                </p>
                <p className="item-text">Album</p>
                <p className="item-text">Time</p>
                <p className="item-text">Artist</p>
                <p className="item-text">Added</p>
              </div>
              <hr />
              <ul className="playlist-list">
                {trackItems.map((item, index) => (
                  <PlaylistItemInfo
                    key={item.track.id || index}
                    songNumber={index + 1}
                    track={item.track?.name || 'Unknown'}
                    album={item.track?.album?.name || 'Unknown'}
                    duration={item.track?.durationMs || 0}
                    artists={item.track?.artists || []}
                    addedDuration={item.addedAt}
                    onClickOfItem={onClickOfPlaylistItem}
                    id={item.track?.id}
                    isSelected={currentSelectedTrack.id === item.track?.id}
                  />
                ))}
              </ul>
            </div>
            <div>
              <hr />
              <AudioPlayer
                track={currentSelectedTrack}
                imgUrl={currentSelectedTrack?.album?.images[0].url}
              />
            </div>
          </div>
        )
        break
      }

      default:
        content = null
    }

    return <div className="playlist-and-details-container">{content}</div>
  }

  useEffect(() => {
    makePlaylistApi()
  }, [match.params.id])

  useEffect(() => {
    if (
      playlistApiStatus === apiStatus.success &&
      playlistData.tracks?.items?.length > 0
    ) {
      console.log(playlistData.tracks?.items[0].track)
      SetCurrentSelectedTrack(playlistData.tracks.items[0].track)
    }
  }, [playlistApiStatus, playlistData])

  return (
    <div className="playlist-container">
      <SideBar />
      {renderSection()}
    </div>
  )
}

export default PlaylistDetails
