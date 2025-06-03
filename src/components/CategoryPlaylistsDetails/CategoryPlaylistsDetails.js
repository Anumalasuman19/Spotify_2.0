<<<<<<< HEAD
import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import {apiStatus} from '../PlaylistsDetails/PlaylistsDetails'
import './CategoryPlaylistsDetails.css'

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

const CategoryPlaylistsDetails = ({match, history}) => {
  const [categoryApiStatus, SetCategoryApiStatus] = useState(apiStatus.initial)
=======
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar/SideBar'
import {ApiStatus} from '../Constants/Constants'
import './CategoryPlaylistsDetails.css'
import CategoryItemDetails from './CategoryItemDetails/CategoryItemDetails'
import '../CommonStyles/CommonStyles.css'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import FailureView from '../CommonComponents/FailureView/FailureView'

const CategoryPlaylistsDetails = ({match, history}) => {
  const [categoryApiStatus, SetCategoryApiStatus] = useState(ApiStatus.initial)
>>>>>>> moved the components folder to spotify remix folder
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
<<<<<<< HEAD
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

=======
    SetCategoryApiStatus(ApiStatus.inprogress)
    console.log(categoryApiStatus)
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const rawData = await response.json()
    const jsonData = convertKeysToCamelCase(rawData)
    if (response.ok) {
      SetCategoryApiData(jsonData)
      SetCategoryApiStatus(ApiStatus.success)
    } else {
      SetCategoryApiStatus(ApiStatus.failure)
    }
  }

>>>>>>> moved the components folder to spotify remix folder
  const onClickOfTryAgain = () => {
    categoryApiStatus()
  }

  const onClickOfBack = () => {
<<<<<<< HEAD
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
=======
    history.goBack()
  }

  const renderSection = () => {
    let content
    switch (categoryApiStatus) {
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
>>>>>>> moved the components folder to spotify remix folder
        const trackItems = Array.isArray(categoryApiData?.playlists.items)
          ? categoryApiData.playlists.items
          : []
        console.log('trackItems')
        console.log(categoryApiData.playlists.items)
        content = (
          <div className="category-content-container">
<<<<<<< HEAD
            <p className="sub-heading podcast-text">Podcast</p>
=======
            <p className="podcast-text">Podcast</p>
>>>>>>> moved the components folder to spotify remix folder
            <ul className="category-list-container">
              {trackItems.map(item => (
                <CategoryItemDetails
                  key={item?.id}
                  imgUrl={item?.images[0]?.url}
                  name={item?.name}
                  totalTracks={item?.tracks.total}
                  id={item?.id}
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
<<<<<<< HEAD
      <SideBar />
=======
      <div className="playlist-sidebar-container">
        <SideBar />
      </div>
>>>>>>> moved the components folder to spotify remix folder
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
