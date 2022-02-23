import { Link, withRouter } from "react-router-dom";
function HeaderNotAuthed() {
    return (
        <div className="header-not-authed">
            <Link to='/signup' className='header-not-authed__link' target="_blank" rel="noreferrer"><p className='header-not-authed__registration'>Регистрация</p></Link>
            <Link to='/signin'><button type='button' className='header-not-authed__btn'>Войти</button></Link>
        </div>
    )
}
export default withRouter(HeaderNotAuthed);