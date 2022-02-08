import HeaderForms from "../HeaderForms/HeaderForms";
import Form from '../Form/Form'
function Login() {
    return(
        <section className="login">
            <HeaderForms title={"Рады видеть!"}/>
            <Form title={"Войти"} text={"Ещё не зарегистрированы?"} />
        </section>
    )
}
export default Login;