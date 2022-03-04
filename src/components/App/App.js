import React from 'react';
import { Route, Switch, useHistory, BrowserRouter, Redirect} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import '../../index.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import NotFoundError from '../NotFoundError/NotFoundError';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import auth from "../../utils/Auth";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import apiMain from '../../utils/MainApi';
import apiMovies from '../../utils/MoviesApi';
import { SHORT_MOVIE_DURATION , 
  MOVIES_NUMBER_SMALL_SCREEN, MOVIES_NUMBER_SMALL_SCREEN_ADD, 
  MOVIES_NUMBER_MEDUIM_SCREEN,MOVIES_NUMBER_MEDIUM_SCREEN_ADD,
  MOVIES_NUMBER_BIG_SCREEN, MOVIES_NUMBER_BIG_SCREEN_ADD
} from '../../utils/constants'

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: "", email: "" });

  const [movies, getMovies] = React.useState([])
  const [resultMovies, setResultMovies] = React.useState([])
  const [foundMovie, setFoundMovie] = React.useState([])
  const [displayedMovies, setDisplayedMovies] = React.useState([])

  const [savedMovies, setSavedMovies] = React.useState([])
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([])
  const [resultSavedMovies, setResultSavedMovies] = React.useState([])
  const [displayedSavedMovies, setDisplayedSavedMovies] = React.useState([])

  const [moviesQuantity, setMoviesQuantity] = React.useState(0)
  const [addMovieQuantity, setAddMovieQuantity] = React.useState(0)

  const [isLogged, setIsLogged] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [isPreloader, setIsPreloader] = React.useState(false)
  const [isNotFound, setIsNotFound] = React.useState(false)
  const [isVisibleButton, setIsVisibleButton] = React.useState(false)
  const [isVisibleButtonSavedCase, setIsVisibleButtonSavedCase] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth
    })
  }
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
  ////define screen size and set movies numbers
  React.useEffect(() => {
    window.addEventListener('resize', setDimension);
    if(window.innerWidth < 768) {
        setMoviesQuantity(MOVIES_NUMBER_SMALL_SCREEN)
        setAddMovieQuantity(MOVIES_NUMBER_SMALL_SCREEN_ADD)
    }
    else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setMoviesQuantity(MOVIES_NUMBER_MEDUIM_SCREEN)
        setAddMovieQuantity(MOVIES_NUMBER_MEDIUM_SCREEN_ADD)
    }
    else if (window.innerWidth >= 1280) {
        setMoviesQuantity(MOVIES_NUMBER_BIG_SCREEN)
        setAddMovieQuantity(MOVIES_NUMBER_BIG_SCREEN_ADD)
    }
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
  //// add movies depending on screen size
  function handleLoadMovies() {
    const currentMovies = JSON.parse(localStorage.getItem("resultMovies"))
    if(window.location.pathname === '/movies' && currentMovies) {
        setDisplayedMovies((state) => {
            return currentMovies.slice(0, state.length +  addMovieQuantity)
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
  const currentMovies = JSON.parse(localStorage.getItem("resultMovies")) || []
  if(displayedMovies.length === currentMovies.length) {
      setIsVisibleButton(false)
  }
  },[displayedMovies, resultMovies])
  //// hide button when the result is full saved movies
  React.useEffect(() => {
    if(displayedSavedMovies.length === resultSavedMovies.length) {
      setIsVisibleButtonSavedCase(false)
    }
    },[displayedSavedMovies.length, resultSavedMovies.length])

    //// show movies depending on screen size
    React.useEffect(() => {
      setIsPreloader(false)
      const currentMovies = JSON.parse(localStorage.getItem("resultMovies"))
      const currentCheckBox = JSON.parse(localStorage.getItem('filterCheckboxMovies'))
      const currentFilteredMovies = JSON.parse(localStorage.getItem("resultFilteredMovies"))
      if (currentCheckBox) {
        if(currentFilteredMovies && currentFilteredMovies.length !== 0) {
          if(currentFilteredMovies.length > moviesQuantity) {
              setIsVisibleButton(true)
              setDisplayedMovies(currentFilteredMovies.slice(0, moviesQuantity))
          }
          else {
              setIsVisibleButton(false)
              setDisplayedMovies(currentFilteredMovies)
          }
        }
        else {
          setDisplayedMovies([])
        }
      }
      else {
        if(currentMovies && currentMovies.length !== 0) {
          if(currentMovies.length > moviesQuantity) {
              setIsVisibleButton(true)
              setDisplayedMovies(currentMovies.slice(0, moviesQuantity))
          }
          else {
              setIsVisibleButton(false)
              setDisplayedMovies(currentMovies)
          }
        }
        else {
          setDisplayedMovies([])
        }
      }
        
  },[moviesQuantity, resultMovies])
         //// show saved movies depending on screen size
         React.useEffect(() => {
          setIsPreloader(false)
          if(resultSavedMovies && resultSavedMovies.length !== 0) {
              if(resultSavedMovies.length > moviesQuantity) {
                setIsVisibleButtonSavedCase(true)
                  setDisplayedSavedMovies(resultSavedMovies.slice(0, moviesQuantity))
              }
              else {
                setIsVisibleButtonSavedCase(false)
                setDisplayedSavedMovies(resultSavedMovies)
              }
          }
          else setDisplayedSavedMovies([])
      },[moviesQuantity, resultSavedMovies])
  ////signup
  function handleSignUp(email, password, name) {
    setIsLoading(true)
    auth
      .signUp(email, password, name)
      .then(() => {
        handleSignIn(email, password)
        setIsError(false)
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        setIsError(true)
        if (err.status === 409) {
          setErrorText("Пользователь с таким email уже существует. Авторизируйтесь")
        }
        else {
          setErrorText("При регистрации пользователя произошла ошибка")
        }
        setIsLoading(false)
      })
}

  ////signin
  function handleSignIn(email, password) {
    setIsLoading(true)
    auth
    .signIn(email, password)
    .then((item) => {
      localStorage.setItem("jwt", item.token);
      setIsLogged(true)
    })
    .then(() => {
      if(localStorage.getItem("jwt")) {
        history.push('/movies')
      }
      setIsError(false)
    })
    .then(() => {
      setIsLoading(false)
    })
    .catch((err) => {
      setIsError(true)
      if (err.status === 401) {
        setErrorText("Неправильный логин или пароль")
      }
      else if (err.status === 400) {
        setErrorText("При авторизации произошла ошибка. Переданный токен некорректен.")
      }
      else {
        setErrorText("При авторизации произошла ошибка")
      }
      setIsLoading(false)
    })
  }
 ////get user data
React.useEffect(() => {
  const jwt = localStorage.getItem("jwt");
    apiMain
      .getUserInfo(jwt)
      .then((item) => {
        setIsLogged(true)
        setCurrentUser(item)
      })
      .then(() => {
        apiMain
        .getSavedMovies(jwt)
        .then((item) => {
            setSavedMovies(item.data)
            setResultSavedMovies(item.data)
        })
        .catch((err) => {
            console.log(err)
        })
      })
      .catch((err) => {
        console.log(err);
      });
},[isLogged]);

  ////logout
  function handleLogOut() {
    setIsLogged(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("resultFilteredMovies");
    localStorage.removeItem("filterCheckboxMovies");
    localStorage.removeItem("resultMovies");
    localStorage.removeItem("keyWordMovies");
    setResultMovies([])
    setDisplayedMovies([])
    history.push("/")
  }
  ////update profile
  function handleUpdateProfile({ name, email }) {
    setIsLoading(true)
    const jwt = localStorage.getItem("jwt");
    apiMain.editUserProfile(name, email, jwt)
      .then((item) => {
        setCurrentUser(item.data)
        setIsError(true)
        setErrorText("Профиль успешно обновлен!")
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        setIsError(true)
          if (err.status === 409) {
            setErrorText("Пользователь с таким email уже существует")
          }
          else {
            setErrorText("При обновлении профиля произошла ошибка")
          }
          setIsLoading(false)
      })
  }
        ////search movie
      function handleMovieSearch(value) {
          setIsPreloader(true)
          if(window.location.pathname === '/movies') {
            localStorage.setItem('keyWordMovies', value)
            const currentMovies = movies.filter((item) => {
              return (item.nameRU.toLowerCase().includes(value) ?? item.nameEN.toLowerCase().includes(value))
            })
            localStorage.setItem('resultMovies', JSON.stringify(currentMovies))
            setResultMovies(currentMovies)
          }
          else {
            setResultSavedMovies(savedMovies.filter((item) => {
              return (item.nameRU.toLowerCase().includes(value) ?? item.nameEN.toLowerCase().includes(value))
            }))
          }
          setIsNotFound(true)
      }
          ////filter movie
        function handleMovieFilter(value) {
          if(window.location.pathname === '/movies') {
            localStorage.setItem('filterCheckboxMovies', value)
            const currentMovies = JSON.parse(localStorage.getItem("resultMovies"))
            setFoundMovie(currentMovies)
            if(value) {
              const currentFilteredMovies = currentMovies.filter((m) => m.duration <= SHORT_MOVIE_DURATION)
              localStorage.setItem('resultFilteredMovies', JSON.stringify(currentFilteredMovies))
              setResultMovies(currentFilteredMovies)
              setIsNotFound(true)
            }
            else {
              setResultMovies(foundMovie)
              setIsNotFound(false)
            }
          }
          else {
            setFoundSavedMovies(resultSavedMovies)
            if(value) {
             setResultSavedMovies(resultSavedMovies.filter((m) => m.duration <= SHORT_MOVIE_DURATION))
              setIsNotFound(true)
            }
            else {
              setResultSavedMovies(foundSavedMovies)
              setIsNotFound(false)
            }
          }
        }
     
        ////save movie
        function handleSaveMovie(movie) {
          const jwt = localStorage.getItem("jwt");
            apiMain
              .saveMovie(movie, jwt)
              .then((item) => {
                setSavedMovies([...savedMovies, item])
                setResultSavedMovies([...savedMovies, item])
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
            setSavedMovies(savedMovies.filter((c) => c._id !== movie._id))
            setResultSavedMovies(resultSavedMovies.filter((c) => c._id !== movie._id))
          })
          .catch((err) => {
              console.log(err)
          })
  }
  React.useEffect(() => {
    const currentMovies = JSON.parse(localStorage.getItem("resultMovies"))
    if (!currentMovies) {
      setResultMovies([])
      setDisplayedMovies([])
    }
  },[])
  //// error disappear
  React.useEffect(() => {
    const error = setTimeout(() => {
      setIsError(false)
    }, 5000)
    return () => clearTimeout(error)
  },[isError])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
      <BrowserRouter>
      <Header/>
        <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              onSearch={handleMovieSearch}
              onFilter={handleMovieFilter}
              isPreloader={isPreloader}
              movies={displayedMovies}
              isNotFound={isNotFound}
              onMovieSave={handleSaveMovie}
              onMovieDelete={handleDeleteMovie}
              savedMovies={savedMovies}
              isVisibleButton={isVisibleButton}
              showMore={handleLoadMovies}
              defaultValue={JSON.parse(localStorage.getItem('filterCheckboxMovies')) || false}
              isLogged={isLogged}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              savedMovies={displayedSavedMovies}
              onMovieDelete={handleDeleteMovie}
              onSearch={handleMovieSearch}
              showMore={handleLoadMovies}
              isPreloader={isPreloader}
              isNotFound={isNotFound}
              isVisible={isVisibleButtonSavedCase}
              onFilter={handleMovieFilter}
              isLogged={isLogged}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              onSignOut={handleLogOut}
              onProfile={handleUpdateProfile}
              title={errorText}
              isError={isError}
              isLogged={isLogged}
              isLoading={isLoading}
            />

            <Route path='/signup'>
            {isLogged ? (
                  <Redirect to="/movies" />
                ) : (
                  <Register onRegister={handleSignUp} title={errorText} isError={isError} isLoading={isLoading}/>
                )}
            </Route>
            <Route path='/signin'>
            {isLogged ? (
                  <Redirect to="/movies" />
                ) : (
                  <Login onLogin={handleSignIn} title={errorText} isError={isError} isLoading={isLoading}/>
                )}
            </Route>
            <Route path="*">
              <NotFoundError/>
            </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
