import './Header.css';

function Header({children}) {
    return (
        <header className="header header_type_main-page">
            <div className="header__content">
                <div className="header__logo"/>
                <div className="header__link-container">
                    <p className="header__register-link">Регистрация</p>
                    <button className="header__login-button">Войти</button>
                </div>
            </div>
        </header>
    );
}

export default Header;

//TODO зменить тег p на Link из react router
//TODO придумать реализацию пропсов header__link-container