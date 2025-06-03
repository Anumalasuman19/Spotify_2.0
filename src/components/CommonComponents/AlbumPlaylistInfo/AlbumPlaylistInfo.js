import './AlbumPlaylistInfo.css'

const AlbumPlaylistInfo = props => {
  const {imgUrl, playlistName, featureName} = props
  return (
    <div className="playlist-info-container">
      <img src={imgUrl} alt="Playlist Icon" className="playlist-img" />
      <div className="info">
        <p className="feature-name">{featureName}</p>
        <h1 className="playlist-name">{playlistName}</h1>
      </div>
    </div>
  )
}
export default AlbumPlaylistInfo
