import { useEffect, useState } from "react";
import activeCheckbox from '../../../assets/icon/activeCheckbox.svg'
import iconRadeoButton from '../../../assets/icon/iconRadeoButton.svg'
import banckCart from '../../../assets/icon/banckCart.svg'
import ItemModalBasket from "../modalNavigate/ItemModalBasket";
import CDEKMap from "./pageElements/CDEKMap";
import { ArrCity } from "../../../assets/processed_city";
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import axios from "axios";
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
  const [promo, setPromo] = useState({ type: null, procent: null, promocode: "", itogProcent: 0 })
  // const [sity, setSity] = useState("")
  const [city, setCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [amountPrice, setAmountPrice] = useState(0)
  const [paymentError,setPaymentError] = useState(false)
  const [loading,setLoading] = useState(false)
  const [deliveryData,setDeliveryData] = useState([])
  useEffect(()=>{
    const cartData = localStorage.getItem("dataGelary")
    if(cartData){
      const parse = JSON.parse(cartData)
      let countPrice = 0
      parse.forEach(v=>{
        countPrice += v?.price * v.count
      })
      setAmountPrice(countPrice)
    }
  },[])
  const [formState, setFormState] = useState({
    name: '', // *
    sorname: '',// *
    number: '',// *
    email: '',// *
    addres: '',
    message: '',
    check_box_1: false,
    check_box_3: false,// *
    radio_box: true,// *
    price: amountPrice,// *
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
    const emailValidateRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Имя обязательно';
    if (!formState.sorname) newErrors.sorname = 'Фамилия обязательна';
    if (!formState.number || formState.number.replace(/[^\d]/g, '')?.length !== 11) newErrors.number = 'Телефон обязателен';
    if (!formState.email || !emailValidateRegex.test(formState.email)) newErrors.email = 'Email обязателен';
    if (formState.check_box_1) {
      if (!formState.addres) newErrors.addres = 'Адрес обязателен';
    }

    scrollToSection(newErrors.name && 'name' || newErrors.sorname && 'sorname' || newErrors.number && 'number' || newErrors.email && 'email' || newErrors.addres && 'addres', 120)
    return newErrors;
  };


  const createCdekOrder = async () => {
    let packagesItems = []
    const cartData = localStorage.getItem("dataGelary")
    if (cartData) {
      const parse = JSON.parse(cartData)
      packagesItems = parse.map((v) => ({
        WareKey:v.id?.toString(),
        Payment:{
          Value:v?.price
        },
        Name: v?.name,
        Cost: v?.price * 100,
        Amount: (v?.price * v?.count) * 100,
        Weight: 100,
        Url: "https://elevenislands.ru",
      }))
    }
    console.log("packagesItems",packagesItems)

    const body = {
      TariffCode: 136,
      Comment: formState?.message,
      Recipient: {
        Name: `${formState?.name?.trim()} ${formState?.sorname?.trim()}`,
        Phones: [
          {
            Number: formState?.number?.replace(/[^\d]/g, ""),
          },
        ],
      },
      ToLocation: {
        Code: deliveryData[2]?.city_code || "",
        FiasGuid: "",
        PostalCode: deliveryData[2]?.postal_code || "",
        Longitude: deliveryData[2]?.location[0] || "",
        Latitude: deliveryData[2]?.location[1] || "",
        CountryCode: deliveryData[2]?.country_code || "",
        Region: deliveryData[2]?.region || "",
        SubRegion: "",
        City: deliveryData[2]?.city || "",
        KladrCode: "",
        Address: deliveryData[2]?.address || "",
      },
      FromLocation: {
        PostalCode: "MSK951",
        CountryCode: "RU",
        City: "Москва",
        Address: "Нагатинская набережная, 54",
      },
      Packages: [
        {
          Number: new Date().toISOString(),
          Comment: "Упаковка",
          Height: 10,
          Length: 10,
          Weight: 4000,
          Width: 10,
          Items: packagesItems,
        },
      ],
      Sender: {
        Name: "Петров Петр",
      },
     
    }
    console.log("body",body)
    await axios.post("https://elevenislands.ru/api/Pay/create-order",body)
  }

  const placingAnOrder = async(e) => {
    e.preventDefault();
    setPaymentError(false)
    if (formState.check_box_3) {
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
        if (formState.check_box_3) {
          console.log("TUT")
          let items = []
          const cartData = localStorage.getItem("dataGelary")
          if(cartData){
            const parse = JSON.parse(cartData)
           items =  parse.map(v=>({
            Name:v?.name,
            Quantity:v?.count,
            Price:(v?.price + (deliveryData?.[1]?.delivery_sum || 0)) *100,
            Amount:((v?.price * v?.count) + (deliveryData?.[1]?.delivery_sum || 0)) * 100 ,
            Tax:"none",
           }))
          }


          const body= {
            Email:formState.email,
            Discription:formState.message || "",
            Anmount:((amountPrice - promo.itogProcent) + (deliveryData?.[1]?.delivery_sum || 0)) * 100,
            Price:((amountPrice - promo.itogProcent) + (deliveryData?.[1]?.delivery_sum || 0)) * 100,
            Items:items
          }

          setLoading(true)
        try {
          const {data} = await axios.post("https://elevenislands.ru/api/Pay/create-payment",body)
          console.log("payment")
          // await createCdekOrder()
          console.log("order")
          // localStorage.removeItem("dataGelary")
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
      setCity(cityName?.name);
      setSearchQuery(cityName?.name);
      setShowDropdown(false);
  };


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
                <label htmlFor="sorname">Фамилия*</label>
                <input style={{ borderColor: errors.sorname && 'red' }} type="text" required id="sorname" onChange={e => onChange('sorname', e.target.value)} />
                {errors.sorname && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.sorname}</p>}
              </div>
              <div style={{ position: 'relative', height: '90px' }}>
                <label htmlFor="number">Телефон*</label>
                <InputMask mask="9 (999) 9999 999" style={{ borderColor: errors.number && 'red' }} type="text" required id="number" onChange={e => onChange('number', e.target.value)} >
                {(inputProps) => <input {...inputProps} style={{ borderColor: errors.number && 'red' }} type="text" id="number"  />
                }
                </InputMask>
                {errors.number && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.number}</p>}
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
                          onMouseDown={() => handleSelectCity(city)}
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
              <CDEKMap setDeliveryData={setDeliveryData} city={city} />
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
                    Картой онлайн
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

          {formState.check_box_1 && <div className="PlacingAnOrder__form__1">
            <h1>Ваш заказ</h1>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="promo">Промокод или сертификат</label>
                <div>
                  <input type="text" value={promo.promocode} id="promo" onChange={e => setPromo({ ...promo, promocode: e.target.value })} />
                  <button onClick={onChangePromo} style={{ backgroundColor: promo.type && '#0000004D' }}> {promo.type ? "Сбросить" : "Применить"}</button>
                </div>
                {
                  <p className="mt-2" style={{ color: promo.type === null ? "transparent" : promo.type ? '#408759' : '#AA4D45', }}>{promo.procent || '-'}</p>}
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
                <p>{deliveryData[1]?.delivery_sum || 0} руб</p>
              </div>
              <div style={{ color: promo.itogProcent === 0 ? "transparent" : '#AA4D45' }}>
                <p>Скидка:</p>
                <p>{promo.itogProcent} руб</p>
              </div>
            </div>
            <div className="PlacingAnOrder__form__raschot">
              <div className="PlacingAnOrder__form__raschot__price">
                <p>Итого:</p>
                <p>{(amountPrice - promo.itogProcent) + (deliveryData?.[1]?.delivery_sum || 0)} руб</p>
              </div>

              <button disabled={!formState.check_box_3 || loading} className={`button__placing__an__order ${!formState.check_box_3 && "block__button"}`} type="submit" >Оформить заказ</button>
                {paymentError ? <p className="text-red-700 text-2xl text-center">Ошибка при попытке оплаты</p>:""}
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
