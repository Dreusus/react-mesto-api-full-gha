class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
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

    register({ password, email }) {
        return this._request(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
    }

    login({ password, email }) {
        return this._request(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
    }

    checkToken(token) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        authorization: 'facd2054-3a74-4e2d-ae2f-3bd6ba6cfb7c',
        'Content-Type': 'application/json',
    },
});

export default auth;



