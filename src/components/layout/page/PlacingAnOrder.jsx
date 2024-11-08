import { useEffect, useState } from "react";
import activeCheckbox from '../../../assets/icon/activeCheckbox.svg'
import iconRadeoButton from '../../../assets/icon/iconRadeoButton.svg'
import banckCart from '../../../assets/icon/banckCart.svg'
import Branding from '../../../assets/icon/Branding.svg'
import Papa from 'papaparse';
import ItemModalBasket from "../modalNavigate/ItemModalBasket";
import CDEKMap from "./pageElements/CDEKMap";
import { ArrCity } from "../../../assets/processed_city";
import { useNavigate } from "react-router-dom";

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

const widthLap = '1020px';

export default function PlacingAnOrder() {
  // const [sity, setSity] = useState("")
  const [sity, setSity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [price, setPrice] = useState(localStorage.getItem('price'))
  const [formState, setFormState] = useState({
    name: '', // *
    sorname: '',// *
    number: '',// *
    email: '',// *
    addres: '',
    message: '',
    check_box_1: false,
    check_box_3: false,// *
    radio_box: false,// *
    price: price,// *
  });
  const [errors, setErrors] = useState({});

  const scrollToSection = (id, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const onChange = (key, value) => {
    setFormState((prevFormState) => ({ ...prevFormState, [key]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Имя обязательно';
    if (!formState.sorname) newErrors.sorname = 'Фамилия обязательна';
    if (!formState.number) newErrors.number = 'Телефон обязателен';
    if (!formState.email) newErrors.email = 'Email обязателен';
    if (formState.check_box_1) {
      if (!formState.addres) newErrors.addres = 'Адрес обязателен';
    }

    scrollToSection(newErrors.name && 'name' || newErrors.sorname && 'sorname' || newErrors.number && 'number' || newErrors.email && 'email' || newErrors.addres && 'addres', 120)
    return newErrors;
  };


  const placingAnOrder = (e) => {
    e.preventDefault();
    if (formState.check_box_3) {
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
        if (formState.check_box_3) {
          console.log('====================================');
          console.log(formState);
          console.log(sity);
          console.log('====================================');
        }
      }
    }
  };
  const filteredCities = ArrCity.filter(city =>
    city.name && typeof city.name === 'string' && city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (cityName) => {
    setSity(cityName);
    setSearchQuery(cityName);
    setShowDropdown(false);
  };

  return (
    <div className="PlacingAnOrder">
      <h1>Оформление</h1>
      <div className="PlacingAnOrder__box">
        <form onSubmit={placingAnOrder} className="PlacingAnOrder__form">
          <div className="PlacingAnOrder__form__1">
            <h1>Получатель</h1>
            <div className="PlacingAnOrder__form__div__1" style={{ gap: '12px' }}>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="name">Имя*</label>
                <input style={{ borderColor: errors.name && 'red' }} type="text" id="name" onChange={e => onChange('name', e.target.value)} />
                {errors.name && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.name}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="sorname">Фамилия*</label>
                <input style={{ borderColor: errors.sorname && 'red' }} type="text" id="sorname" onChange={e => onChange('sorname', e.target.value)} />
                {errors.sorname && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.sorname}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="number">Телефон*</label>
                <input style={{ borderColor: errors.number && 'red' }} type="text" id="number" onChange={e => onChange('number', e.target.value)} />
                {errors.number && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.number}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="email">Email*</label>
                <input style={{ borderColor: errors.email && 'red' }} type="text" id="email" onChange={e => onChange('email', e.target.value)} />
                {errors.email && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <h1>Доставка</h1>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="sity">Город*</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Поиск города"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    onFocus={() => setShowDropdown(true)}
                  />

                  {showDropdown && filteredCities.length > 0 && (
                    <ul style={{ border: '1px solid #ccc', padding: '0', margin: '0', top: '95%', zIndex: '99999', listStyle: 'none', position: 'absolute', backgroundColor: 'white', maxHeight: '220px', width: '100%', overflowY: "scroll" }}>
                      {filteredCities.map(city => (
                        <li
                          key={city.id}
                          onMouseDown={() => handleSelectCity(city.name)}
                          style={{ padding: '5px', cursor: 'pointer' }}
                        >
                          {city.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* <select name="sity" id="sity" onChange={e => setSity(e.target.value)}>
                  <option value={null}>Выберите город</option>
                  {ArrCity.map(el => (
                    <option key={el.id}>
                      {el.name}
                    </option>
                  ))} */}
                {/* <option value="Москва">Москва</option> */}
                {/* Другие города */}
                {/* </select> */}
              </div>
              {formState.check_box_1 &&
                <div style={{ position: 'relative', height: '90px' }}>
                  <label htmlFor="addres">Адрес*</label>
                  <input style={{ borderColor: errors.addres && 'red' }} type="text" id="addres" onChange={e => onChange('addres', e.target.value)} />
                  {errors.addres && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.addres}</p>}
                </div>}
            </div>
          </div>
          <div className="PlacingAnOrder__form__1">
            <div className="PlacingAnOrder__form__div__3">
              <div>
                <div className="PlacingAnOrder__CheckTrue" onClick={() => onChange('check_box_1', true)}>
                  {formState.check_box_1 ? <img src={activeCheckbox} alt="CheckTrue" /> : ''}
                </div>
                <label htmlFor="sity">Курьерская доставка СДЭК по всей России</label>
              </div>
              <div >
                <div className="PlacingAnOrder__CheckTrue" onClick={() => onChange('check_box_1', false)}>
                  {!formState.check_box_1 ? <img src={activeCheckbox} alt="CheckTrue" /> : ''}
                </div>
                <label htmlFor="sity">Доставка в ПВЗ СДЭК по всей России</label>
              </div>
            </div>
          </div>

          {!formState.check_box_1 && <div className="PlacingAnOrder__form__1">
            <div className="PlacingAnOrder__form__div__4">
              <CDEKMap sity={sity} />
            </div>
          </div>}

          <div className="PlacingAnOrder__form__1">
            <h1>Дополнительно</h1>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="message">Комментарий</label>
                <input type="text" id="message" onChange={e => onChange('message', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <h1>Способ оплаты</h1>
            <div className="PlacingAnOrder__form__div__5">
              <div onClick={() => onChange('radio_box', true)}>
                <div className="PlacingAnOrder__form__item__5">
                  <div>
                    <span>
                      {formState.radio_box ? <img src={iconRadeoButton} alt="iconRadeoButton" /> : <div></div>}
                    </span>
                    Картой онлйн
                  </div>
                  <div>
                    <img src={banckCart} alt="banckCart" />
                  </div>
                </div>
              </div>
              {/* <div onClick={() => onChange('radio_box', false)}>
                <div className="PlacingAnOrder__form__item__5">
                  <div>
                    <span>
                      {!formState.radio_box ? <img src={iconRadeoButton} alt="iconRadeoButton" /> : <div></div>}
                    </span>
                    Долями 4 платежа {useMediaQuery(`(max-width: ${widthLap})`) && <br />} по 3456 руб.
                  </div>
                  <div>
                    <img src={Branding} alt="banckCart" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <div className="PlacingAnOrder__form__div__3">
              <div>
                <div className="PlacingAnOrder__CheckTrue" onClick={() => onChange('check_box_3', !formState.check_box_3)}>
                  {formState.check_box_3 ? <img src={activeCheckbox} alt="CheckTrue" /> : ''}
                </div>
                <div className="PlacingAnOrder__Lable__6">
                  <label>Я ознакомлен и согласен с условиями оферты</label>
                  <p>и политики конфиденциальности</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="PlacingAnOrder__form__1">
            <h1>Ваш заказ</h1>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="promo">Промокод или сертификат</label>
                <div>
                  <input type="text" id="promo" onChange={e => onChange('promo', e.target.value)} />
                  <button>Применить</button>
                </div>
                <p style={{ color: '#408759' }}>Промокод активирован. Ваша скидка 450 руб.</p> 
              </div>
            </div>
          </div> */}

          <div className="PlacingAnOrder__form__price">
            <div className="PlacingAnOrder__form__raschot">
              <div>
                <p>Сумма:</p>
                <p>{price} руб</p>
              </div>
              {/* <div style={{ color: '#AA4D45' }}>
                <p>Скидка:</p>
                <p>00000 руб</p>
              </div> */}
            </div>
            <div className="PlacingAnOrder__form__raschot">
              <div className="PlacingAnOrder__form__raschot__price">
                <p>Итого:</p>
                <p>{price} руб</p>
              </div>

              <button className={`button__placing__an__order ${!formState.check_box_3 && "block__button"}`} type="submit" >Оформить заказ</button>
            </div>
          </div>
        </form>
        {
          useMediaQuery(`(min-width: ${widthLap})`) &&
          <div className="PlacingAnOrder__basket">
            <ItemModalBasket see={true} />
          </div>
        }
      </div >
    </div >
  );
}
