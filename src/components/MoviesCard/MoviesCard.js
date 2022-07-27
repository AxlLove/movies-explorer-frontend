import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import {useState} from "react";

function MoviesCard ({card, handleCardDelete, saveMovie, isLiked, savedCards}) {
    const [liked, setLiked] = useState(isLiked)
const image = card.image.url
    function handleDelete() {
    console.log(card)
        console.log(card)
        handleCardDelete(card)
    }
    function handleDislike () {
        const dislikedCard = savedCards.find(item=> item.movieId === card.id)
        console.log(dislikedCard)
        handleCardDelete(dislikedCard)
        setLiked(false)
    }
    function handleSaveMovie () {
        const {
            country,director, duration, year, description, image, trailerLink, id, nameRU, nameEN
        } = card;
        const cardImage =`https://api.nomoreparties.co${image.url}`
        saveMovie({
            country,director, duration, year, description, image: cardImage, trailerLink, thumbnail: cardImage, movieId: id, nameRU, nameEN
        })
        setLiked(true)
    }
    return (
<Switch>
    <Route path='/movies'>
        <li className="movies__card">
            <div className="movies__card-info">
                <h2 className="movies__card-name">{card.nameRU}</h2>
                <p className="movies__card-duration">{card.duration} минут</p>
            </div>
            <a href={card.trailerLink} target={"_blank"} rel={'noreferrer'}>
                <img className="movies__card-image" src={`https://api.nomoreparties.co/${image}`} alt={card.nameRU}/>
            </a>

            {liked?
                <button onClick={handleDislike} type="button" className="movies__card-button movies__card-button_type_saved">Сохранить</button>
                :
                <button onClick={handleSaveMovie} type="button" className="movies__card-button">Сохранить</button>
            }
        </li>
    </Route>
    <Route path='/saved-movies'>
    <li className="movies__card">
            <div className="movies__card-info">
                <h2 className="movies__card-name">{card.nameRU}</h2>
                <p className="movies__card-duration">{card.duration} минут</p>
            </div>
        <a href={card.trailerLink} target={"_blank"} rel={'noreferrer'}>
            <img className="movies__card-image" src={`${card.image}`} alt={card.nameRU}/>
        </a>
            <button onClick={handleDelete} type="button" className="movies__card-button movies__card-button_type_delete"/>
        </li>
        </Route>
</Switch>
    )
}
export default MoviesCard;