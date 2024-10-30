import { useState } from "react";

export default function RecoveryPassword() {
  const [fetchData, setFetchData] = useState({
    naw_password_1: '',
    naw_password_2: ''
  });

  const [errorValidata, setErrorValidata] = useState({
    error_naw_password_1: '',
    error_naw_password_2: '',
  });

  const heandlerData = (e) => {
    const { name, value } = e.target;
    setFetchData({ ...fetchData, [name]: value });
  };

  const loginFunction = (e) => {
    e.preventDefault();
    let errors = {};

    if (!fetchData.naw_password_1) {
      errors.error_naw_password_1 = 'Поле не должно быть пустым!';
    } else if (fetchData.naw_password_1.length < 4) {
      errors.error_naw_password_1 = 'Пароль должен содержать не менее 4 символов!';
    } else {
      errors.error_naw_password_1 = '';
    }

    if (!fetchData.naw_password_2) {
      errors.error_naw_password_2 = 'Поле не должно быть пустым!';
    } else if (fetchData.naw_password_2.length < 4) {
      errors.error_naw_password_2 = 'Пароль должен содержать не менее 4 символов!';
    } else if (fetchData.naw_password_1 !== fetchData.naw_password_2) {
      errors.error_naw_password_2 = 'Пароли должны совпадать!';
    } else {
      errors.error_naw_password_2 = '';
    }

    setErrorValidata(errors);

    if (!errors.error_naw_password_1 && !errors.error_naw_password_2) {
      console.log('====================================');
      console.log(`запрос! ${fetchData}`);
      console.log('====================================');
    }
  };

  return (
    <div className="login-box">
      <div className="box-login" style={{ height: '304px' }}>
        <div className="div-login-box" style={{ height: '57px' }}>
          <h1 className="h1-login-box">Восстановление</h1>
        </div>
        <form onSubmit={loginFunction} style={{ height: '230px' }} className="input-login">
          <div className="login-inputs">
            <label htmlFor="naw_password_1">Новый пароль</label>
            <input
              onChange={heandlerData}
              type="password"
              name="naw_password_1"
              id="naw_password_1"
            />
            {errorValidata.error_naw_password_1 ? (
              <p style={{ color: 'red' }}>{errorValidata.error_naw_password_1}</p>
            ) : (
              <p style={{ color: 'transparent' }}>text error</p>
            )}
          </div>
          <div className="login-inputs">
            <label htmlFor="naw_password_2">Повторите пароль</label>
            <input
              onChange={heandlerData}
              type="password"
              name="naw_password_2"
              id="naw_password_2"
            />
            {errorValidata.error_naw_password_2 ? (
              <p style={{ color: 'red' }}>{errorValidata.error_naw_password_2}</p>
            ) : (
              <p style={{ color: 'transparent' }}>text error</p>
            )}
          </div>
          <button type="submit" className="button-login">
            Восстановить
          </button>
        </form>
      </div>
    </div>
  );
}
