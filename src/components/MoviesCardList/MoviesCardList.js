import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList () {
    return (
        <Switch>
            <Route path="/movies">
                <ul className="movies__card-list">
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                </ul>
                <button type="button" className="movies__add-card-button">Еще</button>
            </Route>
            <Route path="/saved-movies">
                <ul className="movies__card-list">
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                    <MoviesCard></MoviesCard>
                </ul>
                <button type="button" className="movies__add-card-button">Еще</button>
            </Route>
        </Switch>
 )
}
export default MoviesCardList;

//TODO https://habr.com/ru/company/timeweb/blog/584862/