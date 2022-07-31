import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {useEffect} from "react";

function Movies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr,saveMovie,savedCards,handleCardDelete, notFound, loadSavedCards, allSavedCards}) {
    useEffect(()=> {
        loadSavedCards()
        console.log('movies')
    }, [])

    return (
        <section className="movies">
            <SearchForm onSubmitFindMovies={onSubmitFindMovies}
                        saveInputChange={saveInputChange}
                        saveCheckBoxChange={saveCheckBoxChange}
                        checkBoxState={checkBoxState}
                        inputState={inputState}
                        load={load}

            />
            <Preloader load={load}/>
            <MoviesCardList cards={cards}
                            load={load}
                            cardLoadErr={cardLoadErr}
                            saveMovie={saveMovie}
                            savedCards={savedCards}
                            handleCardDelete={handleCardDelete}
                            notFound={notFound}
                            allSavedCards={allSavedCards}/>
        </section>



    );
}

export default Movies;