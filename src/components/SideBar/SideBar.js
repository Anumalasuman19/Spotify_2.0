import {withRouter} from 'react-router-dom'
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
      <button type="button" className="logout-button" onClick={onClickOfLogout}>
        <p className="logout-text">Logout</p>
      </button>
    </div>
  )
}
export default withRouter(SideBar)
