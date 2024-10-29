import { useState } from "react";
import apiClient from "../../../../utils/api";
// NewsLetterSubscription
// api​/news_letter_subscriptions​/{email}​/deactivate

export default function SendEmail() {
    const [email_user, setEmail_user] = useState('')
    const [email_error, setEmail_error] = useState('')

    const validata = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log(email_user);
        if (!validata(email_user)) {
            setEmail_error('Введите корректный email!')
        } else {
            setEmail_error('')
            const token = localStorage.getItem('token');
            try {
                const res = await apiClient.post(`news_letter_subscriptions/${email_user}/deactivate`, {
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                console.log(res);
                setEmail_user('')
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    return (
        <div className="sendEmail">
            <div className='sendEmailTop'>
                <h1>Скоро новый дроп</h1>
                <p>Хочешь узнавать о всех новинках первый?</p>
                <p>Подпишись на рассылку!</p>
            </div>
            <form onSubmit={sendEmail} className='sendEmailForm'>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail_user(e.target.value.trim())}
                    name="email"
                    placeholder="Введите e-mail"
                />
                {email_error.length > 0 && <p className="error-p-send-email" style={{ position: 'absolute', color: "red", }}>{email_error}</p>}
                <button type='submit'>Подписаться</button>
            </form>
        </div>
    )
}
