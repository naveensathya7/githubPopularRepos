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

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    filter: languageFiltersData[0].id,
    languagesList: [],
    isLoading: true,
    fetchSuccess: false,
  }

  componentDidMount() {
    this.getLanguagesData(languageFiltersData[0].id)
  }

  onSuccessfulFetch = data => {
    const updatedData = data.popular_repos.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    this.setState({
      languagesList: updatedData,
      isLoading: false,
      fetchSuccess: true,
    })
  }

  onFailureFetch = () => {
    this.setState({isLoading: false, fetchSuccess: false})
  }

  getLanguagesData = async filter => {
    this.setState({isLoading: true})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${filter}`

    const response = await fetch(apiUrl)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessfulFetch(data)
    } else {
      this.onFailureFetch()
    }
  }

  setLanguageFilter = newFilterId => {
    this.setState({filter: newFilterId})
    this.getLanguagesData(newFilterId)
  }

  render() {
    const {filter, languagesList, isLoading, fetchSuccess} = this.state

    return (
      <div className="repos-container">
        <h1 className="repos-heading">Popular</h1>
        <ul className="buttons-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              filterDetails={each}
              isSelected={each.id === filter}
              setLanguageFilter={this.setLanguageFilter}
            />
          ))}
        </ul>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          <div>
            {fetchSuccess ? (
              <ul className="repo-lists">
                {languagesList.map(each => (
                  <RepositoryItem key={each.id} repoDetails={each} />
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
                  alt="failure view"
                />
                <h1>Something went Wrong</h1>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
export default GithubPopularRepos
