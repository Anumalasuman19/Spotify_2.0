import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './SideBar.css'

const SideBar = props => {
  const onClickOfLogout = () => {
    console.log('Login route')
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="sidebar-container">
      <Link to="/">
        <img
          className="spotify-logo"
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747385633/spotify-logo_fdkhrw.png"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-button" onClick={onClickOfLogout}>
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747457566/log-out_lchwuh.png"
          alt="nn"
          className="logout-icon"
        />
        <p className="logout-text">Logout</p>
      </button>
    </div>
  )
}
export default withRouter(SideBar)
