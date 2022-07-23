import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSubmitFindMovies,saveCheckBoxChange, saveInputChange, checkBoxState, inputState}) {
    function handleSubmit(e) {
        e.preventDefault()
        onSubmitFindMovies();
    }
    return (
<form onSubmit={handleSubmit} className="movies__search-form">
    <div className="movies__input-container">
        <div className="movies__search-icon"/>
        <input onChange={saveInputChange} type="text" className="movies__search-input" placeholder="Фильм" value={inputState} required></input>
        <button type="submit" className="movies__search-button">Найти</button>
    </div>
    <FilterCheckbox saveCheckBoxChange={saveCheckBoxChange} checkBoxState={checkBoxState}/>
</form>
    );
}

export default SearchForm;

//TODO придумать как ограничить ширину инпута