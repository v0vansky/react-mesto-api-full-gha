import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(email, password);
    }
    
    return (
        <main className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    className="login__input"
                    value={email || ""}
                    onChange={(e) => {setEmail(e.target.value)}}
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="off" />
                <input
                    className="login__input"
                    value={password || ""}
                    onChange={(e) => {setPassword(e.target.value)}}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    autoComplete="off" />
                <button className="login__submit-button" type="submit" >Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
        </main>
    )
}

export default Register;