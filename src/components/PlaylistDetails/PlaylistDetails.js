import {useEffect, useState} from 'react'
import SideBar from '../SideBar/SideBar'
import './PlaylistDetails.css'

const PlaylistInfo = props => {
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
  const {songNumber, track, album, duration, artists, addedDuration} = props
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

  return (
    <div className="playlist-item-container">
      <p className="item-text">{songNumber}</p>
      <p className="item-text">{track}</p>
      <p className="item-text">{album}</p>
      <p className="item-text">{convertMillisToMinSec(duration)}</p>
      <p className="item-text">{artists[0].name}</p>
      <p className="item-text">{getTimeAgo(addedDuration)}</p>
    </div>
  )
}

const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const PlaylistDetails = ({match}) => {
  const [playlistApiStatus, SetPlaylistApiStatus] = useState(apiStatus.initial)
  const [playlistData, SetPlaylistData] = useState({})

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
    const options = {method: 'GET'}

    try {
      const apiResponse = await fetch(url, options)
      const rawData = await apiResponse.json()
      const jsonData = convertKeysToCamelCase(rawData)

      if (apiResponse.ok) {
        SetPlaylistData(jsonData)
        SetPlaylistApiStatus(apiStatus.success)
      } else {
        SetPlaylistApiStatus(apiStatus.failure)
      }
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
          <>
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
                  key={item.id || index}
                  songNumber={index + 1}
                  track={item.track?.name || 'Unknown'}
                  album={item.track?.album?.name || 'Unknown'}
                  duration={item.track?.durationMs || 0}
                  artists={item.track?.artists || []}
                  addedDuration={item.addedAt}
                />
              ))}
            </ul>

            <figure>
              <figcaption>Listen to the T-Rex:</figcaption>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                controls
                src={playlistData.tracks.items[0].track.preview_url}
              />
              <a href="/shared-assets/audio/t-rex-roar.mp3">Download audio</a>
            </figure>
          </>
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

  return (
    <div className="playlist-container">
      <SideBar />
      <div className="playlist-content-container">
        <button type="button" className="back-button">
          <p className="back-text">Back</p>
        </button>
        {renderSection()}
      </div>
    </div>
  )
}

export default PlaylistDetails
