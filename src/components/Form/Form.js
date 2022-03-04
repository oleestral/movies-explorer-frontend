import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
function Form(props) {
    const location = useLocation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    function handleSetEmail(e) {
        setEmail(e.target.value);
      }
      function handleSetPasword(e) {
        setPassword(e.target.value);
      }
    function handleSetName(e) {
        setName(e.target.value)
    }
    
    return (
        <section className="form">
                {window.location.pathname === '/signin' ? (
                   <form className="form__from" onSubmit={props.onSubmit}>
                        <label htmlFor="email" className="form__label">E-mail</label>
                        <input
                        className="form__input"
                        name="email"
                        id="email"
                        type="email"
                        required
                        value={email || ''}
                        onChange={handleSetEmail}
                        />
                        <label htmlFor="password" className="form__label">Пароль</label>
                        <input
                        className="form__input"
                        name="password"
                        id="password"
                        type="password"
                        required
                        value={password || ''}
                        onChange={handleSetPasword}
                        />
                    </form>
                ) : (
                    <form className="form__from">
                    <label htmlFor="name" className="form__label">Имя</label>
                    <input
                    className="form__input"
                    name="name"
                    id="name"
                    type="text"
                    pattern="^[A-Za-zА-Яа-яЁё\s-]"
                    required
                    value={name || ''}
                    onChange={handleSetName}
                    />
                    <label htmlFor="email" className="form__label">E-mail</label>
                    <input
                    className="form__input"
                    name="email"
                    id="email"
                    type="email"
                    required
                    value={email || ''}
                    onChange={handleSetEmail}
                    />
                    <label htmlFor="password" className="form__label">Пароль</label>
                    <input
                    className="form__input"
                    name="password"
                    id="password"
                    type="password"
                    required
                    value={password || ''}
                    onChange={handleSetPasword}
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