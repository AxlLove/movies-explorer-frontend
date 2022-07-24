import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({onSubmitFindMovies, cards, saveInputChange, saveCheckBoxChange, checkBoxState,inputState, load, cardLoadErr}) {
    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList cards={cards} load={load} cardLoadErr={cardLoadErr}></MoviesCardList>
        </section>

//TODO <Preloader />
// <MoviesCard />

    );
}

export default SavedMovies;