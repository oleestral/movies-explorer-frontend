import HeaderForms from "../HeaderForms/HeaderForms";
import Form from '../Form/Form'
function Register() {
    return (
        <section className="register">
            <HeaderForms title={"Добро пожаловать!"}/>
            <Form title={"Зарегистрироваться"} text={"Уже зарегистрированы?"}/>
        </section>
    )
}
export default Register;