import {useCallback, useEffect, useRef, useState} from "react";
import activeCheckbox from '../../../assets/icon/activeCheckbox.svg'
import iconRadeoButton from '../../../assets/icon/iconRadeoButton.svg'
import banckCart from '../../../assets/icon/banckCart.svg'
import ItemModalBasket from "../modalNavigate/ItemModalBasket";
import { CDEKMap } from "./pageElements/CDEKMap";
import { ArrCity } from "../../../assets/processed_city";
import InputMask from 'react-input-mask';
import { RadioGroup} from "./pageElements/RadioGroup/index.jsx";
import {YandexDeliveryMap} from "./pageElements/YandexDeliveryMap/index.jsx";
import yandexDeliveryIcon from '../../../assets/icon/yandexDeliveryLogo.svg'
import cdekDeliveryIcon from '../../../assets/icon/cdekLogo.svg'
import {AddressForm} from "./pageElements/AddressForm/index.jsx";
import apiClient from "../../../utils/api.js";
import { calculateBasketPrice } from "./utils.js";

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

const DELIVERY_TYPES = Object.freeze({
  DOOR_TO_DOOR: 'DOOR_TO_DOOR',
  PICKUP_POINT: 'PICKUP_POINT'
});

const DELIVERY_SERVICES = Object.freeze({
  YANDEX_DELIVERY: 'YANDEX_DELIVERY',
  CDEK: 'CDEK',
});

const widthLap = '1020px';

export default function PlacingAnOrder() {
  const [promo, setPromo] = useState({ type: null, procent: null, promocode: "", itogProcent: 0 })
  const [searchQuery, setSearchQuery] = useState('Москва');
  const [showDropdown, setShowDropdown] = useState(false);
  const calculatedBasketPrice = calculateBasketPrice()
  const [amountPrice, setAmountPrice] = useState(calculatedBasketPrice)
  const [paymentError,setPaymentError] = useState(false)
  const [loading,setLoading] = useState(false)
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const paymentMethodRef = useRef()
  const [formState, setFormState] = useState({
    name: '', // *
    surname: '',// *
    phoneNumber: '',// *
    email: '',// *
    city: 'Москва',
    street: '',
    apartment: '',
    floor: '',
    intercom: '',
    entrance: '',
    message: '',
    deliveryType: DELIVERY_TYPES.DOOR_TO_DOOR, // По дефолту выбрана доставка до двери
    deliveryService: DELIVERY_SERVICES.CDEK, // По дефолту выбрана доставка CDEK
    isAgreedWithPolicies: false, // Согласен ли с условиями оферты
    platformStationId: '', // ID платформы для доставки до ПВЗ
    address: '', // Полный адрес для доставки до двери
    radio_box: true,// *
    price: amountPrice,// *
  });
  const isDoorToDoorDelivery = formState.deliveryType === DELIVERY_TYPES.DOOR_TO_DOOR;
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
    const emailValidateRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Имя обязательно';
    if (!formState.surname) newErrors.surname = 'Фамилия обязательна';
    if (!formState.phoneNumber || formState.phoneNumber.replace(/[^\d]/g, '')?.length !== 11) newErrors.phoneNumber = 'Телефон обязателен';
    if (!formState.email || !emailValidateRegex.test(formState.email)) newErrors.email = 'Email обязателен';
    if (isDoorToDoorDelivery) {
      if (!formState.address) newErrors.address = 'Адрес обязателен';
    }

    scrollToSection(newErrors.name && 'name' || newErrors.surname && 'surname' || newErrors.phoneNumber && 'phoneNumber' || newErrors.email && 'email' || newErrors.address && 'address', 120)
    return newErrors;
  };

  const placingAnOrder = async(e) => {
    e.preventDefault();
    setPaymentError(false)
    if (formState.isAgreedWithPolicies) {
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
        if (formState.isAgreedWithPolicies) {
          let items = []
          const cartData = localStorage.getItem("dataGelary")
          if(cartData){
            const parse = JSON.parse(cartData)
           items =  parse.map(v=>({
            amount: v?.count,
            id: v?.idProduct,
           }));
          }


          const body= {
            name: formState.name,
            surname: formState.surname,
            email: formState.email,
            phone: formState.phoneNumber,
            description:formState.message || "",
            items,
            delivery_type: formState.deliveryType,
            delivery_service: formState.deliveryService,
            ...(formState.deliveryType === DELIVERY_TYPES.DOOR_TO_DOOR ? {
              address: formState.address,
            } : {
              platform_station_id: formState.platformStationId
            })
          }

          setLoading(true)
        try {
          const {data} = await apiClient.post("/api/Pay/create-payment",body)
          window.open(data?.PaymentURL,"_self")
        } catch (error) {
          console.log("error",error)
          setPaymentError(true)
        }finally{
          setLoading(false)
        }
        }
      }
    }
  };
  const filteredCities = ArrCity.filter(city =>
    city.name && typeof city.name === 'string' && city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleSelectCity = (cityName) => {
      console.log("cityname",cityName)
      setFormState(prev => ({ ...prev, city: cityName?.name }));
      setSearchQuery(cityName?.name);
      setShowDropdown(false);
  };

  const handleChangeAddress = useCallback(({ address }) => {
    setFormState(prevState => ({
      ...prevState,
      ...(formState.deliveryType === DELIVERY_TYPES.DOOR_TO_DOOR ? {
        address
      } : {
        platformStationId: address
      }),
    }))

    if (paymentMethodRef.current) {
      switch (formState.deliveryService) {
        case DELIVERY_SERVICES.YANDEX_DELIVERY: {
          apiClient.post('/YandexOrder/calculate-order', {
            delivery_type: formState.deliveryType,
            ...(formState.deliveryType === DELIVERY_TYPES.PICKUP_POINT ? {
              platform_station_id: address,
            } : {
              address
            })}).then(({ data: { pricing_total }}) => {
              const numericPrice = parseInt(pricing_total);
            setDeliveryPrice(numericPrice);
            setAmountPrice(calculatedBasketPrice + numericPrice);
            paymentMethodRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          })

          return;
        }

        case DELIVERY_SERVICES.CDEK:
        default: {
          apiClient.post()
        }
      }
    }
  }, [formState.deliveryService, formState.deliveryType])

  const conditionallyUpdateAddress = useCallback(() => {
    const { street } = formState

    if (street) {
      const address = `${formState.city} ${formState.street}`
      handleChangeAddress({ type: DELIVERY_TYPES.DOOR_TO_DOOR, address })
    }
  }, [formState.city, formState.street, formState.deliveryType, handleChangeAddress])

  useEffect(() => {
    conditionallyUpdateAddress();
  }, [conditionallyUpdateAddress, formState.deliveryService, formState.deliveryType])


  const onChangePromo = () => {
    const code = promo.promocode.toUpperCase()
    if (promo.type) {
      setPromo({ ...promo, type: null, procent: null, itogProcent: 0, promocode: "" })
    } else if (code === "WELCOME10") {
      setPromo({ ...promo, type: true, procent: `Промокод активирован. Воша сидка ${amountPrice / 100 * 10} руб.`, itogProcent: amountPrice / 100 * 10 })
    } else if (code === "TEST90") {
      setPromo({ ...promo, type: true, procent: `Промокод активирован. Воша сидка ${amountPrice / 100 * 90} руб.`, itogProcent: amountPrice / 100 * 90 })
    }
    else {
      setPromo({ ...promo, type: false, procent: "Неверный промокод или его срок действия истек", promocode: "", itogProcent: 0 })
    }
  }

  return (
    <div className="PlacingAnOrder">
      <h1>Оформление</h1>
      <div className="PlacingAnOrder__box">
        <form noValidate onSubmit={placingAnOrder} className="PlacingAnOrder__form">
          <div className="PlacingAnOrder__form__1">
            <h1>Получатель</h1>
            <div className="PlacingAnOrder__form__div__1" style={{ gap: '12px' }}>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="name">Имя*</label>
                <input style={{ borderColor: errors.name && 'red' }} type="text" required id="name" onChange={e => onChange('name', e.target.value)} />
                {errors.name && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.name}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="surname">Фамилия*</label>
                <input style={{ borderColor: errors.surname && 'red' }} type="text" required id="surname" onChange={e => onChange('surname', e.target.value)} />
                {errors.surname && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.surname}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="phoneNumber">Телефон*</label>
                <InputMask mask="9 (999) 9999 999" style={{ borderColor: errors.phoneNumber && 'red' }} type="text" required id="phoneNumber" onChange={e => onChange('phoneNumber', e.target.value)} >
                {(inputProps) => <input {...inputProps} style={{ borderColor: errors.phoneNumber && 'red' }} type="text" id="phoneNumber"  />
                }
                </InputMask>
                {errors.phoneNumber && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.phoneNumber}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="email">Email*</label>
                <input style={{ borderColor: errors.email && 'red' }} type="text" required id="email" onChange={e => onChange('email', e.target.value)} />
                {errors.email && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <h1>Доставка</h1>
            <div className="PlacingAnOrder__form__div__1">
              <div className="PlacingAnOrder__form__1">
                <div className="PlacingAnOrder__form__div__3">
                  <div onClick={() => onChange('deliveryType', DELIVERY_TYPES.DOOR_TO_DOOR)}>
                    <div className="PlacingAnOrder__CheckTrue">
                      {isDoorToDoorDelivery ? <img src={activeCheckbox} alt="CheckTrue"/> : ''}
                    </div>
                    <label htmlFor="sity">Доставка до двери</label>
                  </div>
                  <div onClick={() => onChange('deliveryType', DELIVERY_TYPES.PICKUP_POINT)}>
                    <div className="PlacingAnOrder__CheckTrue">
                      {!isDoorToDoorDelivery ? <img src={activeCheckbox} alt="CheckTrue"/> : ''}
                    </div>
                    <label htmlFor="sity">Доставка до ПВЗ</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="PlacingAnOrder__form__div__1">
              <RadioGroup currentValue={formState.deliveryService} radios={[{
                value: DELIVERY_SERVICES.CDEK,
                icon: cdekDeliveryIcon,
              }, {
                value: DELIVERY_SERVICES.YANDEX_DELIVERY,
                icon: yandexDeliveryIcon,
              }]} onChange={(newDeliveryService) => onChange('deliveryService', newDeliveryService)}/>
            </div>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="sity">Город*</label>
                <div style={{position: 'relative'}}>
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
                      <ul style={{
                        border: '1px solid #ccc',
                        padding: '0',
                        margin: '0',
                        top: '95%',
                        zIndex: '99999',
                        listStyle: 'none',
                        position: 'absolute',
                        backgroundColor: 'white',
                        maxHeight: '220px',
                        width: '100%',
                        overflowY: "scroll"
                      }}>
                        {filteredCities.map(city => (
                            <li
                                key={city.id}
                                onMouseDown={() => handleSelectCity(city)}
                                style={{padding: '5px', cursor: 'pointer'}}
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
            </div>
            <div className="PlacingAnOrder__form__div__1">
              <div className="PlacingAnOrder__form__div__4">
                {formState.deliveryType === DELIVERY_TYPES.PICKUP_POINT ?
                    {
                      [DELIVERY_SERVICES.YANDEX_DELIVERY]: <YandexDeliveryMap city={formState.city}
                                                                              onAddressChange={(address) => handleChangeAddress({ address })}/>,
                      [DELIVERY_SERVICES.CDEK]: <CDEKMap city={formState.city} onAddressChange={handleChangeAddress}/>,
                    }[formState.deliveryService] :
                <AddressForm onChange={onChange} onFormBlur={conditionallyUpdateAddress} />}
              </div>
            </div>
            </div>

            <div className="PlacingAnOrder__form__1">
            <h1>Дополнительно</h1>
              <div className="PlacingAnOrder__form__div__1">
                <div>
                  <label htmlFor="message">Комментарий</label>
                  <input type="text" id="message" onChange={e => onChange('message', e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="PlacingAnOrder__form__1" ref={paymentMethodRef}>
              <h1>Способ оплаты</h1>
              <div className="PlacingAnOrder__form__div__5">
                <div onClick={() => onChange('radio_box', true)}>
                  <div className="PlacingAnOrder__form__item__5">
                    <div>
                    <span>
                      {formState.radio_box ? <img src={iconRadeoButton} alt="iconRadeoButton"/> : <div></div>}
                    </span>
                      Картой онлайн
                    </div>
                    <div>
                      <img src={banckCart} alt="banckCart"/>
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
                  <div className="PlacingAnOrder__CheckTrue"
                       onClick={() => onChange('isAgreedWithPolicies', !formState.isAgreedWithPolicies)}>
                    {formState.isAgreedWithPolicies ? <img src={activeCheckbox} alt="CheckTrue"/> : ''}
                  </div>
                  <div className="PlacingAnOrder__Lable__6">
                    <label>Я ознакомлен и согласен с условиями оферты</label>
                    <p>и политики конфиденциальности</p>
                  </div>
                </div>
              </div>
            </div>

            {<div className="PlacingAnOrder__form__1">
              <h1>Ваш заказ</h1>
              <div className="PlacingAnOrder__form__div__1">
                <div>
                  <label htmlFor="promo">Промокод или сертификат</label>
                  <div>
                    <input type="text" value={promo.promocode} id="promo"
                           onChange={e => setPromo({...promo, promocode: e.target.value})}/>
                    <button onClick={onChangePromo}
                            style={{backgroundColor: promo.type && '#0000004D'}}> {promo.type ? "Сбросить" : "Применить"}</button>
                  </div>
                  {
                    <p className="mt-2"
                       style={{color: promo.type === null ? "transparent" : promo.type ? '#408759' : '#AA4D45',}}>{promo.procent || '-'}</p>}
                </div>
              </div>
            </div>}

            <div className="PlacingAnOrder__form__price">
              <div className="PlacingAnOrder__form__raschot">
                <div>
                  <p>Сумма:</p>
                  <p>{amountPrice} руб</p>
                </div>
                <div>
                  <p>Стоимость доставки:</p>
                  <p>{deliveryPrice} руб</p>
                </div>
                <div style={{color: promo.itogProcent === 0 ? "transparent" : '#AA4D45'}}>
                  <p>Скидка:</p>
                  <p>{promo.itogProcent} руб</p>
                </div>
              </div>
              <div className="PlacingAnOrder__form__raschot">
                <div className="PlacingAnOrder__form__raschot__price">
                  <p>Итого:</p>
                  <p>{amountPrice} руб</p>
                </div>

                <button disabled={!formState.isAgreedWithPolicies || loading}
                        className={`button__placing__an__order ${!formState.isAgreedWithPolicies && "block__button"}`}
                        type="submit">Оформить заказ
                </button>
                {paymentError ? <p className="text-red-700 text-2xl text-center">Ошибка при попытке оплаты</p> : ""}
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
