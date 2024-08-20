import React from 'react'

export default function SendEmail() {
    return (
        <div className="sendEmail">
            <div className='sendEmailTop'>
                <h1>Скоро новый дроп</h1>
                <p>Хочешь узнавать о всех новинках первый?</p>
                <p>Подпишись на рассылку!</p>
            </div>
            <form className='sendEmailForm'>
                <input type="email" name='email' id='elmail' placeholder='Введите свой email' />
                <button type='submit'>Подписаться</button>
            </form>
        </div>
    )
}
