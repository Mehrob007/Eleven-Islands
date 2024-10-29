import { useEffect, useState } from "react";
import activeCheckbox from '../../../assets/icon/activeCheckbox.svg'
import iconRadeoButton from '../../../assets/icon/iconRadeoButton.svg'
import banckCart from '../../../assets/icon/banckCart.svg'
import Branding from '../../../assets/icon/Branding.svg'
import ItemModalBasket from "../modalNavigate/ItemModalBasket";
import CDEKMap from "./pageElements/CDEKMap";

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
  const [price, setPrice] = useState(localStorage.getItem('price'))
  const [formState, setFormState] = useState({
    name: '',
    sorname: '',
    number: '',
    email: '',
    adres: '',
    message: '',
    check_box_1: false,
    check_box_3: false,
    radio_box: false,
  });
  const [errors, setErrors] = useState({});

  const onChange = (key, value) => {
    setFormState((prevFormState) => ({ ...prevFormState, [key]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Имя обязательно';
    if (!formState.sorname) newErrors.sorname = 'Фамилия обязательна';
    if (!formState.number) newErrors.number = 'Телефон обязателен';
    if (!formState.email) newErrors.email = 'Email обязателен';
    if (!formState.adres) newErrors.adres = 'Адрес обязателен';
    return newErrors;
  };

  const placingAnOrder = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(formState);
      setErrors({});
    }
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
                <input type="text" id="name" onChange={e => onChange('name', e.target.value)} />
                {errors.name && <p style={{ color: 'red', position: 'absolute', bottom: '0px' }}>{errors.name}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="sorname">Фамилия*</label>
                <input type="text" id="sorname" onChange={e => onChange('sorname', e.target.value)} />
                {errors.sorname && <p style={{ color: 'red', position: 'absolute', bottom: '0px' }}>{errors.sorname}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="number">Телефон*</label>
                <input type="text" id="number" onChange={e => onChange('number', e.target.value)} />
                {errors.number && <p style={{ color: 'red', position: 'absolute', bottom: '0px' }}>{errors.number}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="email">Email*</label>
                <input type="text" id="email" onChange={e => onChange('email', e.target.value)} />
                {errors.email && <p style={{ color: 'red', position: 'absolute', bottom: '0px' }}>{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <h1>Доставка</h1>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="sity">Город*</label>
                <select name="sity" id="sity" onChange={e => onChange('sity', e.target.value)}>
                  <option value={null}>Выберите город</option>
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                  {/* Другие города */}
                </select>
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="adres">Адрес*</label>
                <input type="text" id="adres" onChange={e => onChange('adres', e.target.value)} />
                {errors.adres && <p style={{ color: 'red', position: 'absolute', bottom: '0px' }}>{errors.adres}</p>}
              </div>
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
              <CDEKMap />
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
              <div style={{ color: '#AA4D45' }}>
                <p>Скидка:</p>
                <p>00000 руб</p>
              </div>
            </div>
            <div className="PlacingAnOrder__form__raschot">
              <div className="PlacingAnOrder__form__raschot__price">
                <p>Итого:</p>
                <p>{price} руб</p>
              </div>
              <button className="button__placing__an__order" type="submit">Оформить заказ</button>
            </div>
          </div>
        </form>
        {useMediaQuery(`(min-width: ${widthLap})`) &&
          <div className="PlacingAnOrder__basket">
            <ItemModalBasket see={true} />
          </div>}
      </div>
    </div>
  );
}
