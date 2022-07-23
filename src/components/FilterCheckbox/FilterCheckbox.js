function FilterCheckbox({saveCheckBoxChange, checkBoxState}) {
    return (
        <label className="search-form__checkbox-container">
            <input onChange={saveCheckBoxChange} type="checkbox" className="search-form__hiden-checkbox" id="" name="happy" checked={checkBoxState}/>
            <span className="search-form__visible-checkbox"></span>
            <span className="search-form__visible-checkbox-text">Короткометражки</span>
        </label>
        
    )
}
export default FilterCheckbox;