import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    popularReposList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularLanguages()
  }

  getFormattedData = data => ({
    id: data.id,
    name: data.name,
    avatarUrl: data.avatar_url,
    forksCount: data.forks_count,
    issuesCount: data.issues_count,
    starsCount: data.stars_count,
  })

  setActiveId = id => {
    this.setState({activeId: id}, this.getPopularLanguages)
  }

  getPopularLanguages = async () => {
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedFetchedData = {
        popularRepos: fetchedData.popular_repos,
      }

      const updatedReposList = updatedFetchedData.popularRepos.map(eachRepo =>
        this.getFormattedData(eachRepo),
      )
      console.log(updatedReposList)
      this.setState({
        popularReposList: updatedReposList,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGithubPopularReposViews = () => {
    const {popularReposList} = this.state

    return (
      <div className="github-popular-repos">
        <ul className="repository-list-container">
          {popularReposList.map(eachRepoItem => (
            <RepositoryItem eachRepoItem={eachRepoItem} key={eachRepoItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureViews = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLanguageFilterItem = () => {
    const {activeId} = this.state
    return (
      <ul className="languages-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            eachLanguage={eachLanguage}
            isActive={eachLanguage.id === activeId}
            key={eachLanguage.id}
            setActiveId={this.setActiveId}
          />
        ))}
      </ul>
    )
  }

  renderGithubPopularRepos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGithubPopularReposViews()
      case apiStatusConstants.failure:
        return this.renderFailureViews()

      default:
        return this.renderLoader()
    }
  }

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const popularStyling = apiStatusConstants.inProgress
      ? 'styled-popular-heading'
      : 'popular-heading'
    return (
      <div className="github-popular-repos-container">
        <h1 className={popularStyling}>Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderGithubPopularRepos()}
      </div>
    )
  }
}
export default GithubPopularRepos
