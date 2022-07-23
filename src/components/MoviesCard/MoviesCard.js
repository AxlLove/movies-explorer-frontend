import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import cardImage from "../../images/testCard.png"
import {MOVIES_URL} from "../../utils/constants";

function MoviesCard ({card}) {
const image = card.image.url
    return (
<Switch>
    <Route path='/movies'>
        <li className="movies__card">
            <div className="movies__card-info">
                <h2 className="movies__card-name">{card.nameRU}</h2>
                <p className="movies__card-duration">{card.duration} минут</p>
            </div>
            <img className="movies__card-image" src={`https://api.nomoreparties.co/${image}`} alt={card.nameRU}/>
            <button type="button" className="movies__card-button movies__card-button_type_saved">Сохранить</button>
        </li>
    </Route>
    <Route path='/saved-movies'>
    <li className="movies__card">
            <div className="movies__card-info">
                <h2 className="movies__card-name">В погоне за Бенкси</h2>
                <p className="movies__card-duration">27 минут</p>
            </div>
            <img className="movies__card-image" src={cardImage} alt="В погоне за Бенкси"></img>
            <button type="button" className="movies__card-button movies__card-button_type_delete"></button>
        </li>
        </Route>
</Switch>
    )
}
export default MoviesCard;