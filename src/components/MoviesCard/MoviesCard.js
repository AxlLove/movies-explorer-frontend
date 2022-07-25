import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";


function MoviesCard ({card, handleCardDelete, saveMovie}) {
    const isSaved = card.id
const image = card.image.url
    function handleDelete() {
        handleCardDelete(card)
    }
    function handleSaveMovie (e) {
    console.log(card)
        const {
            country,director, duration, year, description, image, trailerLink, thumbnail, id, nameRU, nameEN
        } = card;
    const cardImage =`https://api.nomoreparties.co${image.url}`
        console.log({country,director, duration, year, description, image: cardImage, trailerLink, thumbnail: cardImage, movieId: id, nameRU, nameEN})
        saveMovie({
            country,director, duration, year, description, image: cardImage, trailerLink, thumbnail: cardImage, movieId: id, nameRU, nameEN
        })
    }
    return (
<Switch>
    <Route path='/movies'>
        <li className="movies__card">
            <div className="movies__card-info">
                <h2 className="movies__card-name">{card.nameRU}</h2>
                <p className="movies__card-duration">{card.duration} минут</p>
            </div>
            <img className="movies__card-image" src={`https://api.nomoreparties.co/${image}`} alt={card.nameRU}/>
            <button onClick={handleSaveMovie} type="button" className="movies__card-button movies__card-button_type_saved">Сохранить</button>
        </li>
    </Route>
    <Route path='/saved-movies'>
    <li className="movies__card">
            <div className="movies__card-info">
                <h2 className="movies__card-name">{card.nameRU}</h2>
                <p className="movies__card-duration">{card.duration} минут</p>
            </div>
            <img className="movies__card-image" src={`${card.image}`} alt={card.nameRU}/>
            <button onClick={handleDelete} type="button" className="movies__card-button movies__card-button_type_delete"/>
        </li>
        </Route>
</Switch>
    )
}
export default MoviesCard;