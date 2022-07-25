import React, {useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import SubmitButton from "../SubmitButton/SubmitButton";
function Profile ({handleSignOut,updateProfile}) {
    const [redact, setRedact] = useState(true)
    const currentUser = React.useContext(UserContext);

    const [state, setState] = useState({
        name: '',
        email: '',
    })
    useEffect(()=>{
        setState({
            name: currentUser.name,
            email: currentUser.email,
        })
    },[currentUser,redact])
    const handleChange = (e) => {
        const {name, value} = e.target
        setState((prev)=>({
            ...prev,
            [name]:value,
        }))
    }

    const readctProfile = ()=> {
        setRedact(false)
    }
    const onSubmit = (e)=> {
        const {name, email} = state;
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
                <label className="profile__info">
                    <span className="profile__info-type">Имя</span>
                    <input name="name" onChange={handleChange} value={state.name}  className="profile__info-current profile__info-current_type_input"></input>
                </label>
                <label className="profile__info">
                    <span className="profile__info-type">E-mail</span>
                    <input name="email" onChange={handleChange}value={state.email}   className="profile__info-current profile__info-current_type_input"></input>
                </label>
            </div>
                <div className="profile__buttons">
                    <SubmitButton buttonName={"Сохранить"}></SubmitButton>
                </div>
                </form>
                </>

            }

                
        </section>
    )
}

export default Profile;