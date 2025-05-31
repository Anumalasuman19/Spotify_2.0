import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar/SideBar'
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
    SetNewReleaseAlbumStatus(ApiStatus.inprogress)
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
      SetNewReleaseAlbumStatus(ApiStatus.success)
      console.log(jsonData)
    } else {
      SetNewReleaseAlbumStatus(ApiStatus.failure)
    }
  }

  const onClickOfTryAgain = () => {
    newReleaseAlbumPlaylistApiUrl()
  }

  const onClickOfAlbumItem = id => {
    const selectedItem = newReleaseAlbumData.tracks.items.find(
      item => item.id === id,
    )

    if (selectedItem) {
      SetCurrentPlayingAlbum(selectedItem)
    }
  }

  const onClickOfBack = () => {
    history.goBack()
  }

  const renderSection = () => {
    let content
    switch (newReleaseAlbumStatus) {
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
        const imageUrl =
          newReleaseAlbumData.images?.[0]?.url ??
          'https://via.placeholder.com/150'

        const trackItems = Array.isArray(newReleaseAlbumData.tracks?.items)
          ? newReleaseAlbumData.tracks.items
          : []
        content = (
          <div className="playlist-content-container">
            <div className="back-and-album-container">
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
    newReleaseAlbumPlaylistApiUrl()
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
      </div>
    </div>
  )
}

export default AlbumDetails
