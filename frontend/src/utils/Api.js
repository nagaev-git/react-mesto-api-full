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
      headers: this._headers,
    }).then(this._handleResponse);
  }
  // запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  // запрос редактирования профиля
  editUserProfile(newUserInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newUserInfo),
    }).then(this._handleResponse);
  }
  // запрос редактирования аватара
  editUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newAvatar),
    }).then(this._handleResponse);
  }
  // запрос добавления карточки
  addCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newCard),
    }).then(this._handleResponse);
  }
  // запрос изменения статуса лайка
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._handleResponse)
      : fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "PUT",
          headers: this._headers,
        }).then(this._handleResponse);
  }
  // запрос удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "bd92b376-a12a-4ae7-a181-e2ffac2d35f6",
    "Content-Type": "application/json",
  },
});

export default api;
