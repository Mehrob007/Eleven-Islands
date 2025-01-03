import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigate from "./navigate/Navigate";
import "./styles.css";

import LogoFooter from "../../assets/icon/LogoFooter.svg";
import Tetegram from "../../assets/icon/Tetegram.svg";
import p from "../../assets/icon/p.svg";
import vk from "../../assets/icon/vk.svg";
import galochkaPopapModal from "../../assets/icon/galochkaPopapModal.svg";
import xPopapModal from "../../assets/icon/xPopapModal.svg";
import axios from "axios";
import apiClient from "../../utils/api";
import { Helmet } from "react-helmet";
import { usePhotoStore } from "./storeState/store";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const widthLap = "1020px";

export default function Layout() {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true)
  const [errorToken, setErrorToken] = useState([]);
  const location = useLocation();
  const [email_user, setEmail_user] = useState("");
  const [email_error, setEmail_error] = useState("");
  const { fetchPhotos } = usePhotoStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [topPromo, setTopPromo] = useState("");
  const [itemsCount, setItemsCount] = useState(() => {
    const savedItems = JSON.parse(localStorage.getItem("dataGelary")) || [];
    return savedItems.length;
  });

  useEffect(() => {
    fetchPhotos({ limit: 100, page: 1 });
  }, []);

  const headerStyle = {
    background:
      location.pathname == "/"
        ? scrollY >= 100
          ? "#408759"
          : "transparent"
        : "#408759",
  };
  const guestFun = async () => {
    if (!localStorage.getItem("token") || errorToken) {
      try {

        const res = await axios.post(
          "https://backendeleven.ru/Token/get-token",
          {
            email: "guest",
            password: "guest",
          },
        );
        localStorage.setItem("token", res.data);
        localStorage.setItem("customerId", res.data.customer_id);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setErrorToken(error);
      }
    }
  };
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const validata = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // /Api/get-promo-all-for-top
  const getPromocodeTop = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await apiClient.get(`/Api/get-promo-all-for-top`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTopPromo(response.data?.[response?.data?.length - 1]?.promoName);
      console.log("response.data.promoName", response.data?.[response?.data?.length - 1]?.promoName);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!validata(email_user)) {
      setEmail_error("Введите корректный email!");
    } else {
      setEmail_error("");
      try {
        const res = await apiClient.post(
          `news_letter_subscriptions/${email_user}/deactivate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setEmail_user("");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const ogData = {
    title: "ELEVEN ISLANDS",
    description:
      "Eleven Islands — онлайн-магазин модной одежды, предлагающий уникальные коллекции для мужчин и женщин. Откройте для себя стильные и качественные наряды, вдохновленные красотой природы и современными трендами. Совершайте покупки онлайн и подчеркивайте свою индивидуальность с Eleven Islands.",
    url: "https://eleven-islands.netlify.app",
    image:
      "https://cotton-road.com/images/detskie-futbolki/37-temno-zelenaya.jpg",
    siteName: "ELEVEN ISLANDS",
    keywords:
      "модная одежда, стильная одежда, онлайн-магазин одежды, женская мода, мужская мода, эксклюзивная одежда, дизайнерская одежда, Eleven Islands, тренды моды, покупки онлайн, аксессуары, стиль",
  };

  useEffect(() => {
   
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if(!loading){
      setTimeout(() => {getPromocodeTop()}, 1000)
    }
  }, [loading])
  
  useEffect(() => {
    guestFun();
  }, [errorToken]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setModalOpen(false);
      }, 5000);
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const products = JSON.parse(localStorage.getItem("dataGelary")) || [];
      if (products.length > itemsCount) {
        setItemsCount(products.length);
        setModalOpen(true); 
      }
    }, 500);

    return () => clearInterval(interval);
  }, [itemsCount]);
  
  return (
    <div className="all-projact">
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
        {useMediaQuery(`(min-width: ${widthLap})`) ? (
          <>
            <h2 className="advertising-h1-1">{topPromo}</h2>
            <h2>{topPromo}</h2>
            <h2 className="advertising-h1-1">{topPromo}</h2>
          </>
        ) : (
          <h2>{topPromo}</h2>
        )}
      </div>
      <header style={headerStyle}>
        <Navigate />
      </header>
      {/* {useMediaQuery(`(min-width: ${widthLap})`)} */}

      <main
        className="bigBox"
        style={{ paddingTop: location.pathname != "/" && "70px" }}
      >
        {!loading && <Outlet />}
        
        <footer>
          <div className="footerContent">
            <div className="footerContentCom1">
              <img src={LogoFooter} alt="LogoFooter" />
              {useMediaQuery(`(max-width: ${widthLap})`) && (
                <div className="boxColomnFooter">
                  <div className="footerContentCom2">
                    <h2>Навигация</h2>
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
                    <h2>Покупателям</h2>
                    <div>
                      <p>Контакты</p>
                      <p>Доставка и оплата</p>
                      <p>Возврат товара</p>
                      <p>
                        Часто задаваемые <br /> вопросы (FAQ)
                      </p>
                      <p>Условия использования</p>
                      <p>
                        Политика <br /> конфиденциальности
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <form className="footerForm" onSubmit={sendEmail}>
                <label htmlFor="sendFooterEmail">
                  Узнавай о скидках первый
                </label>
                <p>
                  Дарим промокод - скидка 500 рублей на первую покупку от 5000
                  рублей.
                </p>
                <input
                  type="email"
                  id="sendFooterEmail"
                  onChange={(e) => setEmail_user(e.target.value.trim())}
                  name="email"
                  placeholder="Введите e-mail"
                />
                {email_error.length > 0 && (
                  <p
                    className="error-p-send-email"
                    style={{
                      position: "absolute",
                      color: "red",
                      margin: "0",
                      bottom: "-17px",
                    }}
                  >
                    {email_error}
                  </p>
                )}
                <button type="submit">Подписаться</button>
              </form>
              {useMediaQuery(`(min-width: ${widthLap})`) && (
                <p className="Eleven2024">
                  © 2024 Eleven Islands <br />
                  Все права защищены.
                </p>
              )}
              {useMediaQuery(`(max-width: ${widthLap})`) && (
                <div className="contactCom-phone">
                  <a href="#">
                    <img src={vk} alt="whatsapp" />
                  </a>
                  <a href="#">
                    <img src={Tetegram} alt="Tetegram" />
                  </a>
                  <a href="#">
                    <img src={p} alt="youtube" />
                  </a>
                </div>
              )}
              {useMediaQuery(`(max-width: ${widthLap})`) && (
                <div className="Eleven2024-creatorCom-phone">
                  <p className="Eleven2024">
                    © 2024 Eleven Islands <br />
                    Все права защищены.
                  </p>
                </div>
              )}
            </div>

            {useMediaQuery(`(min-width: ${widthLap})`) && (
              <>
                <div className="footerContentCom2">
                  <h2>Навигация</h2>
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
                  <h2>Покупателям</h2>
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
            )}

            <div className="footerContentCom4">
              {useMediaQuery(`(min-width: ${widthLap})`) && (
                <div className="contactCom">
                  <a href="#">
                    <img src={vk} alt="whatsapp" />
                  </a>
                  <a href="#">
                    <img src={Tetegram} alt="Tetegram" />
                  </a>
                  <a href="#">
                    <img src={p} alt="youtube" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </footer>
      </main>
      <div
        className="popapModalProduct"
        style={{ translate: `${isModalOpen ? "1% 0" : "150% 0"}` }}
      >
        <div>
          <img src={galochkaPopapModal} alt="galochkaPopapModal" />
          <p>Товар добавлен в корзину</p>
        </div>
        <img onClick={closeModal} src={xPopapModal} alt="xPopapModal" />
      </div>
    </div>
  );
}
