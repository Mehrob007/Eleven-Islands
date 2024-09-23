import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};
export default function Registration() {
    const widthLap = '1020px'
    const loginFunction = (e) => {
        e.preventDefault()
    }
    return (
        <div className={`login-box`} style={{
            minHeight: useMediaQuery(`(max-width: ${widthLap})`) && '700px'
        }}>
            <div className="box-login" style={{ height: '610px' }}>
                <h1>Регистрация</h1>
                <form onSubmit={loginFunction} className="input-login" style={{ height: '543px' }}>
                    <div className="login-inputs">
                        <label htmlFor="input-name">Имя</label>
                        <input type="text" id="input-name" />
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-surname">Фамилия</label>
                        <input type='text' id="input-surname" />
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-email">Email</label>
                        <input type="text" id="input-email" />
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-tell">Телефон</label>
                        <input type="text" id="input-tell" />
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-password">Пароль</label>
                        <input type="password" id="input-password" />
                    </div>
                    <button type="submit" className="button-login">
                        Создать
                    </button>
                    <div className="dop-options-login" style={{ justifyContent: 'center', gap: '10px' }}>
                        <p style={{ border: 'none' }}>Есть аккаунт?</p>
                        <p><Link to="/login">Войти</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
