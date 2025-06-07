import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar/SideBar'
import './PlaylistsDetails.css'
import AlbumPlaylistInfo from '../CommonComponents/AlbumPlaylistInfo/AlbumPlaylistInfo'
import PlaylistSongInfo from './PlaylistSongInfo/PlaylistSongInfo'
import '../CommonStyles/CommonStyles.css'
import AudioPlayer from '../CommonComponents/AudioPlayer/AudioPlayer'
import {ApiStatus} from '../Constants/Constants'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import FailureView from '../CommonComponents/FailureView/FailureView'

const PlaylistsDetails = ({match, history}) => {
  const [playlistApiStatus, SetPlaylistApiStatus] = useState(ApiStatus.initial)
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
    SetPlaylistApiStatus(ApiStatus.inprogress)
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const rawData = await response.json()
      const jsonData = convertKeysToCamelCase(rawData)
      SetPlaylistData(jsonData)
      SetPlaylistApiStatus(ApiStatus.success)
    } else {
      SetPlaylistApiStatus(ApiStatus.failure)
    }
  }

  const onClickOfTryAgain = () => {
    makePlaylistApi()
  }

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
          playlistData.images?.[0]?.url ?? 'https://via.placeholder.com/150'

        const trackItems = Array.isArray(playlistData.tracks?.items)
          ? playlistData.tracks.items
          : []
        content = (
          <div className="playlist-content-container">
            <div>
              <AlbumPlaylistInfo
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
                  <PlaylistSongInfo
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
      <div className="playlist-content">
        <button type="button" className="back-button" onClick={onClickOfBack}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747725509/kytu7w7vqvvwe4iwz1l6.png"
            alt="back-button"
          />
          <p className="back-text">Back</p>
        </button>
        {renderSection()}
        {playlistApiStatus === ApiStatus.success &&
        Object.keys(currentSelectedTrack).length !== 0 ? (
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
