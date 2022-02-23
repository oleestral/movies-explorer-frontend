import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies(props) {
    const displayed = `${props.isVisibleSaveCase ? "movies-card-list__btn_flex" : 'movies-card-list__btn_hidden'}`
    return (
        <section className='saved-movies'>
            <div className='saved-movies-list movies-card-list__box'>
            {props.savedMovies?.map((item) => {
                return (
                    <MoviesCard
                        key={item.movieId}
                        movie={item}
                        onMovieDelete={props.handleDeleteMovie}
                        savedMoviesArray={props.savedMovies}
                    />
                )
            })}
            </div>
            <button type='button' className={`movies-card-list__btn ${displayed}`} onClick={props.showMoreSaveCase}>Ещё</button>
        </section>
    )
}
export default SavedMovies