import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader'
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import SearchForm from "../SearchForm/SearchForm"

function SavedMovies(props) {
    const displayed = `${props.isVisible ? "movies-card-list__btn_flex" : 'movies-card-list__btn_hidden'}`
    return (
        <section className='saved-movies'>
             <SearchForm onSearch={props.onSearch} onFilter={props.onFilter} defaultValue={props.defaultValue}/>
             {props.isPreloader && <Preloader/>}
             {props.savedMovies.length === 0 && <ErrorPopup isError={props.isNotFound} title={'Ничего не найдено'}/>}
            <div className='saved-movies-list movies-card-list__box'>
            {props.savedMovies.map((item) => {
                return (
                        <MoviesCard
                        key={item.movieId}
                        movie={item}
                        onMovieDelete={props.onMovieDelete}
                        savedMoviesArray={props.savedMovies}
                        showMore={props.showMore}
                        />
                    
                )
            })}
            </div>
            <button type='button' className={`movies-card-list__btn ${displayed}`} onClick={props.showMore}>Ещё</button>
        </section>
    )
}
export default SavedMovies