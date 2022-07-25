import React from "react";
import {UserContext} from "../../contexts/UserContext";
function Profile ({handleSignOut}) {
    const currentUser = React.useContext(UserContext);

    return (
        <section className="profile">
            <h2 className="profile__name">Привет, {currentUser.name}</h2>
            <ul className="profile__info-container">
                <li className="profile__info">
                    <p className="profile__info-type">Имя</p>
                    <p className="profile__info-current">{currentUser.name}</p>
                </li>
                <li className="profile__info">
                    <p className="profile__info-type">E-mail</p>
                    <p className="profile__info-current">{currentUser.email}</p>
                </li>
            </ul>
            <div className="profile__buttons">
                    <button  type="button" className="profile__button">Редактировать</button>
                    <button onClick={handleSignOut} type="button" className="profile__button profile__button_type_log-out">Выйти из аккаунта</button>
                </div>

        </section>

    )
}

export default Profile;