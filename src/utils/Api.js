class Api {
    constructor({ baseUrl, headers }) {
        this._link = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._link}cards`, {
            headers: this._headers
        })
        .then(this._getResponseData);

    }

    getUserInfo() {
        return fetch(`${this._link}users/me`, {
            headers: this._headers
        })

        .then(this._getResponseData);
    }

    setUserInfo(data) {
        return fetch(`${this._link}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.description
            })
        })

        .then(this._getResponseData);
    }

    addCard(data) {
        return fetch(`${this._link}cards `, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
                })
        })

        .then(this._getResponseData);
    }

    deleteCard(id) {
        return fetch(`${this._link}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })

        .then(this._getResponseData);
    }

    changeLikeCardStatus(id, isLiked) {
        if (!isLiked) {
           return this.dislikeCard(id);
        } else {
           return this.likeCard(id);
        }
     }

    likeCard(id) {
        return fetch(`${this._link}cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })

        .then(this._getResponseData);
    }

    dislikeCard(id) {
        return fetch(`${this._link}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })

        .then(this._getResponseData);
    }

    setAvatar(link) {
        return fetch(`${this._link}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })

        .then(this._getResponseData);
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49/', 
    headers: {  
      authorization: '15db24d7-fbd4-4557-a75b-6ba2280bfc57',
      'Content-Type': 'application/json'
      }
  });