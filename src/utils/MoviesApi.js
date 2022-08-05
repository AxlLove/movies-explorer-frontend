import {MOVIES_URL} from "../config/constants";

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`)
}

export const getFilms = () => {
    return fetch(MOVIES_URL, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(checkResponse)
}

//TODO вынести checkResponse в отдельнуы