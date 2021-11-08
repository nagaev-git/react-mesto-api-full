class Api {
  constructor({ url }) {
    this._url = url;
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
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
  // запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
  // запрос редактирования профиля
  editUserProfile(newUserInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo),
    }).then(this._handleResponse);
  }
  // запрос редактирования аватара
  editUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAvatar),
    }).then(this._handleResponse);
  }
  // запрос добавления карточки
  addCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCard),
    }).then(this._handleResponse);
  }
  // запрос изменения статуса лайка
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? fetch(`${this._url}/cards/likes/${cardId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
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
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._handleResponse);
  }
}

export default new Api({
  url: 'https://mesto.backend.nomoredomains.xyz',
})
