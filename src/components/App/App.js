import '../../index.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import NotFoundError from '../NotFoundError/NotFoundError';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Header/>
        <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="/movies">
              <SearchForm/>
              <MoviesCardList/>
            </Route>
            <Route path="/saved-movies">
            <SearchForm/>
              <MoviesCardList/>
            </Route>
            <Route path='/signup'><Register/></Route>
          <Route path='/signin'><Login/></Route>
            <Route path='/profile'>
            <Profile name={'Человек'}/>
            </Route>
            
            <Route path="*">
              <NotFoundError/>
            </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
