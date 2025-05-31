import {Link} from 'react-router-dom'
import ColorPalette from '../../ColorPalette/ColorPalette'
import './GenreMoodItem.css'

const GenreMoodItem = ({name, imgUrl, index, id, altText}) => {
  const backgroundColor = ColorPalette[index % ColorPalette.length]

  return (
    <li className="genre-mood-item" style={{backgroundColor}}>
      <Link to={`/category/${id}/playlists`} className="genre-mood-link">
        <p className="genre-name">{name}</p>
        <img className="genre-icon" src={imgUrl} alt={altText} />
      </Link>
    </li>
  )
}

export default GenreMoodItem
