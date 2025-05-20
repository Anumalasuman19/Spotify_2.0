import {useState} from 'react'
import Cookies from 'js-cookie'
import './LoginPage.css'
import {Redirect} from 'react-router-dom'

const LoginPage = props => {
  const [userName, SetUserName] = useState('')
  const [password, SetPassword] = useState('')
  const [errorMessage, SetErrorMessage] = useState('')
  const [isLoading, SetLoader] = useState(false)

  const onUserNameChange = event => {
    SetUserName(event.target.value)
    SetErrorMessage('')
  }
  const onPasswordChange = event => {
    SetPassword(event.target.value)
    SetErrorMessage('')
  }

  const onLoginSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    const {history} = props
    history.replace('/')
  }

  const onLoginSubmit = async event => {
    event.preventDefault()
    SetLoader(true)
    const userFilledDetails = {
      username: userName,
      password,
    }
    console.log(userFilledDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userFilledDetails),
    }
    const apiResponse = await fetch(url, options)
    console.log(apiResponse)
    const jsonResponse = await apiResponse.json()
    console.log(jsonResponse)
    if (apiResponse.ok === true) {
      onLoginSuccess(jsonResponse.jwt_token)
    } else {
      SetLoader(false)
      SetUserName('')
      SetPassword('')
      SetErrorMessage(jsonResponse.error_msg)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-container">
      {isLoading ? (
        <div className="loader-container">
          <img
            className="spotify-icon"
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747385633/spotify-logo_fdkhrw.png"
            alt="login website logo"
          />
          <h1 className="loading-text">Loading...</h1>
        </div>
      ) : (
        <form className="login-credentials-container" onSubmit={onLoginSubmit}>
          <div className="logo-and-heading">
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747385633/spotify-logo_fdkhrw.png"
              className="spotify-icon"
              alt="login website logo"
            />
            <h1 className="login-heading">Spotify Remix</h1>
          </div>
          <div className="username-container">
            <label htmlFor="login-username" className="input-field-label">
              USERNAME
            </label>
            <input
              id="login-username"
              type="text"
              className="login-input-field"
              onChange={onUserNameChange}
              value={userName}
              required
            />
          </div>
          <div className="username-container">
            <label htmlFor="login-password" className="input-field-label">
              PASSWORD
            </label>
            <input
              id="login-password"
              type="password"
              className="login-input-field"
              onChange={onPasswordChange}
              value={password}
              required
            />
          </div>
          <button className="login-button" type="submit">
            LOGIN
          </button>
          <p className="error-message">{errorMessage}</p>
        </form>
      )}
    </div>
  )
}

export default LoginPage
