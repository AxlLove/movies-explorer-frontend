import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr}) {
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
            <MoviesCardList cards={cards} load={load} cardLoadErr={cardLoadErr}></MoviesCardList>
        </section>



    );
}

export default Movies;