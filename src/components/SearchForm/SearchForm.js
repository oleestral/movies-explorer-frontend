
import React from 'react';
import find from '../../images/find.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [text, setText] = React.useState('')

  function handleInsertText(e) {
    setText(e.target.value)
  }
  function handleSearch(e) {
    e.preventDefault();
    props.onSearch(text)
  }
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__box">
          <input
            id="queryInput"
            className="search-form__input"
            type="text"
            name="query"
            placeholder="Фильм"
            value={text}
            required
            onChange={handleInsertText}
          />
          <button
            className="search-form__btn"
            type="submit"
            onClick={handleSearch}
          ><img className='search-form__btn-img' alt="find" src={find}/></button>
        </div>
        <div className="search-form__filter">
          <FilterCheckbox onFilter={props.onFilter}/>
        </div>
        <hr className='search-form__line'/>
      </form>
    </section>
  );
}

export default SearchForm;