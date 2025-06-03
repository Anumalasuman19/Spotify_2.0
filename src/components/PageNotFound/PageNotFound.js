import SideBar from '../SideBar/SideBar'
import './PageNotFound.css'

const PageNotFound = ({history}) => {
  const onClickOfBack = () => {
    history.replace('/')
  }
  return (
    <div className="page-not-found-container">
<<<<<<< HEAD
      <SideBar />
=======
      <div className="playlist-sidebar-container">
        <SideBar />
      </div>
>>>>>>> moved the components folder to spotify remix folder
      <div className="page-not-found-content">
        <button type="button" className="back-button" onClick={onClickOfBack}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747725509/kytu7w7vqvvwe4iwz1l6.png"
            alt="back-button"
          />
          <p className="back-text">Back</p>
        </button>
        <div className="heading-and-text">
<<<<<<< HEAD
          <h1 className="page-not-found-heading">404</h1>
          <h1 className="page-not-found-text">PAGE NOT FOUND</h1>
          <img alt="page not found" />
=======
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1748606290/404_img_esq8yq.png"
            alt="page not found"
            className="page-not-found-img"
          />
          <h1 className="page-not-found-text">PAGE NOT FOUND</h1>
>>>>>>> moved the components folder to spotify remix folder
          <button type="button" onClick={onClickOfBack}>
            Home Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
