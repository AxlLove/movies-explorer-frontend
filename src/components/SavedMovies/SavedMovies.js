import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
        </section>

//TODO <Preloader />
// <MoviesCard />

    );
}

export default SavedMovies;