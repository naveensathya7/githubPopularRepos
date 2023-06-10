// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, starsCount, issuesCount, forksCount, avatarUrl} = repoDetails

  return (
    <li className="repo-list-item">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h3 className="repo-name">{name}</h3>
      <div className="details">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="details">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="details">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
