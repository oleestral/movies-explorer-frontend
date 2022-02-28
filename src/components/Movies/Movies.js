import React from 'react';
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from '../Preloader/Preloader'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function Movies(props) {
    return(
        <section className="movies">
            <SearchForm onSearch={props.onSearch} onFilter={props.onFilter} defaultValue={props.defaultValue}/>
            {props.isPreloader && <Preloader/>}
            {props.movies.length === 0 && <ErrorPopup isError={props.isNotFound} title={'Ничего не найдено'}/>}
                <MoviesCardList 
                    movies={props.movies}
                    onMovieSave={props.onMovieSave}
                    onMovieDelete={props.onMovieDelete}
                    savedMoviesArray={props.savedMovies}
                    isVisible={props.isVisibleButton}
                    showMore={props.showMore}
                />
        </section>
    )
}
export default Movies