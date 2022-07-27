import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import React, {useState} from "react"
import {useFormWithValidation} from "../../utils/useFormWithValidation";

function Login ({handleLogin, successfully}) {
    const formValidation = useFormWithValidation()
    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = formValidation.values
        handleLogin(email, password)
    }
    return (
        <div className="auth-form">
            <Link to="/" className="logo"/>
            <form onSubmit={handleSubmit} className="auth-form__form" noValidate>
                <h2 className="auth-form__title">Добро пожаловать!</h2>
                <fieldset className="auth-form__input-container auth-form__input-container_type_login">
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">E-mail</span>
                        <input onChange={formValidation.handleChange} name={'email'} type="email" className="auth-form__text-field" required/>
                        <span className={`auth-form__error-message ${!formValidation.isValid? 'auth-form__error-message_visible' : ''}`}>{formValidation.errors.email}</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Пароль</span>
                        <input onChange={formValidation.handleChange} name={'password'} type="password" className="auth-form__text-field" minLength={2} maxLength={32} required/>
                        <span className={`auth-form__error-message ${!formValidation.isValid? 'auth-form__error-message_visible' : ''}`}>{formValidation.errors.password}</span>
                    </label>
                </fieldset>
                <SubmitButton isValid={formValidation.isValid} errMessage={'Ошибка входа'} successfully={successfully} buttonName="Войти"/>
                <p className="auth-form__text">Ещё не зарегистрированы? <Link className="auth-form__link" to="/signup">Регистрация</Link></p>
            </form>
        </div>
    )
}
export default Login;