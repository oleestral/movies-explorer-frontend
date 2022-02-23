import React from 'react';

function FilterCheckbox(props) {
  function handleFilter(e) {
    props.onFilter(e.target.checked)
  }
  return (
    <div className="filter-checkbox">
        <label className="switch">
            <input type="checkbox" onClick={handleFilter}/>
            <span className="slider round"></span>
        </label>
        <p className="filter-checkbox__sign">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;