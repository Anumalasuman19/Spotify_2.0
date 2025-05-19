import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './HomePage.css'
import SideBar from '../SideBar/SideBar'

export const FeatureItem = props => {
  const {imgUrl, name, id, section} = props
  const pathUrl = section === 'editors' ? `/playlist/${id}` : `/album/${id}`
  return (
    <Link className="playlist-item-Details" to={pathUrl}>
      <img className="playlist-item-img" src={imgUrl} alt="ssd" />
      <h2 className="playlist-item-name">{name}</h2>
    </Link>
  )
}

const colorPalette = [
  '#FF6B6B',
  '#6BCB77',
  '#4D96FF',
  '#FFB72B',
  '#845EC2',
  '#00C9A7',
  '#C34A36',
  '#F9A826',
  '#2C73D2',
  '#0081CF',
  '#FFC75F',
  '#FF9671',
  '#D65DB1',
  '#00C2A8',
  '#4B4453',
  '#F96D00',
  '#00539C',
  '#F38181',
  '#8E7DBE',
  '#BC6FF1',
]

export const GenreMoodItem = ({name, imgUrl, index, id}) => {
  const backgroundColor = colorPalette[index % colorPalette.length]

  return (
    <Link
      className="genre-mood-item"
      style={{backgroundColor}}
      to={`/category/${id}/playlists`}
    >
      <p className="genre-name">{name}</p>
      <img className="genre-icon" src={imgUrl} alt={name} />
    </Link>
  )
}

const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const HomePage = () => {
  const [editorsPicksData, SetEditorsPicksData] = useState([])
  const [editorsPicksApiStatus, SetEditorsPicksApiStatus] = useState(
    apiStatus.initial,
  )
  const [newReleaseData, SetNewReleaseData] = useState([])
  const [newReleaseApiStatus, SetNewReleaseApiStatus] = useState(
    apiStatus.initial,
  )
  const [categoryData, SetCategoryData] = useState([])
  const [categoryApiStatus, SetCategoryApiStatus] = useState(apiStatus.initial)

  const featuredPlaylistsApiUrl = async () => {
    SetEditorsPicksApiStatus(apiStatus.inprogress)
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonData = await apiResponse.json()

    if (apiResponse.ok === true) {
      const updatedItems = jsonData.playlists.items.map(item => ({
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primaryColor: item.primary_color,
        public: item.public,
        snapshotId: item.snapshot_id,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))
      SetEditorsPicksData(updatedItems)
      SetEditorsPicksApiStatus(apiStatus.success)
    } else {
      SetEditorsPicksApiStatus(apiStatus.failure)
    }
  }

  const newReleasesApiUrl = async () => {
    SetNewReleaseApiStatus(apiStatus.inprogress)
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonData = await apiResponse.json()

    if (apiResponse.ok === true) {
      const updatedItems = jsonData.albums.items.map(item => ({
        albumType: item.album_type,
        artists: item.artists,
        availableMarkets: item.available_markets,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        releaseDate: item.release_date,
        releaseDatePrecision: item.release_date_precision,
        totalTracks: item.total_tracks,
        type: item.type,
        uri: item.uri,
      }))
      SetNewReleaseData(updatedItems)
      SetNewReleaseApiStatus(apiStatus.success)
    } else {
      SetNewReleaseApiStatus(apiStatus.failure)
    }
  }

  const categoriesApiUrl = async () => {
    SetCategoryApiStatus(apiStatus.inprogress)
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonData = await apiResponse.json()

    if (apiResponse.ok === true) {
      SetCategoryData(jsonData.categories.items)
      SetCategoryApiStatus(apiStatus.success)
    } else {
      SetCategoryApiStatus(apiStatus.failure)
    }
  }

  const onClickOfTryAgain = section => {
    switch (section) {
      case 'editors':
        featuredPlaylistsApiUrl()
        break
      case 'newReleases':
        newReleasesApiUrl()
        break
      case 'categories':
        categoriesApiUrl()
        break
      default:
        break
    }
  }
  const loadingView = () => (
    <div className="loader-or-failure-container">
      <img
        className="spotify-icon"
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747385633/spotify-logo_fdkhrw.png"
        alt="fsfs"
      />
      <h1 className="loading-text">Loading...</h1>
    </div>
  )

  const failureView = section => (
    <div className="loader-or-failure-container">
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={() => onClickOfTryAgain(section)}
      >
        Try Again
      </button>
    </div>
  )

  const renderSection = (status, data, Component, section, title) => {
    let content
    switch (status) {
      case apiStatus.inprogress:
        content = loadingView()
        break
      case apiStatus.failure:
        content = failureView(section)
        break
      case apiStatus.success:
        content = (
          <ul className="editorsPicks-list">
            {data.map((item, index) => (
              <Component
                key={item.id}
                imgUrl={item.icons?.[0]?.url || item.images?.[0]?.url}
                name={item.name}
                id={item.id}
                index={index}
                section={section}
              />
            ))}
          </ul>
        )
        break
      default:
        content = null
    }

    return (
      <div className="editorsPicks-container">
        <h1 className="sub-heading">{title}</h1>
        {content}
      </div>
    )
  }

  useEffect(() => {
    featuredPlaylistsApiUrl()
    newReleasesApiUrl()
    categoriesApiUrl()
  }, [])

  return (
    <div className="home-page-container">
      <SideBar />
      <div className="playlist-categories-newrelease-container">
        {renderSection(
          editorsPicksApiStatus,
          editorsPicksData,
          FeatureItem,
          'editors',
          'Editor’s picks',
        )}
        {renderSection(
          categoryApiStatus,
          categoryData,
          GenreMoodItem,
          'categories',
          'Genres & Moods',
        )}
        {renderSection(
          newReleaseApiStatus,
          newReleaseData,
          FeatureItem,
          'newReleases',
          'New releases',
        )}
      </div>
    </div>
  )
}

export default HomePage
