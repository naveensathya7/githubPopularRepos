// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {setLanguageFilter, filterDetails, isSelected} = props
  const {id, language} = filterDetails

  const buttonCls = isSelected
    ? `filter-button selected-button`
    : 'filter-button'

  const onClickButton = () => {
    setLanguageFilter(id)
  }

  return (
    <li>
      <button type="button" className={buttonCls} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
