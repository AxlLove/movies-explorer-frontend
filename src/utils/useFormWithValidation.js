import {useState, useEffect, useCallback} from "react";

export function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const useValidations = (value, validators) => {
        const [isEmpty, setEmpty] = useState({})
        const [minLengthError, setMinLengthError] = useState({})
        useEffect(()=> {
            for (const validation in validators) {
                switch (validation){
                    case 'minLength':
                        value.length < validators[validation] ?
                            setMinLengthError({value: true, message: 'Длинна должна превышать 2 символа'})

                            :
                            setMinLengthError({value:false, message: ''})
                        break;
                    case  'isEmpty':
                        value ?
                            setEmpty({value: false, message: ''})
                            :
                            setEmpty({value:true, message: 'Поле не должно быть пустым'})
                        break;
                }

            }
        },[value])
        return {isEmpty, minLengthError}
    }
    const useInput  = (initialState, validator)=> {
        const [value, setValue] = useState(initialState)
        const [dirty, setDirty] = useState(false)
        const valid = useValidations(value, validator)
        const onChange = (e) => {
            setValue(e.target.value)
            console.log(valid)
        }
        const onBlur = () => {
            setDirty(true)
        }
        return {onChange, onBlur, value, ...valid, dirty}
    }
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };


    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setValues, useInput, useValidations };
}