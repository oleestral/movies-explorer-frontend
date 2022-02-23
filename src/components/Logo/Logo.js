import logo from '../../images/logo.svg'
import { Link, withRouter } from "react-router-dom";

function Logo() {
    return (
        <Link to='/'> <img className='logo' alt='logo' src={logo}></img></Link>
    )
}
export default withRouter(Logo)