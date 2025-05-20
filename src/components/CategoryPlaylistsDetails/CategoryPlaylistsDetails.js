import {useState, useEffect} from 'react'
import SideBar from '../SideBar/SideBar'
import {apiStatus} from '../PlaylistsDetails/PlaylistsDetails'
import './CategoryPlaylistsDetails.css'

const CategoryItemDetails = props => {
  const {imgUrl, name, totalTracks} = props
  return (
    <div className="category-item-details-container">
      <img src={imgUrl} alt="ns" className="category-img" />
      <h2 className="name">{name}</h2>
      <p className="total-tracks">{totalTracks} Tracks</p>
    </div>
  )
}

const CategoryPlaylistsDetails = ({match, history}) => {
  const [categoryApiStatus, SetCategoryApiStatus] = useState(apiStatus.initial)
  const [categoryApiData, SetCategoryApiData] = useState({})
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

  const categoryApiUrl = async () => {
    SetCategoryApiStatus(apiStatus.inprogress)
    console.log(categoryApiStatus)
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`

    try {
      const response = await fetch(url)
      const rawData = await response.json()
      const jsonData = convertKeysToCamelCase(rawData)
      SetCategoryApiData(jsonData)
      SetCategoryApiStatus(apiStatus.success)
      console.log(jsonData)
    } catch {
      SetCategoryApiStatus(apiStatus.failure)
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

  const onClickOfTryAgain = () => {
    categoryApiStatus()
  }

  const onClickOfBack = () => {
    history.push('/')
  }

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

  const renderSection = () => {
    let content
    switch (categoryApiStatus) {
      case apiStatus.inprogress:
        content = loadingView()
        break
      case apiStatus.failure:
        content = failureView()
        break
      case apiStatus.success: {
        const trackItems = Array.isArray(categoryApiData?.playlists.items)
          ? categoryApiData.playlists.items
          : []
        console.log('trackItems')
        console.log(categoryApiData.playlists.items)
        content = (
          <div className="category-content-container">
            <ul className="category-list-container">
              {trackItems.map(item => (
                <CategoryItemDetails
                  key={item?.id}
                  imgUrl={item?.images[0]?.url}
                  name={item?.name}
                  totalTracks={item?.tracks.total}
                />
              ))}
            </ul>
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
    categoryApiUrl()
  }, [])

  return (
    <div className="category-container">
      <SideBar />
      <div className="playlist-content-wrapper">
        <button type="button" className="back-button" onClick={onClickOfBack}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747725509/kytu7w7vqvvwe4iwz1l6.png"
            alt="back-button"
          />
          <p className="back-text">Back</p>
        </button>
        {renderSection()}
      </div>
    </div>
  )
}
export default CategoryPlaylistsDetails
