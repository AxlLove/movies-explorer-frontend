import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import React, {useState} from "react"

function Login ({handleLogin, successfully}) {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setState((prev)=>({
            ...prev,
            [name]:value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = state
        handleLogin(email, password)
    }
    return (
        <div className="auth-form">
            <Link to="/" className="logo"/>
            <form onSubmit={handleSubmit} className="auth-form__form">
                <h2 className="auth-form__title">Добро пожаловать!</h2>
                <fieldset className="auth-form__input-container auth-form__input-container_type_login">
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">E-mail</span>
                        <input onChange={handleChange} name={'email'} type="email" className="auth-form__text-field"/>
                        <span className="auth-form__error-message">Что-то пошло не так...</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Пароль</span>
                        <input onChange={handleChange} name={'password'} type="password" className="auth-form__text-field"/>
                        <span className="auth-form__error-message auth-form__error-message_visible">Что-то пошло не так...</span>
                    </label>
                </fieldset>
                <SubmitButton errMessage={'Ошибка входа'} successfully={successfully} buttonName="Войти"/>
                <p className="auth-form__text">Ещё не зарегистрированы? <Link className="auth-form__link" to="/signup">Регистрация</Link></p>
            </form>
        </div>
    )
}
export default Login;