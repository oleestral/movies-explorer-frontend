
import './SearchForm.css';
import find from '../../images/find.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
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
            required
          />
          <button
            className="search-form__btn"
            type="submit"
          ><img className='search-form__btn-img' alt="find" src={find}/></button>
        </div>
        <div className="search-form__filter">
          <FilterCheckbox/>
        </div>
        <hr className='search-form__line'/>
      </form>
    </section>
  );
}

export default SearchForm;