import React from "react";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(email, password)
    }
    
    return (
        <main className="login">
            <h2 className="login__title">Вход</h2>
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
                <button className="login__submit-button" type="submit" >Войти</button>
            </form>
        </main>
    )
}

export default Login;