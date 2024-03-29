import {useEffect, useState} from "react";

function SearchForm({onSubmitFindMovies, saveInputChange, inputState, children}) {
   const [searchFormIsValid, setSearchFormIsValid] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        onSubmitFindMovies();
    }
    function handleChange (e) {
        saveInputChange(e)
        setSearchFormIsValid(e.target.closest("form").checkValidity())
    }
    useEffect(()=>{
        if (inputState !== '') {
            setSearchFormIsValid(true)
        }
    },[])
    return (
<form onSubmit={handleSubmit} name={'form'} className="movies__search-form" noValidate>
    <div className="movies__input-container">
        <div className="movies__search-icon"/>
        <input onChange={handleChange} type="text" className="movies__search-input" placeholder="Фильм" value={inputState} required minLength={2} maxLength={32}></input>
        <button disabled={!searchFormIsValid} type="submit" className={`movies__search-button ${!searchFormIsValid? 'movies__search-button_disabled' : ''}`}>Найти</button>
    </div>
    <div className="movies__filters">
    {children}
    </div>
</form>
    );
}

export default SearchForm;
