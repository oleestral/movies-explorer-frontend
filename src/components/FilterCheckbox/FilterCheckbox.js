function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
        <label className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
        </label>
        <p className="filter-checkbox__sign">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;