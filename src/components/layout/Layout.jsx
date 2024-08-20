import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigate from './navigate/Navigate'
import './styles.css'

import LogoFooter from '../../assets/icon/LogoFooter.svg'
import instagram from '../../assets/icon/instagram.svg'
import Tetegram from '../../assets/icon/Tetegram.svg'
import whatsapp from '../../assets/icon/whatsapp.svg'
import youtube from '../../assets/icon/youtube.svg'
import creatorFactory from '../../assets/icon/creatorFactory.svg'

export default function Layout() {
  const location = useLocation();
  
  const headerStyle = {
    background: location.products === '/some-route' ? '#ff6347' : '#408759'
  };

  return (
    <>
      <header style={headerStyle}>
        <Navigate />
      </header>

      <main className='bigBox'>
        <Outlet />
      </main>

      <footer>
        <div className="footerContent">
          <div className="footerContentCom1">
            <img src={LogoFooter} alt="LogoFooter" />
            <form className='footerForm'>
              <label htmlFor="sendFooterEmail">Узнавай о скидках первый</label>
              <input type="email" id='sendFooterEmail' name='email' placeholder='Введите e-mail' ></input>
              <button type="submit">Подписаться</button>
            </form>
            <p className='Eleven2024'>
              © 2024 Eleven Islands <br />
              Все права защищены.
            </p>
          </div>
          <div className="footerContentCom2">
            <h1>Навигация</h1>
            <div>
              <p>Главная</p>
              <p>Каталог</p>
              <p>Йога</p>
              <p>Теннис</p>
              <p>Лайф стайл</p>
              <p>О компании</p>
              <p>Контакты</p>
            </div>
          </div>
          <div className="footerContentCom3">
            <h1>Покупателям</h1>
            <div>
              <p>Доставка и оплата</p>
              <p>Возврат товара</p>
              <p>Часто задаваемые вопросы (FAQ)</p>
              <p>Условия использования</p>
              <p>Политика конфиденциальности</p>
            </div>
          </div>
          <div className="footerContentCom4">
            <div className='contactCom'>
                <a href="#"><img src={instagram} alt="instagram" /></a>
                <a href="#"><img src={Tetegram} alt="Tetegram" /></a>
                <a href="#"><img src={whatsapp} alt="whatsapp" /></a>
                <a href="#"><img src={youtube} alt="youtube" /></a>
            </div>
            <div className='creatorCom'>
              <h1>Made in</h1>
              <img src={creatorFactory} alt="creatorFactory" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
