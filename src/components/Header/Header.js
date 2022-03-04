import React from 'react';
import { useLocation, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import HeaderNotAuthed from '../HeaderNotAuthed/HeaderNotAuthed';
import HeaderAuthed from '../HeaderAuthed/HeaderAuthed';

function Header(props) {
    const location = useLocation()
    const [isOpened, setIsOpened] = React.useState('')
    const [isSized, setIsSizes] = React.useState(false)
    const [screenSize, getDimension] = React.useState({
      dynamicWidth: window.innerWidth
    });
    const [isBackground, setIsBackground] = React.useState('')
    const setDimension = () => {
      getDimension({
        dynamicWidth: window.innerWidth
      })
    }
    function openPopup() {
        setIsOpened('flex')
    }
    function closePopup() {
        setIsOpened('none')
    }
      React.useEffect(() => {
        window.addEventListener('resize', setDimension);
        if(window.innerWidth <= 1280) {
            setIsSizes(true)
        }
        else {
            setIsSizes(false)
        }
        return(() => {
            window.removeEventListener('resize', setDimension);
        })
      }, [screenSize])

      React.useEffect(() => {
        const jwt = localStorage.getItem("jwt");
          if ((jwt && location.pathname === '/') || !jwt) {
              setIsBackground('#465dff')
          }
          else setIsBackground('#FFFFFF')
      },[location])
      

return (
    <Route path="/(|movies|saved-movies|profile|signin|signup)">
        {(location.pathname !== '/signin' && location.pathname !== '/signup') && 
        <header className='header' style={{backgroundColor: isBackground}}>
            <Logo />
            {!localStorage.getItem("jwt") ? <HeaderNotAuthed/> : 
            (<>
                {!isSized ? <HeaderAuthed/> :
                <>
                    <button type='button' className='header__btn' onClick={openPopup} style={{backgroundColor: isBackground}}/>
                    <div className='header__popup' style={{display:isOpened}}>
                        <div className='header__popup-container'>
                            <button className='header__popup-btn' onClick={closePopup}></button>
                            <HeaderAuthed/>
                        </div>
                    </div>
                </>}
            </>)}
        </header>
    }
    </Route>
)
}
export default Header;