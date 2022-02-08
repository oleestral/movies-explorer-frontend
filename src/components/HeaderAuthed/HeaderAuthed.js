import React, { useCallback } from 'react';
import Account from '../../images/account.svg'
import { Link } from 'react-router-dom';
function HeaderAuthed() {
    const [isSized, setIsSizes] = React.useState(false)
    const [screenSize, getDimension] = React.useState({
        dynamicWidth: window.innerWidth
      });
      const setDimension = () => {
        getDimension({
          dynamicWidth: window.innerWidth
        })
      }
      
      React.useEffect(() => {
        window.addEventListener('resize', setDimension);
        if(window.innerWidth < 1280) {
            setIsSizes(true)
        }
        else {
            setIsSizes(false)
        }
        return(() => {
            window.removeEventListener('resize', setDimension);
        })
      }, [screenSize])

    return(
        <div className="header-authed">
            <div className="header-authed__movies">
                {isSized && <Link  to = '/' className="header-authed__link header-authed__movies-list">Главная</Link>}
                <Link to = '/movies' className="header-authed__link header-authed__movies-list">Фильмы</Link>
                <Link to = '/saved-movies' className="header-authed__link header-authed__movies-saved">Сохранённые фильмы</Link>
            </div>
            <Link to = '/profile' className="header-authed__account">
                <p className="header-authed__link header-authed__profile">Аккаунт</p>
                <div className='header-authed__img'><img className='header-authed__icon' alt='account' src={Account}></img></div>
            </Link>
        </div>
    )
}
export default HeaderAuthed;