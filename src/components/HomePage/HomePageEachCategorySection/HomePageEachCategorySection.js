import {useState, useEffect} from 'react'
import {Categories, ApiStatus} from '../../Constants/Constants'
import LoadingView from '../../CommonComponents/LoadingView/LoadingView'
import FailureView from '../../CommonComponents/FailureView/FailureView'
import './HomePageEachCategorySection.css'

const HomePageEachCategorySection = props => {
  const {apiUrl, Component, categoryHeading, section, altText, category} = props
  const [categoryData, SetCategoryData] = useState([])
  const [categoryApiStatus, SetCategoryApiStatus] = useState(ApiStatus.initial)

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
  const SetApiCategoryData = apiData => {
    switch (category) {
      case Categories.editorPicks:
        SetCategoryData(apiData.playlists.items)
        console.log('Response')
        console.log(apiData.playlists.items)
        break
      case Categories.genresAndMoods:
        SetCategoryData(apiData.categories.items)
        console.log('Response')
        console.log(apiData.categories.items)
        break
      case Categories.newRelease:
        SetCategoryData(apiData.albums.items)
        break
      default:
        break
    }
  }

  const categoriesApiUrl = async () => {
    SetCategoryApiStatus(ApiStatus.inprogress)
    const url = apiUrl
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonData = await apiResponse.json()
    if (apiResponse.ok === true) {
      const camelCaseConvertedData = convertKeysToCamelCase(jsonData)
      SetApiCategoryData(camelCaseConvertedData)
      SetCategoryApiStatus(ApiStatus.success)
    } else {
      SetCategoryApiStatus(ApiStatus.failure)
    }
  }

  const onClickOfTryAgain = () => {
    console.log('snsndksdsd')
  }

  const renderSection = () => {
    let content
    switch (categoryApiStatus) {
      case ApiStatus.inprogress:
        content = (
          <div className="each-category-loading-and-failure-container">
            <LoadingView />
          </div>
        )
        break
      case ApiStatus.failure:
        content = (
          <div className="each-category-loading-and-failure-container">
            <FailureView onClickOfTryAgain={onClickOfTryAgain} />
          </div>
        )
        break
      case ApiStatus.success:
        content = (
          <ul className="editorsPicks-list">
            {categoryData.map((item, index) => (
              <Component
                key={item.id}
                imgUrl={item.icons?.[0]?.url || item.images?.[0]?.url}
                name={item.name}
                id={item.id}
                index={index}
                section={section}
                altText={altText}
              />
            ))}
          </ul>
        )
        break
      default:
        content = null
    }
    return (
      <nav className="editorsPicks-container">
        <h1 className="sub-heading">{categoryHeading}</h1>
        {content}
      </nav>
    )
  }
  useEffect(() => {
    categoriesApiUrl()
  }, [])

  return <>{renderSection()}</>
}

export default HomePageEachCategorySection
