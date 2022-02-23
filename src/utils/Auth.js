class Auth {
    constructor({ BASE_URL, headers  }) {
      this._url = BASE_URL;
      this._headers = headers;
    }
    _getResponseData(res) {
      if (!res.ok) {
        const error = new Error(`${res.status}`)
        error.status = res.status
        return Promise.reject(error)
      }
      return res.json();
    }
    signIn(data) {
      return fetch(`${this._url}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ email: data.email, password: data.password }),
      }).then(this._getResponseData);
    }
    signUp(email, password, name) {
      return fetch(`${this._url}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ email: email, password: password, name: name }),
      }).then(this._getResponseData);
    }
    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(this._getResponseData);
    }
  }
  const auth = new Auth({ BASE_URL: "https://api.oleestral.diploma.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  } });
  export default auth;
  