import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import React, {useState} from "react"

function Register ({handleRegister, successfully}) {
    const [state, setState] = useState({
        name: '',
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
        const {name, email, password} = state
        handleRegister(name, email, password)
    }

    return (
        <div className="auth-form">
            <Link to="/" className="logo"/>
            <form onSubmit={handleSubmit} className="auth-form__form">
                <h2 className="auth-form__title">Добро пожаловать!</h2>
                <fieldset className="auth-form__input-container">
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Имя</span>
                        <input name="name" onChange={handleChange} type="text" className="auth-form__text-field" required/>
                        <span className="auth-form__error-message">Что-то пошло не так...</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">E-mail</span>
                        <input name="email" onChange={handleChange} type="email" className="auth-form__text-field" required/>
                        <span className="auth-form__error-message">Что-то пошло не так...</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Пароль</span>
                        <input name="password" onChange={handleChange} type="password" className="auth-form__text-field" required/>
                        <span className="auth-form__error-message auth-form__error-message_visible">Что-то пошло не так...</span>
                    </label>
                </fieldset>
                <SubmitButton errMessage={'шибка регистрации'} successfully={successfully} buttonName="Зарегестрироваться"/>
                <p className="auth-form__text">Уже зарегистрированы? <Link className="auth-form__link" to="/signin">Войти</Link></p>
            </form>
        </div>
    )
}
export default Register;
