import React from 'react';
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import apiMain from '../../utils/MainApi';
import apiMovies from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader'
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import SavedMovies from '../SavedMovies/SavedMovies';

function Movies() {
    const [movies, getMovies] = React.useState([])
    const [savedMovies, setSavedMovies] = React.useState([])

    const [foundMovie, setFoundMovie] = React.useState([])
    const [resultMovies, setResultMovies] = React.useState([])
    const [displayedMovies, setDisplayedMovies] = React.useState([])

    const [foundSavedMovies, setFoundSavedMovies] = React.useState([])
    const [resultSavedMovies, setResultSavedMovies] = React.useState([])
    const [displayedSavedMovies, setDisplayedSavedMovies] = React.useState([])

    const [isChanged, setisChanged] = React.useState(false) 
    const [isPreloader, setIsPreloader] = React.useState(false)
    const [isNotFound, setIsNotFound] = React.useState(false)
    const [moviesQuantity, setMoviesQuantity] = React.useState(0)
    const [addMovieQuantity, setAddMovieQuantity] = React.useState(0)

    const [isVisibleButton, setIsVisibleButton] = React.useState(false)
    const [isVisibleButtonSaveCase, setIsVisibleButtonSaveCase] = React.useState(false)
 
    const [screenSize, getDimension] = React.useState({
        dynamicWidth: window.innerWidth
      });
      const setDimension = () => {
        getDimension({
          dynamicWidth: window.innerWidth
        })
      }
      ////define screen size and set movies numbers
      React.useEffect(() => {
        window.addEventListener('resize', setDimension);
        if(window.innerWidth < 768) {
            setMoviesQuantity(5)
            setAddMovieQuantity(1)
        }
        else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            setMoviesQuantity(8)
            setAddMovieQuantity(2)
        }
        else if (window.innerWidth >= 1280) {
            setMoviesQuantity(12)
            setAddMovieQuantity(4)
        }
        return(() => {
            window.removeEventListener('resize', setDimension);
        })
      }, [screenSize])

    ////define movies quantity
    React.useEffect(() => {
        if(resultMovies && resultMovies.length !== 0) {
            if(resultMovies.length > moviesQuantity) {
                setIsVisibleButton(true)
                setDisplayedMovies(resultMovies.slice(0, moviesQuantity))
            }
            else {
                setIsVisibleButton(false)
                setDisplayedMovies(resultMovies)
            }
            
        }
    },[moviesQuantity, resultMovies])

       ////define saved movies quantity
       React.useEffect(() => {
        if(resultSavedMovies && resultSavedMovies.length !== 0) {
            if(resultSavedMovies.length > moviesQuantity) {
                setIsVisibleButtonSaveCase(true)
                setDisplayedSavedMovies(resultSavedMovies.slice(0, moviesQuantity))
            }
            else {
                setIsVisibleButtonSaveCase(false)
                setDisplayedSavedMovies(resultSavedMovies)
            }
            
        }

    },[moviesQuantity, resultSavedMovies])

    ////add more movies
    function handleLoadMovies() {
        if(window.location.pathname === '/movies') {
            setDisplayedMovies((state) => {
                return resultMovies.slice(0, state.length +  addMovieQuantity)
            });
        }
        else {
            setDisplayedSavedMovies((state) => {
                return resultSavedMovies.slice(0, state.length +  addMovieQuantity)
            })
        }
        
    }
    //// hide button when the result is full
    React.useEffect(() => {
        if(displayedMovies.length === resultMovies.length) {
            setIsVisibleButton(false)
        }
    },[displayedMovies, resultMovies])
    //// hide button when the saved result is full
    React.useEffect(() => {
        if(displayedSavedMovies.length === resultSavedMovies.length) {
            setIsVisibleButtonSaveCase(false)
        }
    },[displayedSavedMovies, resultSavedMovies])
    ////get all movies
    React.useEffect(() => {
        apiMovies
            .getMovies()
            .then((item) => {
                getMovies(item)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    ////gettin saved movies
    function gettingSavedMovies() {
        const jwt = localStorage.getItem("jwt");
        apiMain
            .getSavedMovies(jwt)
            .then((item) => {
                setSavedMovies(item)
                setResultSavedMovies(item.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        gettingSavedMovies()
    },[isChanged])

    ////save movie
    function handleSaveMovie(movie) {
        const jwt = localStorage.getItem("jwt");
        apiMain
            .saveMovie(movie, jwt)
            .then((item) => {
                setSavedMovies([item, ...JSON.stringify(savedMovies)])
                setisChanged(true)
                gettingSavedMovies()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    ////delete movie 
    function handleDeleteMovie(movie) {
        const jwt = localStorage.getItem("jwt");
        apiMain
            .removeMovie(movie, jwt)
            .then(() => {
                setSavedMovies((state) => state.data.filter((c) => c._id !== movie._id))
                setisChanged(true)
                gettingSavedMovies()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    ////search movie
    function handleMovieSearch(value) {
        localStorage.setItem('keyWord', value)
        setIsPreloader(true)
        setResultMovies(movies.filter((item) => {
            return (item.nameRU.toLowerCase().includes(value) ?? item.nameEN.toLowerCase().includes(value))
        }))
        setResultSavedMovies(savedMovies.data.filter((item) => {
            return (item.nameRU.toLowerCase().includes(value) ?? item.nameEN.toLowerCase().includes(value))
        }))
        setIsPreloader(false)
        setIsNotFound(true)
    }
    ////filter movie
    function handleMovieFilter(value) {
        localStorage.setItem('filterCheckbox', value)
        setFoundMovie(resultMovies)
        setFoundSavedMovies(resultSavedMovies)
        if(value) {
            setResultMovies(resultMovies.filter((m) => m.duration <= 40))
            setResultSavedMovies(resultSavedMovies.filter((m) => m.duration <= 40))
            setIsNotFound(true)
        }
        else {
            setResultMovies(foundMovie)
            setResultSavedMovies(foundSavedMovies)
            setIsNotFound(false)
        }
    }
    //// set filtered movies
    React.useEffect(() => {
        localStorage.setItem('resultMovies', JSON.stringify(resultMovies))
    },[resultMovies])

    ////set filtered saved movies
    React.useEffect(() => {
        localStorage.setItem('resultSavedMovies', JSON.stringify(resultSavedMovies))
    },[resultSavedMovies])

    //// show result movies
    React.useEffect(() => {
        if(JSON.parse(localStorage.getItem('resultMovies')).length === 0) {
            return setDisplayedMovies([]) 
        }
    },[resultMovies])
    //// show result saved movies
    React.useEffect(() => {
        if(JSON.parse(localStorage.getItem('resultSavedMovies')).length === 0) {
            return setDisplayedSavedMovies([]) 
        }
    },[resultSavedMovies])
    //
    return(
        <section className="movies">
            <SearchForm onSearch={handleMovieSearch} onFilter={handleMovieFilter}/>
            {isPreloader && <Preloader/>}
            {window.location.pathname === '/movies' 
            ? 
                <>
                    {displayedMovies.length === 0 && <ErrorPopup isError={isNotFound} title={'Ничего не найдено'}/>}
                    <MoviesCardList 
                      movies={displayedMovies}
                      onMovieSave={handleSaveMovie}
                      onMovieDelete={handleDeleteMovie}
                      savedMoviesArray={savedMovies}
                      isVisible={isVisibleButton}
                      showMore={handleLoadMovies}
                    />
                </>
            :
                <>
                    {resultSavedMovies.length === 0 && <ErrorPopup isError={isNotFound} title={'Ничего не найдено'}/>}
                    <SavedMovies 
                    savedMovies={displayedSavedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    getSavedMovies={gettingSavedMovies}
                    isVisibleSaveCase={isVisibleButtonSaveCase}
                    showMoreSaveCase={handleLoadMovies}
                    />
                    
                </>
        
            }
        </section>
    )
}
export default Movies