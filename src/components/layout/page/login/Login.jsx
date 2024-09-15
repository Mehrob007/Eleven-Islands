import { Link } from "react-router-dom"


export default function Login() {
    const loginFunction = (e) => {
        e.preventDefault()
    }
    return (
        <div className="login-box">
            <div className="box-login">
                <h1>Вход</h1>
                <form onSubmit={loginFunction} className="input-login">
                    <div className="login-inputs">
                        <label htmlFor="input-email-and-tell">Email или телефон</label>
                        <input type="text" id="input-email-and-tell" />
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-password">Пароль</label>
                        <input type="password" id="input-password" />
                    </div>
                    <div className="dop-options-login">
                        <p><Link to='/create-password'>Забыли пароль?</Link></p>
                        <p><Link to='/registration' >Регистрация</Link></p>
                    </div>
                    <button type="submit" className="button-login">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}
