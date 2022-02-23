import React from "react";
import { Link, useHistory } from "react-router-dom";
import {useFormWithValidation} from '../Validation/Validation'
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import HeaderForms from "../HeaderForms/HeaderForms";
function Login(props) {
    const history = useHistory()
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    const isDisabled = !isValid

    React.useEffect(() => {
        resetForm({}, {}, false);
      }, [resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(values);
        history.push("/movies")
    }
    return(
        <section className="login">
            <HeaderForms title={"Рады видеть!"}/>
            <section className="form">
                    <form className="form__from" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="form__label">E-mail</label>
                        <input
                            className="form__input"
                            name="email"
                            id="email"
                            type="email"
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                        />
                        <span className="form__error">{errors.email}</span>
                        <label htmlFor="password" className="form__label">Пароль</label>
                        <input
                            className="form__input"
                            name="password"
                            id="password"
                            type="password"
                            required
                            value={values.password || ''}
                            onChange={handleChange}
                            minLength="8"
                        />
                        <span className="form__error">{errors.password}</span>
                        <ErrorPopup isError={props.isError} title={props.title}/>
                        <button type='submit' className={`${isDisabled ? "form__btn form__btn_disabled" : "form__btn"}`} disabled={isDisabled}>Войти</button>
                </form>
            <p className="form__subtext form__sign">Ещё не зарегистрированы?
            <Link to="/signup" className="form__link"><span className="form__subtext">Регистрация</span></Link></p>
        </section>
        </section>
    )
}
export default Login;