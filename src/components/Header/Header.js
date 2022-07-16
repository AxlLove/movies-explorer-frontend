import {Link, NavLink} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({loggedIn, isMain}) {
    return (

        loggedIn ?
        <header className={`header ${isMain ? "header_type_main-page" : ""}`}>
            <div className="header__content">
                <Link to="/" className="header__logo"/>
                <Navigation>
                    <NavLink to="/movies" activeClassName='menu__link_active' className={`menu__link ${isMain ? "menu__link_type_main-page" : ""}`}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" activeClassName='menu__link_active' className={`menu__link ${isMain ? "menu__link_type_main-page" : ""}`}>Сохранённые фильмы</NavLink>
                </Navigation>
                <Link to="/profile" className={`menu__account-link ${isMain ? "menu__account-link_type_main-page" : ""}`}>Аккаунт
                    <div className={`menu__link-image ${isMain ? "menu__link-image_type_main-page" : ""}`}/>
                </Link>
            </div>
        </header>
            :
            <header className={`header ${isMain ? "header_type_main-page" : ""}`}>
                <div className="header__content">
                    <Link to="/" className="header__logo"/>
                    <div className="header__link-container">
                        <p className="header__register-link">Регистрация</p>
                        <button className="header__login-button">Войти</button>
                    </div>
                </div>
            </header>
    );
}

export default Header;

//TODO меню встает криво, добавил margin подумамй как можно сделать