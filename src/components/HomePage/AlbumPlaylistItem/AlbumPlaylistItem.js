import {Link} from 'react-router-dom'
import './AlbumPlaylistItem.css'

const AlbumPlaylistItem = props => {
  const {imgUrl, name, id, section, altText} = props
  const pathUrl = section === 'editors' ? `/playlist/${id}` : `/album/${id}`
  return (
    <li className="playlist-item-Details">
      <Link to={pathUrl} className="link-container">
        <img className="playlist-item-img" src={imgUrl} alt={altText} />
      </Link>
      <h2 className="playlist-item-name">{name}</h2>
    </li>
  )
}
export default AlbumPlaylistItem
