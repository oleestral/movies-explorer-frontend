import Logo from '../Logo/Logo';
import HeaderNotAuthed from '../HeaderNotAuthed/HeaderNotAuthed';
import HeaderAuthed from '../HeaderAuthed/HeaderAuthed';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';

function Header() {
    const style = {
        background: '#FFFFFF'
    }
    const [isOpened, setIsOpened] = React.useState('')
    function openPopup() {
        setIsOpened('flex')
    }function closePopup() {
        setIsOpened('none')
    }
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

return (
    <Switch>
        <Route exact path ='/'>
            <header className='header'>
                <Logo />
                <HeaderNotAuthed/>
            </header>
        </Route>
        <Route exact path ='/(movies|saved-movies|profile)'>
            <header className='header' style={style }>
                <Logo />
                {!isSized ? 
                (<>
                    <HeaderAuthed/>
                </>) : 
                (<>
                    <button type='button' className='header__btn' onClick={openPopup}/>
                    <div className='header__popup' style={{display:isOpened}}>
                        <div className='header__popup-container'>
                            <button className='header__popup-btn' onClick={closePopup}></button>
                            <HeaderAuthed/>
                        </div>
                       
                    </div></>
                        
                )}
                
                
            </header>
        </Route>
    </Switch>
)
}
export default Header;