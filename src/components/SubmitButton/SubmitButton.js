function SubmitButton ({buttonName, successfully, errMessage, isValid}) {

    const {err, message} = errMessage;
    return (
        <>
         <span className={`submit-button__error-message ${!err?'submit-button__error-message_visible' : ''}`}>{message}</span>
        <button disabled={!isValid}  type="submit" className={`submit-button ${!isValid? 'submit-button_disabled' : ''}`}>{buttonName}</button>
        </>
    )
}
export default SubmitButton;