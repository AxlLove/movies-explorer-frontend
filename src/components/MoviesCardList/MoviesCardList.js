import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React, {useState} from "react";

function MoviesCardList ({cards, load, cardLoadErr}) {
    const LENGTH = cards.length;
    const LIMIT = 9;
    const cardsAdds = 3;

    const [showMore,setShowMore] = useState(true);

    const [list,setList] = useState(cards.slice(0, LIMIT))
    const [index,setIndex] = useState(cardsAdds);

    const loadMore = () =>{
        const newIndex = index + LIMIT
        const newShowMore = newIndex < (LENGTH - 1);
        const newList = list.concat(cards.slice(index, newIndex));
        setIndex(newIndex);
        setList(newList);
        setShowMore(newShowMore);
    }
    return (
        <Switch>
            <Route path="/movies">
                {cardLoadErr ?
                    <p className="movies__error-message">Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз</p>
                    :
                    <>
                        <ul className={`movies__card-list ${load ? 'movies__card-list_visible': ''}`}>
                            {
                                list.map(card => (
                                    <MoviesCard card={card} key={card.id}/>
                                ))
                            }
                        </ul>
                        {showMore && <button onClick={loadMore} type="button" className="movies__add-card-button">Еще</button>}
                    </>
}
            </Route>
            <Route path="/saved-movies">
                <ul className={`movies__card-list ${load ? 'movies__card-list_visible': ''}`}>
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
//https://question-it.com/questions/2686377/knopka-zagruzit-esche-v-react
//https://dev.to/narendersaini32/how-to-create-load-more-logic-in-react-474m