import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar/SideBar'
import './PlaylistsDetails.css'

export const PlaylistInfo = props => {
  const {imgUrl, playlistName, featureName} = props
  return (
    <div className="playlist-info-container">
      <img src={imgUrl} alt="nsnv" className="playlist-img" />
      <div className="info">
        <p className="feature-name">{featureName}</p>
        <h1 className="playlist-name">{playlistName}</h1>
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

export const AudioPlayer = ({track, imgUrl}) => {
  const artistsName = track.artists?.map(artist => artist.name).join(', ') ?? ''

  return (
    <div className="audio-container">
      {/* Song Info */}
      <div className="song-info">
        <img src={imgUrl} alt="Album Art" className="album-image" />
        <div className="song-and-artist">
          <p className="song-title">{track.name}</p>
          <p className="artist-name">{artistsName}</p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="audio-controls">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          controls
          autoPlay
          src={track.previewUrl}
          className="audio-element"
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

const PlaylistsDetails = ({match, history}) => {
  const [playlistApiStatus, SetPlaylistApiStatus] = useState(apiStatus.initial)
  const [playlistData, SetPlaylistData] = useState({})
  const [currentSelectedTrack, SetCurrentSelectedTrack] = useState({})
  const onClickOfBack = () => {
    history.goBack()
  }

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
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const rawData = await response.json()
      const jsonData = convertKeysToCamelCase(rawData)
      SetPlaylistData(jsonData)
      SetPlaylistApiStatus(apiStatus.success)
      console.log(jsonData)
    } else {
      SetPlaylistApiStatus(apiStatus.failure)
    }
  }

  const loadingView = () => (
    <div className="playlist-loader-or-failure-container">
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
    <div className="playlist-loader-or-failure-container">
      <img
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747733067/wdy0iusw5knlayakakjm.png"
        alt="failure view"
      />
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

    if (selectedItem) {
      SetCurrentSelectedTrack(selectedItem.track)
    }
  }

  const renderSection = () => {
    const padding = ''
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
              <PlaylistInfo
                imgUrl={imageUrl}
                playlistName={playlistData.name}
                featureName="Editor's picks"
                description={playlistData.description}
              />
              <div className="playlist-item-container no-display">
                <p className="item-text song-number">{padding}</p>
                <p className="item-text track-text">Track</p>
                <p className="item-text album-text">Album</p>
                <p className="item-text duration-text">Time</p>
                <p className="item-text artists-text">Artist</p>
                <p className="item-text added-duration">Added</p>
              </div>
              <hr className="horizontal-line-style no-display" />
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
  }, [])
  return (
    <div className="playlist-container">
      <div className="playlist-sidebar-container">
        <SideBar />
      </div>
      <div className="playlist-content-wrapper">
        <button type="button" className="back-button" onClick={onClickOfBack}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747725509/kytu7w7vqvvwe4iwz1l6.png"
            alt="back-button"
          />
          <p className="back-text">Back</p>
        </button>
        {renderSection()}
        {playlistApiStatus === apiStatus.success ? (
          <div>
            <hr className="horizontal-line-style" />
            <AudioPlayer
              track={currentSelectedTrack}
              imgUrl={currentSelectedTrack?.album?.images[0].url}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default PlaylistsDetails
