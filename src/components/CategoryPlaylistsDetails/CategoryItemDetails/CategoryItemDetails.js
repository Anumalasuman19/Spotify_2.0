import {Link} from 'react-router-dom'
import './CategoryItemDetails.css'

const CategoryItemDetails = props => {
  const {imgUrl, name, totalTracks, id} = props
  return (
    <Link className="category-item-details-container" to={`/playlist/${id}`}>
      <img src={imgUrl} alt="ns" className="category-img" />
      <div className="name-and-tracks">
        <h2 className="name">{name}</h2>
        <p className="total-tracks">{totalTracks} Tracks</p>
      </div>
    </Link>
  )
}
export default CategoryItemDetails
