import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, isActive, setActiveId} = props

  const {id, language} = eachLanguage
  const onClickLanguage = () => {
    setActiveId(id)
  }
  const className = isActive ? 'styled-nav-button' : 'nav-button'
  return (
    <li onClick={onClickLanguage}>
      <button type="button" className={className}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
