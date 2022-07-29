import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {useEffect} from "react"

function SavedMovies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr,handleCardDelete}) {

    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <Preloader load={load}/>
            <MoviesCardList cards={cards} load={load} cardLoadErr={cardLoadErr}  handleCardDelete={handleCardDelete}></MoviesCardList>
        </section>

    );
}

export default SavedMovies;