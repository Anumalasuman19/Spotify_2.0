import './FailureView.css'

const FailureView = props => {
  const {onClickOfTryAgain} = props
  return (
    <div className="loader-or-failure-container">
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
}

export default FailureView
