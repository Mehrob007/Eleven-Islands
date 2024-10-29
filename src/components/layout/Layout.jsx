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
import apiClient from '../../utils/api'
import { Helmet } from 'react-helmet'

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
  const [email_user, setEmail_user] = useState('')
  const [email_error, setEmail_error] = useState('')

  const headerStyle = {
    background: location.pathname == '/' ? scrollY >= 100 ? '#408759' : 'transparent' : '#408759'
  };
  const guestFun = async () => {
    if (!localStorage.getItem('token') || errorToken) {
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
  const validata = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    if (!validata(email_user)) {
      setEmail_error('Введите корректный email!')
    } else {
      setEmail_error('')
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

  const ogData = {
    title: 'ELEVEN ISLANDS',
    description: 'Eleven Islands — онлайн-магазин модной одежды, предлагающий уникальные коллекции для мужчин и женщин. Откройте для себя стильные и качественные наряды, вдохновленные красотой природы и современными трендами. Совершайте покупки онлайн и подчеркивайте свою индивидуальность с Eleven Islands.',
    url: 'https://eleven-islands.netlify.app',
    image: 'https://cotton-road.com/images/detskie-futbolki/37-temno-zelenaya.jpg',
    siteName: 'ELEVEN ISLANDS',
    keywords: 'модная одежда, стильная одежда, онлайн-магазин одежды, женская мода, мужская мода, эксклюзивная одежда, дизайнерская одежда, Eleven Islands, тренды моды, покупки онлайн, аксессуары, стиль'
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
    <div className='all-projact'>
      <Helmet>
        <meta property="og:title" content={ogData.title} />
        <meta property="og:description" content={ogData.description} />
        <meta property="og:url" content={ogData.url} />
        <meta property="og:image" content={ogData.image} />
        <meta property="og:site_name" content={ogData.siteName} />
        <meta name="description" content={ogData.description} />
        <meta name="keywords" content={ogData.keywords} />
        <title>{ogData.title}</title>
      </Helmet>
      <div className="advertising">
        <h1 className='advertising-h1-1'>Скидка 25% по промокоду SHOP24</h1>
        <h1>Скидка 25% по промокоду SHOP24</h1>
        <h1 className='advertising-h1-1'>Скидка 25% по промокоду SHOP24</h1>
      </div>
      <header style={headerStyle}>
        <Navigate />
      </header>
      {/* {useMediaQuery(`(min-width: ${widthLap})`)} */}

      <main className='bigBox' style={{ paddingTop: location.pathname != '/' && '70px' }}>

        <Outlet />
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
              <form className='footerForm' onSubmit={sendEmail}>
                <label htmlFor="sendFooterEmail">Узнавай о скидках первый</label>
                <p>Дарим промокод - скидка 500 рублей
                  на первую покупку от 5000 рублей.</p>
                <input
                  type="email"
                  id="sendFooterEmail"
                  onChange={(e) => setEmail_user(e.target.value.trim())}
                  name="email"
                  placeholder="Введите e-mail"
                />
                {email_error.length > 0 && <p className="error-p-send-email" style={{ position: 'absolute', color: "red", margin: '0', bottom: '-17px' }}>{email_error}</p>}
                <button type="submit">Подписаться</button>
              </form>
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
      </main>


    </div>
  )
}
