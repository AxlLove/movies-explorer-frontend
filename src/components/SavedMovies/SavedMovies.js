import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {useEffect} from "react"

function SavedMovies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr,showSavedCards,handleCardDelete}) {
    useEffect(()=> {
        showSavedCards()
    }, [])
    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <Preloader load={load}/>
            <MoviesCardList cards={cards} load={load} cardLoadErr={cardLoadErr} showSavedCards={showSavedCards} handleCardDelete={handleCardDelete}></MoviesCardList>
        </section>

    );
}

export default SavedMovies;