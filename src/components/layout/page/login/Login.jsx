import { useState } from "react";
import { Await, Link } from "react-router-dom";
import apiClient from "../../../../utils/api";
import axios from "axios";

export default function Login() {

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [errorState, setErrorState] = useState({
    emailError: '',
    passwordError: ''
  });

  const loginFunction = async (e) => {
    e.preventDefault();
    let errors = {};
    const token = localStorage.getItem('token');


    if (!formState.email) {
      errors.emailError = "Поле не должно быть пустым!";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email) && !/^\d{9,15}$/.test(formState.email)) {
      errors.emailError = "Введите корректный email или телефон!";
    } else {
      errors.emailError = '';
    }


    if (!formState.password) {
      errors.passwordError = "Поле не должно быть пустым!";
    } else if (formState.password.length < 4) {
      errors.passwordError = "Пароль должен содержать не менее 4 символов!";
    } else {
      errors.passwordError = '';
    }

    setErrorState(errors);


    if (!errors.emailError && !errors.passwordError) {
      console.log("Данные для входа: ", formState);
      try {
        const res = await axios.post('https://elevenislands.ru/token',
          {
            "guest": false,
            "username": formState.email,
            "password": formState.password,
            "remember_me": true
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        console.log(res.data.access_token);
        localStorage.setItem('token', res.data.access_token);
      } catch (e) {
        console.error(e);
        setErrorState({
          emailError: 'Неправильный логин или пароль.',
        })
      }

    }
  };

  const onChange = (key, value) => {
    setFormState((prevFormState) => ({ ...prevFormState, [key]: value }));
  };

  return (
    <div className="login-box">
      <div className="box-login">
        <h1>Вход</h1>
        <form onSubmit={loginFunction} className="input-login">
          <div className="login-inputs">
            <label htmlFor="input-email-and-tell">Email или телефон</label>
            <input
              onChange={e => onChange('email', e.target.value)}
              type="text"
              id="input-email-and-tell"
            />
            {errorState.emailError && <p style={{ bottom: '-17px', position: 'absolute', color: 'red' }}>{errorState.emailError}</p>}
          </div>
          <div className="login-inputs">
            <label htmlFor="input-password">Пароль</label>
            <input
              onChange={e => onChange('password', e.target.value)}
              type="password"
              id="input-password"
            />
            {errorState.passwordError && <p style={{ bottom: '-17px', position: 'absolute', color: 'red' }}>{errorState.passwordError}</p>}
          </div>
          <div className="dop-options-login">
            <p><Link to='/create-password'>Забыли пароль?</Link></p>
            <p><Link to='/registration'>Регистрация</Link></p>
          </div>
          <button type="submit" className="button-login">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
