export default function CreatePassword() {
    const loginFunction = (e) => {
        e.preventDefault()

    }
    return (
        <div className="login-box">
            <div className="box-login" style={{ height: '234px' }}>
                <div className="div-login-box" style={{ height: '57px' }}>
                    <h1 className="h1-login-box">Восстановление</h1>
                    <p className="p-login-box">Мы отправим вам электронное письмо для сброса пароля</p>
                </div>
                <form onSubmit={loginFunction} style={{ height: '137px' }} className="input-login">
                    <div className="login-inputs">
                        <label htmlFor="input-email">Email</label>
                        <input type="text" id="input-email" />
                    </div>
                    <button type="submit" className="button-login">
                        Восстановить
                    </button>
                </form>
            </div>
        </div>
    )
}
