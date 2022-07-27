function SubmitButton ({buttonName, successfully, errMessage, isValid}) {

    return (
        <>
         <span className={`submit-button__error-message ${successfully?'submit-button__error-message_visible' : ''}`}>{errMessage}</span>
        <button disabled={!isValid}  type="submit" className={`submit-button ${!isValid? 'submit-button_disabled' : ''}`}>{buttonName}</button>
        </>
    )
}
export default SubmitButton;