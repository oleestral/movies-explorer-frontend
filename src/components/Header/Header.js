import React from 'react';
import { useLocation } from 'react-router-dom';
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
          if ((props.isLogged && location.pathname === '/') || !props.isLogged) {
              setIsBackground('#465dff')
          }
          else setIsBackground('#FFFFFF')
      },[props.isLogged, location])
      

return (
    <>
    {(location.pathname !== '/signin' && location.pathname !== '/signup') && 
        <header className='header' style={{backgroundColor: isBackground}}>
            <Logo />
            {!props.isLogged ? <HeaderNotAuthed/> : 
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
    </>
)
}
export default Header;