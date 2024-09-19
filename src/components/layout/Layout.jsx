import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigate from './navigate/Navigate'
import './styles.css'

import LogoFooter from '../../assets/icon/LogoFooter.svg'
import Tetegram from '../../assets/icon/Tetegram.svg'
import p from '../../assets/icon/p.svg'
import vk from '../../assets/icon/vk.svg'
import creatorFactory from '../../assets/icon/creatorFactory.svg'
import axios from 'axios'

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

const widthLap = '1020px'

export default function Layout() {
  const [scrollY, setScrollY] = useState(0)
  const [errorToken, setErrorToken] = useState([])
  const location = useLocation();

  // console.log(location);


  const headerStyle = {
    background: location.pathname == '/' ? scrollY >= 100 ? '#408759' : 'transparent' : '#408759'
  };

  // console.log(scrollY);


  const guestFun = async () => {
    if (!localStorage.getItem('token' || errorToken)) {
      try {
        const res = await axios.post('https://elevenislands.ru/token', {
          guest: true,
        })
        localStorage.setItem('token', res.data.access_token) 
        localStorage.setItem('customerId', res.data.customer_id) 
        console.log(res.data);

      }
      catch (error) {
        console.error(error);
        setErrorToken(error)
      }
    }
  }


  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    guestFun()
  }, [errorToken])

  return (
    <>
      <header style={headerStyle}>
        <Navigate />
      </header>
      {useMediaQuery(`(min-width: ${widthLap})`)}

      <main className='bigBox' style={{ paddingTop: location.pathname != '/' && '70px' }}>
        <Outlet />
      </main>
      <footer>
        <div className="footerContent">
          <div className="footerContentCom1">
            <img src={LogoFooter} alt="LogoFooter" />
            {useMediaQuery(`(max-width: ${widthLap})`) &&
              <div className='boxColomnFooter'>
                <div className="footerContentCom2">
                  <h1>Навигация</h1>
                  <div>
                    <p>Главная</p>
                    <p>О нас</p>
                    <p>Каталог</p>
                    <p>Подарочные карты</p>
                    <p>LookBook</p>
                    <p>Блог</p>
                  </div>
                </div>
                <div className="footerContentCom3">
                  <h1>Покупателям</h1>
                  <div>
                    <p>Контакты</p>
                    <p>Доставка и оплата</p>
                    <p>Возврат товара</p>
                    <p>Часто задаваемые <br /> вопросы (FAQ)</p>
                    <p>Условия использования</p>
                    <p>Политика <br /> конфиденциальности</p>
                  </div>
                </div>
              </div>
            }
            <form className='footerForm'>
              <label htmlFor="sendFooterEmail">Узнавай о скидках первый</label>
              <p>Дарим промокод - скидка 500 рублей
                на первую покупку от 5000 рублей.</p>
              <input type="email" id='sendFooterEmail' name='email' placeholder='Введите e-mail' ></input>
              <button type="submit">Подписаться</button>
            </form>
            {/* <p className='Eleven2024'>
              © 2024 Eleven Islands <br />
              Все права защищены.
            </p> */}
            {useMediaQuery(`(min-width: ${widthLap})`) &&
              <p className='Eleven2024'>
                © 2024 Eleven Islands <br />
                Все права защищены.
              </p>
            }
             {useMediaQuery(`(max-width: ${widthLap})`) &&
              <div className='contactCom-phone'>
                <a href="#"><img src={vk} alt="whatsapp" /></a>
                <a href="#"><img src={Tetegram} alt="Tetegram" /></a>
                <a href="#"><img src={p} alt="youtube" /></a>
              </div>
            }
            {useMediaQuery(`(max-width: ${widthLap})`) &&
              <div className='Eleven2024-creatorCom-phone'>
                <p className='Eleven2024'>
                  © 2024 Eleven Islands <br />
                  Все права защищены.
                </p>
                <div className='creatorCom'>
                  <h1>Made in</h1>
                  <img src={creatorFactory} alt="creatorFactory" />
                </div>
              </div>
            }
          </div>
         
          {useMediaQuery(`(min-width: ${widthLap})`) &&
            <>
              <div className="footerContentCom2">
                <h1>Навигация</h1>
                <div>
                  <p>Главная</p>
                  <p>О нас</p>
                  <p>Каталог</p>
                  <p>Подарочные карты</p>
                  <p>LookBook</p>
                  <p>Блог</p>
                </div>
              </div>
              <div className="footerContentCom3">
                <h1>Покупателям</h1>
                <div>
                  <p>Контакты</p>
                  <p>Доставка и оплата</p>
                  <p>Возврат товара</p>
                  <p>Часто задаваемые вопросы (FAQ)</p>
                  <p>Условия использования</p>
                  <p>Политика конфиденциальности</p>
                </div>
              </div>
            </>
          }

          <div className="footerContentCom4">
            {useMediaQuery(`(min-width: ${widthLap})`) &&
              <div className='contactCom'>
                <a href="#"><img src={vk} alt="whatsapp" /></a>
                <a href="#"><img src={Tetegram} alt="Tetegram" /></a>
                <a href="#"><img src={p} alt="youtube" /></a>
              </div>
            }
            {useMediaQuery(`(min-width: ${widthLap})`) &&
              <div className='creatorCom'>
                <h1>Made in</h1>
                <img src={creatorFactory} alt="creatorFactory" />
              </div>
            }
          </div>
        </div>
      </footer>


    </>
  )
}
