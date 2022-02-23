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
import apiMain from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [isLogged, setIsLogged] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [isChanged, setIsChanged] = React.useState(false);


  ////signup
  function handleSignUp({email, password, name}) {
    auth
      .signUp(email, password, name)
      .then((item) => {
        if(item) {
          handleSignIn(item)
          setIsLogged(true)
        }
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
  function handleSignIn(data) {
    auth
    .signIn(data)
    .then((item) => {
      if(item) {
        localStorage.setItem("jwt", item.token);
        setIsLogged(true)
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
  ////logout
  function handleLogOut() {
    setIsLogged (false);
    localStorage.removeItem("jwt");
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
  ////check token & get user data
  function getUserInfo(token) {
    apiMain
        .getUserInfo(token)
        .then((item) => {
          setCurrentUser(item)
        })
        .catch((err) => {
          console.log(err);
        });
  }
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
      auth
      .checkToken(jwt)
      .then((item) => {
        if(item) {
          setIsLogged(true)
          getUserInfo(jwt)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[isLogged, history, isChanged]);


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
            />
            <ProtectedRoute
              path="/saved-movies"
              component={Movies}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              onSignOut={handleLogOut}
              onProfile={handleUpdateProfile}
              title={errorText}
              isError={isError}
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
