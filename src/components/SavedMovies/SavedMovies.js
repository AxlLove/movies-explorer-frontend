import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {useEffect} from "react";

function SavedMovies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr, showSavedCards,handleCardDelete}) {
    useEffect(()=> {
        showSavedCards()
    }, [])

    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList cards={cards} load={load} cardLoadErr={cardLoadErr} handleCardDelete={handleCardDelete}></MoviesCardList>
        </section>

//TODO <Preloader />
// <MoviesCard />

    );
}

export default SavedMovies;