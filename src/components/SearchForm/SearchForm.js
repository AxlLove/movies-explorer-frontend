import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
<form className="movies__search-form">
    <div className="movies__input-container">
        <div className="movies__search-icon"></div>
        <input type="text" className="movies__search-input" placeholder="Фильм"></input>
        <button type="button" className="movies__search-button">Найти</button>
    </div>
    <FilterCheckbox></FilterCheckbox>
</form>
    );
}

export default SearchForm;

//TODO придумать как ограничить ширину инпута