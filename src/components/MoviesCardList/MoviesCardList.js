import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    const displayed = `${props.isVisible ? "movies-card-list__btn_flex" : 'movies-card-list__btn_hidden'}`
return (
    <div className='movies-card-list'>
        <div className='movies-card-list__box'>
            {props.movies?.map((item) => {
                return (
                    <MoviesCard
                        key={item.id}
                        movie={item}
                        movies={props.movies}
                        onMovieSave={props.onMovieSave}
                        onMovieDelete={props.onMovieDelete}
                        savedMoviesArray={props.savedMoviesArray}
                    />
                )
            })}
    </div>
    <button type='button' className={`movies-card-list__btn ${displayed}`} onClick={props.showMore}>Ещё</button>
    </div>
)
}
export default MoviesCardList