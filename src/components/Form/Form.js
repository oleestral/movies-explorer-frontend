import { Link, withRouter,useLocation } from "react-router-dom";
import React from "react";
function Form(props) {
    const location = useLocation();
    return (
        <section className="form">
                {window.location.pathname === '/signin' ? (
                   <form className="form__from">
                        <label htmlFor="email" className="form__label">E-mail</label>
                        <input
                        className="form__input"
                        name="email"
                        id="email"
                        type="email"
                        required
                        />
                        <label htmlFor="password" className="form__label">Пароль</label>
                        <input
                        className="form__input"
                        name="password"
                        id="password"
                        type="password"
                        required
                        />
                    </form>
                ) : (
                    <form className="form__from">
                    <label htmlFor="fullname" className="form__label">Имя</label>
                    <input
                    className="form__input"
                    name="fullname"
                    id="fullname"
                    type="text"
                    required
                    />
                    <label htmlFor="email" className="form__label">E-mail</label>
                    <input
                    className="form__input"
                    name="email"
                    id="email"
                    type="email"
                    required
                    />
                    <label htmlFor="password" className="form__label">Пароль</label>
                    <input
                    className="form__input"
                    name="password"
                    id="password"
                    type="password"
                    required
                    />
                </form>
                )}
                <button type='submit' className="form__btn">{props.title}</button>
            <p className="form__subtext form__sign">{props.text}
            <Link to={location.pathname === "/signin" ? "/signup" : "/signin"} className="form__link"><span className="form__subtext">{`${location.pathname === "/signin" ? "Регистрация" : "Войти"}`}</span></Link></p>
        </section>
        
    )
}
export default withRouter(Form)