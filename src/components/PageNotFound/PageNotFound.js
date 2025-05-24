import SideBar from '../SideBar/SideBar'
import './PageNotFound.css'

const PageNotFound = ({history}) => {
  const onClickOfBack = () => {
    history.replace('/')
  }
  return (
    <div className="page-not-found-container">
      <SideBar />
      <div className="page-not-found-content">
        <button type="button" className="back-button" onClick={onClickOfBack}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747725509/kytu7w7vqvvwe4iwz1l6.png"
            alt="back-button"
          />
          <p className="back-text">Back</p>
        </button>
        <div className="heading-and-text">
          <h1 className="page-not-found-heading">404</h1>
          <h1 className="page-not-found-text">PAGE NOT FOUND</h1>
          <img alt="page not found" />
          <button type="button" onClick={onClickOfBack}>
            Home Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
