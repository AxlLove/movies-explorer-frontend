import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
        </section>

//TODO <Preloader />
// <MoviesCard />

    );
}

export default Movies;