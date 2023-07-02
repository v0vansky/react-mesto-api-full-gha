class Api {
  constructor(options) {
    this._url = options.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(){
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => this._checkResponse(res));
  }

  postCard(data) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => this._checkResponse(res));
  }

  patchUserInfo(data) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
    .then((res) => this._checkResponse(res));
  }

  patchAvatar(data) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar }),
    })
    .then((res) => this._checkResponse(res));
  }
}

export const api = new Api({
  url: "https://api.mesto.vovansky.nomoreparties.sbs",
})