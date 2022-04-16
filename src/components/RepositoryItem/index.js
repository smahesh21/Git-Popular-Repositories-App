import './index.css'

const RepositoryItem = props => {
  const {eachRepoItem} = props
  const {name, issuesCount, forksCount, avatarUrl, starsCount} = eachRepoItem
  return (
    <li className="repository-item-card">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <h1 className="heading">{name}</h1>
      <div>
        <div className="description-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="icon"
            alt="stars"
          />
          <p className="description">{starsCount} stars</p>
        </div>
        <div className="description-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="icon"
            alt="forks"
          />
          <p className="description">{forksCount} forks</p>
        </div>

        <div className="description-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="icon"
            alt="open issues"
          />
          <p className="description">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
