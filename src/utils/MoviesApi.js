import { MOVIES_URL } from './constants'
class MoviesApi {
    constructor({ address }) {
        this._address = address;
    }
    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    //get all movies
    getMovies() {
        return fetch(`${this._address}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        }).then(this._getResponseData);
        
    }
}
const apiMovies = new MoviesApi({
    address: `${MOVIES_URL}`,
})
export default apiMovies;