class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.statusText}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  editUserAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(avatar)
    })
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
  }

  editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
  }

  addCard(data) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');;
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});



