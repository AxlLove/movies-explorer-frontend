class MainApi {
    constructor(data) {
        this._url = data.url;
    }
    _getResponsiveData(res) {
        if (!res.ok) {
            return Promise.reject(res.status);
        }
        return res.json();
    }
    get _headers() {
        return {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    }

    getProfile () {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then((res)=>this._getResponsiveData(res))
    }
    updateProfile ({name, email}) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
        .then((res)=>this._getResponsiveData(res))
    }
    getSavedFilms () {
        return fetch(`${this._url}/movies`, {
            headers: this._headers,
        })
        .then(res=>this._getResponsiveData(res))
    }
    saveFilm ({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId}) {
        return fetch(`${this._url}/movies`,{
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId})
        })
        .then(res=>this._getResponsiveData(res))
    }
    deleteSavedFilm (id) {
        return fetch(`${this._url}/movies/${id}`,{
            headers: this._headers,
            method: 'DELETE',
        })
        .then(res=>this._getResponsiveData(res))
    }

    register ({name, email, password}) {
        return fetch(`${this._url}/signup`,{
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({name, email, password})
        })
        .then(res=>this._getResponsiveData(res))
    }
    login ({email, password}) {
        return fetch(`${this._url}/signin`,{
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        .then(res=>this._getResponsiveData(res))
    }
}

export  const mainApi = new MainApi({url: 'https://api.diplom-me.nomoreparties.sbs',})