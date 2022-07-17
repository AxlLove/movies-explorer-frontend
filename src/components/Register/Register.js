import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";

function Register () {
    return (
        <div className="auth-form">
            <Link to="/" className="logo"/>
            <form className="auth-form__form">
                <h2 className="auth-form__title">Добро пожаловать!</h2>
                <fieldset className="auth-form__input-container">
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Имя</span>
                        <input type="text" className="auth-form__text-field" required/>
                        <span className="auth-form__error-message">Что-то пошло не так...</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">E-mail</span>
                        <input type="text" className="auth-form__text-field" required/>
                        <span className="auth-form__error-message">Что-то пошло не так...</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Пароль</span>
                        <input type="text" className="auth-form__text-field" required/>
                        <span className="auth-form__error-message auth-form__error-message_visible">Что-то пошло не так...</span>
                    </label>
                </fieldset>
                <SubmitButton buttonName="Зарегестрироваться"/>
                <p className="auth-form__text">Уже зарегистрированы? <Link className="auth-form__link" to="/signin">Войти</Link></p>
            </form>
        </div>
    )
}
export default Register;