import {useState, useEffect, useCallback} from "react";

export function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

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