import {useEffect, useRef, useState} from 'react'
import './AudioPlayer.css'

const AudioPlayer = ({track, imgUrl}) => {
  const artistsName = track.artists?.map(artist => artist.name).join(', ') ?? ''
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(prev => !prev)
  }

  return (
    <div className="audio-container">
      <div className="song-info">
        <img src={imgUrl} alt="Album Icon" className="album-image" />
        <div className="song-and-artist">
          <p className="song-title">{track.name}</p>
          <p className="artist-name">{artistsName}</p>
        </div>
      </div>

      <div className="audio-controls">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          controls
          autoPlay
          ref={audioRef}
          src={track.previewUrl}
          className="audio-element"
        />

        <button
          type="button"
          className="play-pause-button"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1748945469/pause_xe3ddk.png"
              alt="pause icon"
              className="play-pause-icon"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1748945913/play_eahcqx.webp"
              alt="play icon"
              className="play-pause-icon"
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default AudioPlayer
