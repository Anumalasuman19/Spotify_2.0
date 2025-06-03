import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar/SideBar'
<<<<<<< HEAD
import {
  PlaylistInfo,
  AudioPlayer,
  apiStatus,
} from '../PlaylistsDetails/PlaylistsDetails'
import './AlbumDetails.css'

const AlbumItemInfo = props => {
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
      <p className="item-text">{songNumber}</p>
      <p className="item-text">{track}</p>
      <p className="item-text">{convertMillisToMinSec(duration)}</p>
      <p className="item-text">{artistsNames}</p>
    </li>
  )
}

const AlbumDetails = ({match, history}) => {
  const [newReleaseAlbumStatus, SetNewReleaseAlbumStatus] = useState(
    apiStatus.initial,
=======
import {ApiStatus} from '../Constants/Constants'
import AlbumPlaylistInfo from '../CommonComponents/AlbumPlaylistInfo/AlbumPlaylistInfo'
import './AlbumDetails.css'
import AudioPlayer from '../CommonComponents/AudioPlayer/AudioPlayer'
import AlbumSongItem from './AlbumSongItem/AlbumSongItem'
import '../CommonStyles/CommonStyles.css'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import FailureView from '../CommonComponents/FailureView/FailureView'

const AlbumDetails = ({match, history}) => {
  const [newReleaseAlbumStatus, SetNewReleaseAlbumStatus] = useState(
    ApiStatus.initial,
>>>>>>> moved the components folder to spotify remix folder
  )
  const [newReleaseAlbumData, SetNewReleaseAlbumData] = useState({})
  const [currentPlayingAlbum, SetCurrentPlayingAlbum] = useState({})
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

  const newReleaseAlbumPlaylistApiUrl = async () => {
<<<<<<< HEAD
    SetNewReleaseAlbumStatus(apiStatus.inprogress)
=======
    SetNewReleaseAlbumStatus(ApiStatus.inprogress)
>>>>>>> moved the components folder to spotify remix folder
    console.log(newReleaseAlbumStatus)
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const rawData = await response.json()
    const jsonData = convertKeysToCamelCase(rawData)
    if (response.ok) {
      SetNewReleaseAlbumData(jsonData)
<<<<<<< HEAD
      SetNewReleaseAlbumStatus(apiStatus.success)
      console.log(jsonData)
    } else {
      SetNewReleaseAlbumStatus(apiStatus.failure)
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

=======
      SetNewReleaseAlbumStatus(ApiStatus.success)
      console.log(jsonData)
    } else {
      SetNewReleaseAlbumStatus(ApiStatus.failure)
    }
  }

>>>>>>> moved the components folder to spotify remix folder
  const onClickOfTryAgain = () => {
    newReleaseAlbumPlaylistApiUrl()
  }

<<<<<<< HEAD
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

=======
>>>>>>> moved the components folder to spotify remix folder
  const onClickOfAlbumItem = id => {
    const selectedItem = newReleaseAlbumData.tracks.items.find(
      item => item.id === id,
    )

    if (selectedItem) {
      SetCurrentPlayingAlbum(selectedItem)
    }
  }

  const onClickOfBack = () => {
<<<<<<< HEAD
    history.push('/')
=======
    history.goBack()
>>>>>>> moved the components folder to spotify remix folder
  }

  const renderSection = () => {
    let content
    switch (newReleaseAlbumStatus) {
<<<<<<< HEAD
      case apiStatus.inprogress:
        content = loadingView()
        break
      case apiStatus.failure:
        content = failureView()
        break
      case apiStatus.success: {
=======
      case ApiStatus.inprogress:
        content = (
          <div className="playlist-loader-or-failure-container">
            <LoadingView />
          </div>
        )
        break
      case ApiStatus.failure:
        content = (
          <div className="playlist-loader-or-failure-container">
            <FailureView onClickOfTryAgain={onClickOfTryAgain} />
          </div>
        )
        break
      case ApiStatus.success: {
>>>>>>> moved the components folder to spotify remix folder
        const imageUrl =
          newReleaseAlbumData.images?.[0]?.url ??
          'https://via.placeholder.com/150'

        const trackItems = Array.isArray(newReleaseAlbumData.tracks?.items)
          ? newReleaseAlbumData.tracks.items
          : []
        content = (
          <div className="playlist-content-container">
            <div className="back-and-album-container">
<<<<<<< HEAD
              <PlaylistInfo
                imgUrl={imageUrl}
                playlistName={newReleaseAlbumData.name}
                featureName="newRelease"
              />
              <div className="album-titles-and-album-list">
                <div className="album-item-container">
                  <p className="item-text">#</p>
                  <p className="item-text">Track</p>
                  <p className="item-text">Time</p>
                  <p className="item-text">Artist</p>
                </div>
                <hr className="horizontal-line-style" />
                <ul className="album-list">
                  {trackItems.map((item, index) => (
                    <AlbumItemInfo
=======
              <AlbumPlaylistInfo
                imgUrl={imageUrl}
                playlistName={newReleaseAlbumData.name}
                featureName="New Releases"
              />
              <div className="album-titles-and-album-list">
                <div className="album-item-container no-display">
                  <p className="item-text track-number">#</p>
                  <p className="item-text track">Track</p>
                  <p className="item-text song-duration">Time</p>
                  <p className="item-text artists-names">Artist</p>
                </div>
                <hr className="horizontal-line-style no-display" />
                <ul className="album-list">
                  {trackItems.map((item, index) => (
                    <AlbumSongItem
>>>>>>> moved the components folder to spotify remix folder
                      key={item?.id || index}
                      songNumber={item.trackNumber}
                      track={item?.name || 'Unknown'}
                      duration={item?.durationMs || 0}
                      artists={item?.artists}
                      onClickOfItem={onClickOfAlbumItem}
                      id={item.id}
                      isSelected={currentPlayingAlbum.id === item.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
<<<<<<< HEAD
            <div className="current-song-container">
              <hr />
              <AudioPlayer
                track={currentPlayingAlbum}
                imgUrl={newReleaseAlbumData.images[0].url}
              />
            </div>
=======
>>>>>>> moved the components folder to spotify remix folder
          </div>
        )
        break
      }
<<<<<<< HEAD

=======
>>>>>>> moved the components folder to spotify remix folder
      default:
        content = null
    }

    return <div className="playlist-and-details-container">{content}</div>
  }

  useEffect(() => {
    newReleaseAlbumPlaylistApiUrl()
  }, [])

  return (
    <div className="playlist-container">
<<<<<<< HEAD
      <SideBar />
=======
      <div className="playlist-sidebar-container">
        <SideBar />
      </div>
>>>>>>> moved the components folder to spotify remix folder
      <div className="playlist-content-wrapper">
        <button type="button" className="back-button" onClick={onClickOfBack}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747725509/kytu7w7vqvvwe4iwz1l6.png"
            alt="back-button"
          />
          <p className="back-text">Back</p>
        </button>
        {renderSection()}
<<<<<<< HEAD
=======
        {newReleaseAlbumStatus === ApiStatus.success ? (
          <div className="current-song-container">
            <hr className="horizontal-line-style" />
            <AudioPlayer
              track={currentPlayingAlbum}
              imgUrl={newReleaseAlbumData.images[0].url}
            />
          </div>
        ) : (
          <></>
        )}
>>>>>>> moved the components folder to spotify remix folder
      </div>
    </div>
  )
}

export default AlbumDetails
