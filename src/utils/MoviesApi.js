const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies'

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