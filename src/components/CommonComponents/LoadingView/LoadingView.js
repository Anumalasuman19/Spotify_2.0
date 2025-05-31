import './LoadingView.css'

const LoadingView = () => (
  <div className="loader-or-failure-container" data-testid="loader">
    <img
      className="spotify-icon"
      src="https://res.cloudinary.com/dzki1pesn/image/upload/v1747385633/spotify-logo_fdkhrw.png"
      alt="fsfs"
    />
    <h1 className="loading-text">Loading...</h1>
  </div>
)
export default LoadingView
