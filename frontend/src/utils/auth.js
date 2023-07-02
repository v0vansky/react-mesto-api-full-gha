class Auth {
    constructor(options) {
      this._url = options.url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ password, email })
        })
        .then((res) => this._checkResponse(res));
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
        .then((res) => this._checkResponse(res));
    }

    checkToken(jwt) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`,
            }
        })
        .then((res) => this._checkResponse(res));
    }
}

export const auth = new Auth({
    url: "https://api.mesto.vovansky.nomoreparties.sbs",
})