import React from 'react';

function MoviesCard(props) {
    const [time, setTime] = React.useState('')
    const [click, setClick] = React.useState(false)
    const buttonStyle = `movies-card__btn movies-card__circle ${click ? 'movies-card__circle_active' : 'movies-card__circle_notactive'}`

    //convert duration
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч' + minutes + 'м';
    }
    //make saved & unsaved
    function handleSaveMovie() {
        setClick(!click)
        if(click) {
            props.onMovieDelete(props.savedMoviesArray.data.filter((item) => item.movieId === props.movie.id)[0])
        } 
        else {
            props.onMovieSave(props.movie)
        }
    }
    //delete movie
    function handleDeleteMovie() {
        props.onMovieDelete(props.savedMoviesArray.filter((item) => item._id === props.movie._id)[0])
    }
    //setting duration
    React.useEffect(() => {
        setTime(getTimeFromMins(props.movie.duration))
    },[props.movie])
    //setting like
    React.useEffect(() => {
            if (props.savedMoviesArray.data && props.savedMoviesArray.data.some((item) => item && item.movieId === props.movie.id)) {
                setClick(true)
            }
    }, [props.movie, props.savedMoviesArray.data])


    return(
        <div className="movies-card" id={props.movie.id}>
            <a href={props.movie.trailerLink} alt = "trailer">
                {window.location.pathname === '/saved-movies' ? (<img className="movies-card__img" alt="moviePicture" src={props.movie.image} target="_blank"/>) : (<img className="movies-card__img" alt="moviePicture" src={`https://api.nomoreparties.co/${props.movie.image.url}`} target="_blank"/>)}
            </a>
            <div className='movies-card__box'>
                <h2 className='movies-card__title'>{props.movie.nameRU}</h2>
                {window.location.pathname === '/saved-movies' ? (<button type='button' className='movies-card__btn movies-card__cross' onClick={handleDeleteMovie}/>) : ( <button type='button' className={buttonStyle} onClick={handleSaveMovie}/>)}
            </div>
            <p className='movies-card__sign'>{time}</p>
        </div>
    )
}
export default MoviesCard;