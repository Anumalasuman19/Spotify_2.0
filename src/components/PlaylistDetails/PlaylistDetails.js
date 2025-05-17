import {useEffect} from 'react'
import SideBar from '../SideBar/SideBar'

const PlaylistInfo = props => {
  const {imgUrl, artists, playlistName, featureName} = props
  const allArtists = artists.join(' ')
  return (
    <div className="playlist-info-container">
      <img src={imgUrl} alt="nsnv" className="playlist-img" />
      <div className="info">
        <p className="feature-name">{featureName}</p>
        <h1 className="playlist-name">{playlistName}</h1>
        <p>Mickey J. Meyer</p>
      </div>
    </div>
  )
}

const PlaylistItemInfo = props => {
  const {songNumber, track, album, duration, artist, addedDuration} = props
  return (
    <div className="playlist-item-contaienr">
      <p className="item-text">{songNumber}</p>
      <p className="item-text">{track}</p>
      <p className="item-text">{album}</p>
      <p className="item-text">{duration}</p>
      <p className="item-text">{artist}</p>
      <p className="item-text">{addedDuration}</p>
    </div>
  )
}

const PlaylistDetails = props => {
  const makePlaylistApi = async () => {
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonData = await apiResponse.json()
    console.log(apiResponse)
    console.log(jsonData)
  }
  useEffect(() => {
    makePlaylistApi()
  })

  return (
    <div className="playlist-container">
      <SideBar />
      <div className="playlist-content-container">
        <button type="button" className="back-button">
          <p className="back-text">Back</p>
        </button>
      </div>
    </div>
  )
}

export default PlaylistDetails
