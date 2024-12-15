import { useState } from "react";

export default function CreatePassword() {
  const [email_user, setEmail_user] = useState('');
  const [emailError, setEmailError] = useState('');

  const loginFunction = (e) => {
    e.preventDefault();
    
    if (!email_user) {
      setEmailError("Поле не должно быть пустым!");
    } else if (!/^\S+@\S+\.\S+$/.test(email_user)) {
      setEmailError("Введите корректный email!");
    } else {
      setEmailError('');
      // console.log("Восстановление пароля для:", email_user);
    }
  };

  return (
    <div className="login-box">
      <div className="box-login" style={{ height: '234px' }}>
        <div className="div-login-box" style={{ height: '57px' }}>
          <h2 className="h1-login-box">Восстановление</h2>
          <p className="p-login-box">Мы отправим вам электронное письмо для сброса пароля</p>
        </div>
        <form onSubmit={loginFunction} style={{ height: '137px' }} className="input-login">
          <div className="login-inputs">
            <label htmlFor="input-email">Email</label>
            <input 
              onChange={(e) => setEmail_user(e.target.value)} 
              type="text" 
              id="input-email" 
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <button type="submit" className="button-login">
            Восстановить
          </button>
        </form>
      </div>
    </div>
  );
}
