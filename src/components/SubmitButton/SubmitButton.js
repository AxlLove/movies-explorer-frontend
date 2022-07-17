function SubmitButton ({buttonName}) {
    return (
        <>
        <span className="submit-button__error-mesage submit-button__error-mesage_visible">При обновлении профиля произошла ошибка.</span>
        <button  type="submit" className="submit-button">{buttonName}</button>
        </>
    )
}
export default SubmitButton;