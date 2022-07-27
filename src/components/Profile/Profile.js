import React, {useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import SubmitButton from "../SubmitButton/SubmitButton";
import {useFormWithValidation} from "../../utils/useFormWithValidation";
function Profile ({handleSignOut,updateProfile}) {
    const [redact, setRedact] = useState(true)
    const currentUser = React.useContext(UserContext);

    const formValidation = useFormWithValidation()

    useEffect(()=>{
        formValidation.setValues({
            name: currentUser.name,
            email: currentUser.email,
        })
    },[currentUser,redact])


    const readctProfile = ()=> {
        setRedact(false)
    }
    const onSubmit = (e)=> {
        const {name, email} = formValidation.values;
        e.preventDefault()
        updateProfile({name, email})
        setRedact(true)

    }

    return (
        <section className="profile">
            <h2 className="profile__name">Привет, {currentUser.name}</h2>   
            {
                redact?
                <>
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
                    <button onClick={readctProfile}  type="button" className="profile__button">Редактировать</button>
                    <button onClick={handleSignOut} type="button" className="profile__button profile__button_type_log-out">Выйти из аккаунта</button>
                </div>
                </>

                :
                <>
                <form onSubmit={onSubmit}>
                <div className="profile__info-container">
                <label className="profile__info profile__info_type_form">
                    <div className='profile__info-block' >
                        <span className="profile__info-type">Имя</span>
                        <input name="name" onChange={formValidation.handleChange} value={formValidation.values.name}  className="profile__info-current profile__info-current_type_input" type={"text"} required minLength={2} maxLength={32}></input>
                    </div>
                    <span className={`auth-form__error-message auth-form__error-message_type_profile ${!formValidation.isValid? 'auth-form__error-message_visible' : ''}`}>{formValidation.errors.name}</span>
                </label>
                <label className="profile__info profile__info_type_form">

                    <div className='profile__info-block'>
                        <span className="profile__info-type">E-mail</span>
                        <input name="email" onChange={formValidation.handleChange} value={formValidation.values.email} type={"email"} required className="profile__info-current profile__info-current_type_input"></input>
                    </div>
                    <span className={`auth-form__error-message ${!formValidation.isValid? 'auth-form__error-message_visible' : ''}`}>{formValidation.errors.email}</span>

                </label>
            </div>
                <div className="profile__buttons">
                    <SubmitButton isValid={formValidation.isValid} buttonName={"Сохранить"}></SubmitButton>
                </div>
                </form>
                </>

            }

                
        </section>
    )
}

export default Profile;