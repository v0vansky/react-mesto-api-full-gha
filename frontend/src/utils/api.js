class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getToken() {
    const jwt = localStorage.getItem('jwt');
    this._headers.authorization = `Bearer ${jwt}`;
  }

  getInitialCards(){
    this._getToken();
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  postCard(data) {
    this._getToken();
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    this._getToken();
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    this._getToken();
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    this._getToken();
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  patchUserInfo(data) {
    this._getToken();
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => this._checkResponse(res));
  }

  patchAvatar(data) {
    this._getToken();
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => this._checkResponse(res));
  }
}

export const api = new Api({
  url: "https://api.mesto.vovansky.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  }
})