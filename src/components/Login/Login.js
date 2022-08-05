import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import React, {useState, useEffect} from "react"
import {useFormWithValidation} from "../../utils/useFormWithValidation";
import {emailRegExp} from "../../config/regExp";

function Login ({handleLogin, submitErrMessage, setSubmitErrMessage,submitButtonDisabled}) {
    const formValidation = useFormWithValidation()
    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = formValidation.values
        handleLogin(email, password)
    }
    useEffect(()=>{
        setSubmitErrMessage({})
    },[])
    return (
        <div className="auth-form">
            <Link to="/" className="logo"/>
            <form onSubmit={handleSubmit} className="auth-form__form" noValidate>
                <h2 className="auth-form__title">Добро пожаловать!</h2>
                <fieldset disabled={!submitButtonDisabled} className="auth-form__input-container auth-form__input-container_type_login">
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">E-mail</span>
                        <input pattern={emailRegExp}
                               onChange={formValidation.handleChange}
                               value={formValidation.values.email || ''}
                               name="email"
                               type="email"
                               className="auth-form__text-field"
                               required/>
                        <span className={`auth-form__error-message ${!formValidation.isValid? 'auth-form__error-message_visible' : ''}`}>{formValidation.errors.email}</span>
                    </label>
                    <label className="auth-form__input">
                        <span className="auth-form__input-name">Пароль</span>
                        <input value={formValidation.values.password || ''}
                               onChange={formValidation.handleChange}
                               name="password"
                               type="password"
                               className="auth-form__text-field"
                               minLength={2}
                               maxLength={32}
                               required/>
                        <span className={`auth-form__error-message ${!formValidation.isValid? 'auth-form__error-message_visible' : ''}`}>{formValidation.errors.password}</span>
                    </label>
                </fieldset>
                <SubmitButton isValid={formValidation.isValid}
                 errMessage={submitErrMessage}
                   buttonName="Войти"/>
                <p className="auth-form__text">Ещё не зарегистрированы? <Link className="auth-form__link" to="/signup">Регистрация</Link></p>
            </form>
        </div>
    )
}
export default Login;