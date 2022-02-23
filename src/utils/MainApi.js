class MainApi {
    constructor({ address }) {
        this._address = address;
    }
    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    //user information
    getUserInfo(token) {
        return fetch(`${this._address}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        }).then(this._getResponseData);
    }
    //edit user profile
    editUserProfile(name, email, token) {
        return fetch(`${this._address}/users/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: name, email: email}),
        }).then(this._getResponseData);
    }
    //get saved novies
    getSavedMovies(token) {
        return fetch(`${this._address}/movies`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
          },
        })
          .then(this._getResponseData);
      }
    //save movie
    saveMovie(movie, token) {
        return fetch(`${this._address}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                country: movie.country || 'international',
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN || '...',
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
            })
        })
    }
    //delete movie
    removeMovie(movie, token) {
        return fetch(`${this._address}/movies/${movie._id}`, {
          method: 'DELETE',
          headers: {
            "Authorization" : `Bearer ${token}`,
          },
        })
        .then(this._getResponseData);
    }
}
const apiMain = new MainApi({
    address: "https://api.oleestral.diploma.nomoredomains.rocks",
  });
  export default apiMain;