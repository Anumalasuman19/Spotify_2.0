import './AudioPlayer.css'

const AudioPlayer = ({track, imgUrl}) => {
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
export default AudioPlayer
