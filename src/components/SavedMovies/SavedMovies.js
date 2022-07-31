import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {useEffect} from "react"

function SavedMovies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr,handleCardDelete, loadSavedCards, notFound}) {

    useEffect(()=> {
        loadSavedCards()
        console.log('movies')
    }, [])
    return (
        <section className="movies">
            <SearchForm saveInputChange={saveInputChange}
                        saveCheckBoxChange={saveCheckBoxChange}
                        checkBoxState={checkBoxState}
                        inputState={inputState}
                        onSubmitFindMovies={onSubmitFindMovies}
            />
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