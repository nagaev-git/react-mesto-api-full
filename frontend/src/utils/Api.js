class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  // обработчик запроса
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // запрос данных профиля
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
  // запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
  // запрос редактирования профиля
  editUserProfile(newUserInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    }).then(this._handleResponse);
  }
  // запрос редактирования аватара
  editUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAvatar),
    }).then(this._handleResponse);
  }
  // запрос добавления карточки
  addCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    }).then(this._handleResponse);
  }
  // запрос удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const addLike = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    };
    const removeLike = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    };
    return fetch(
      `${this._url}/cards/${cardId}/likes`,
      isLiked ? removeLike : addLike
    ).then(this._handleResponse);
  }
}

const api = new Api({
  url: "https://mesto.backend.nomoredomains.xyz",
});

export default api;
