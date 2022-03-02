import '../../index.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { Route, Switch, useHistory, BrowserRouter, Redirect} from 'react-router-dom';
import NotFoundError from '../NotFoundError/NotFoundError';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import React from 'react';
import auth from "../../utils/Auth";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import apiMain from '../../utils/MainApi';
import apiMovies from '../../utils/MoviesApi';

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
  const [isChange, setIsChanged] = React.useState(false)
  const [isToken, setIsToken] = React.useState(false)
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
    ////gettin saved movies
    React.useEffect(() => {
      const jwt = localStorage.getItem("jwt");
        apiMain
            .getSavedMovies(jwt)
            .then((item) => {
                setSavedMovies(item.data)
                setResultSavedMovies(item.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])
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
        setIsVisibleButton(false)
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
                console.log('yes')
                setIsVisibleButtonSavedCase(true)
                  setDisplayedSavedMovies(resultSavedMovies.slice(0, moviesQuantity))
              }
              else {
                setIsVisibleButtonSavedCase(false)
                setDisplayedSavedMovies(resultSavedMovies)
              }
              
          } else {
            setDisplayedSavedMovies([])
          }
      },[moviesQuantity, resultSavedMovies])

  ////signup
  function handleSignUp(email, password, name) {
    auth
      .signUp(email, password, name)
      .then(() => {
        handleSignIn(email, password)
      })
      .catch((err) => {
        setIsError(true)
        if (err.status === 409) {
          setErrorText("Пользователь с таким email уже существует. Авторизируйтесь")
        }
        else {
          setErrorText("При регистрации пользователя произошла ошибка")
        }
      });
}

  ////signin
  function handleSignIn(email, password) {
    auth
    .signIn(email, password)
    .then((item) => {
      localStorage.setItem("jwt", item.token);
      setIsLogged(true)
    })
    .then(() => {
      const test = localStorage.getItem("jwt")
      console.log(test)
      if(test) {
        history.push('/movies')
        console.log('test 2',test)
      }
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
      .catch((err) => {
        console.log(err);
      });
},[isChange, isLogged]);

  ////logout
  function handleLogOut() {
    setIsLogged(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("resultFilteredMovies");
    localStorage.removeItem("filterCheckboxMovies");
    localStorage.removeItem("resultMovies");
    localStorage.removeItem("keyWordMovies");
    history.push("/")
  }
  ////update profile
  function handleUpdateProfile({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    apiMain.editUserProfile(name, email, jwt)
      .then((item) => {
        setCurrentUser(item)
        setIsError(true)
        setErrorText("Профиль успешно обновлен!")
        setIsChanged(true)
      })
      .catch((err) => {
        setIsError(true)
          if (err.status === 409) {
            setErrorText("Пользователь с таким email уже существует")
          }
          else {
            setErrorText("При обновлении профиля произошла ошибка")
          }
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
              const currentFilteredMovies = currentMovies.filter((m) => m.duration <= 40)
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
             setResultSavedMovies(resultSavedMovies.filter((m) => m.duration <= 40))
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
                setDisplayedSavedMovies([...savedMovies, item])
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
            setDisplayedSavedMovies(displayedSavedMovies.filter((c) => c._id !== movie._id))
          })
          .catch((err) => {
              console.log(err)
          })
  }
  React.useEffect(() => {
    const currentMovies = JSON.parse(localStorage.getItem("resultMovies"))
    if (!currentMovies) {
    setDisplayedMovies([])
    }
  },[])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
      <BrowserRouter>
      <Header isLogged={isLogged}/>
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
            />

            <Route path='/signup'>
            {isLogged ? (
                  <Redirect to="/movies" />
                ) : (
                  <Register onRegister={handleSignUp} title={errorText} isError={isError}/>
                )}
            </Route>
            <Route path='/signin'>
            {isLogged ? (
                  <Redirect to="/movies" />
                ) : (
                  <Login onLogin={handleSignIn} title={errorText} isError={isError}/>
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
