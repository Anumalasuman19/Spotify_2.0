import {useState, useEffect} from 'react'
import SideBar from '../SideBar/SideBar'
import {ApiStatus} from '../Constants/Constants'
import './CategoryPlaylistsDetails.css'
import CategoryItemDetails from './CategoryItemDetails/CategoryItemDetails'
import '../CommonStyles/CommonStyles.css'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import FailureView from '../CommonComponents/FailureView/FailureView'

const CategoryPlaylistsDetails = ({match, history}) => {
  const [categoryApiStatus, SetCategoryApiStatus] = useState(ApiStatus.initial)
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
    SetCategoryApiStatus(ApiStatus.inprogress)
    console.log(categoryApiStatus)
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`

    try {
      const response = await fetch(url)
      const rawData = await response.json()
      const jsonData = convertKeysToCamelCase(rawData)
      SetCategoryApiData(jsonData)
      SetCategoryApiStatus(ApiStatus.success)
      console.log(jsonData)
    } catch {
      SetCategoryApiStatus(ApiStatus.failure)
    }
  }

  const onClickOfTryAgain = () => {
    categoryApiStatus()
  }

  const onClickOfBack = () => {
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
        const trackItems = Array.isArray(categoryApiData?.playlists.items)
          ? categoryApiData.playlists.items
          : []
        console.log('trackItems')
        console.log(categoryApiData.playlists.items)
        content = (
          <div className="category-content-container">
            <p className="sub-heading podcast-text">Podcast</p>
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
      <div className="playlist-sidebar-container">
        <SideBar />
      </div>
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
