import {useState, useEffect, useCallback} from "react";

export function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

        const customValidityMessage =(e)=> {
            let message
            switch(e.target.name) {
                case 'name':
                    if  (!e.target.value.match("[a-zA-Zа-яА-ЯёЁ\s-]")) {
                        message = 'name'
                    }
                    else {
                        message = e.target.validationMessage
                    }
                    break;
                    case 'email': 
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if  (e.target.value.match(re)) {
                            message = 'email'
                    } 
                    else {
                        message = e.target.validationMessage
                    }
                    break;
                    default :
                    message = e.target.validationMessage
                    break;
            }
            return message
    }

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]: value});
        console.log(event.target.validation)
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity())
    };


    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {values, setValues, handleChange, resetForm , errors, isValid, setErrors, setIsValid};
}