import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {useEffect} from "react"
import ResetFilter from "../ResetFilter.js/ResetFilter";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SavedMovies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr,handleCardDelete, loadSavedCards, notFound}) {
    useEffect(()=> {
        loadSavedCards()
    }, [])
    return (
        <section className="movies">
            <SearchForm saveInputChange={saveInputChange}
                        inputState={inputState}
                        onSubmitFindMovies={onSubmitFindMovies}>
                 <FilterCheckbox 
                  saveCheckBoxChange={saveCheckBoxChange} 
                  checkBoxState={checkBoxState} />
                <ResetFilter loadSavedCards={loadSavedCards}></ResetFilter>
            </SearchForm>
            <Preloader load={load}/>
            <MoviesCardList
                            cards={cards}
                            load={load}
                            cardLoadErr={cardLoadErr}
                            handleCardDelete={handleCardDelete}
                            notFound={notFound}/>
        </section>

    );
}

export default SavedMovies;