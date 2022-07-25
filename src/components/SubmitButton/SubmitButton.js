function SubmitButton ({buttonName, successfully, errMessage}) {

    return (
        <>
         <span className={`submit-button__error-mesage ${successfully?'submit-button__error-mesage_visible' : ''}`}>{errMessage}</span>
        <button  type="submit" className="submit-button">{buttonName}</button>
        </>
    )
}
export default SubmitButton;