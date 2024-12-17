import { useEffect, useState } from "react";
import activeCheckbox from "../../../assets/icon/activeCheckbox.svg";
import iconRadeoButton from "../../../assets/icon/iconRadeoButton.svg";
import banckCart from "../../../assets/icon/banckCart.svg";
import ItemModalBasket from "../modalNavigate/ItemModalBasket";
import CDEKMap from "./pageElements/CDEKMap";
import { ArrCity } from "../../../assets/processed_city";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";
import Branding from "../../../assets/icon/Branding.svg";
import DeliveryMap from "../Ymap/DeliveryMap";
import apiClient from "../../../utils/api";
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

export default function PlacingAnOrder() {
  const [promo, setPromo] = useState({
    type: null,
    procent: null,
    promocode: "",
    itogProcent: 0,
  });
  // const [sity, setSity] = useState("")
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [city, setCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [amountPrice, setAmountPrice] = useState(0);
  const [paymentError, setPaymentError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const token = localStorage.getItem("token");
  const [formState, setFormState] = useState({
    name: "", // *
    sorname: "", // *
    number: "", // *
    email: "", // *
    // addres: '',
    StreetHome: "",
    apartmentOrOffice: "",
    floor: "",
    intercom: "",
    entrance: "",
    message: "",
    check_box_1: false,
    check_box_3: false, // *
    radio_box: true, // *
    price: amountPrice, // *
  });
  const [errors, setErrors] = useState({});

  const scrollToSection = (id, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const onChange = (key, value) => {
    setFormState((prevFormState) => ({ ...prevFormState, [key]: value }));
  };

  const validate = () => {
    const emailValidateRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const newErrors = {};
    if (!formState.name) newErrors.name = "Имя обязательно";
    if (!formState.sorname) newErrors.sorname = "Фамилия обязательна";
    if (
      !formState.number ||
      formState.number.replace(/[^\d]/g, "")?.length !== 11
    )
      newErrors.number = "Телефон обязателен";
    if (!formState.email || !emailValidateRegex.test(formState.email))
      newErrors.email = "Email обязателен";
    if (formState.check_box_1) {
      if (!formState.StreetHome) newErrors.StreetHome = "Улица, дом обязателен";
      // if (!formState.apartmentOrOffice) newErrors.apartmentOrOffice = 'Адрес обязателен';
      // if (!formState.floor) newErrors.floor = 'Адрес обязателен';
      // if (!formState.intercom) newErrors.intercom = 'Адрес обязателен';
      // if (!formState.entrance) newErrors.entrance = 'Адрес обязателен';
    } else {
      if (deliveryPrice <= 0) newErrors.deliveryPrice = "Выберите пункт выдочи";
    }

    scrollToSection(
      newErrors.name
        ? "name"
        : newErrors.sorname
        ? "sorname"
        : newErrors.number
        ? "number"
        : newErrors.email
        ? "email"
        : // newErrors.deliveryData ? 'deliveryData' : null
        formState.check_box_1
        ? newErrors.StreetHome
          ? "StreetHome"
          : null
        : newErrors.deliveryData
        ? "deliveryData"
        : null,
      120,
    );

    return newErrors;
  };

  const orderCuirer = async (e) => {
    e.preventDefault();
    setPaymentError(false);
    let packagesItems = [];
    const cartData = localStorage.getItem("dataGelary");
    if (cartData) {
      const parse = JSON.parse(cartData);
      packagesItems = parse.map((v) => ({
        WareKey: v.id?.toString(),
        Payment: {
          Value: v?.price,
        },
        Name: v?.name,
        Cost: v?.price * 100,
        Amount: v?.price * v?.count * 100,
        Weight: 100,
        Url: "https://elevenislands.ru",
      }));
    }
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const body = {
        CdekNumber: 136,
        Comment: formState?.message,
        Height: 10,
        Length: 10,
        Weight: 4000,
        Width: 10,
        Sender: {
          Company: "string",
          Name: `${formState?.name?.trim()} ${formState?.sorname?.trim()}`,
          Phones: [
            {
              Number: formState?.number?.replace(/[^\d]/g, ""),
            },
          ],
        },
        FromLocation: {
          // Code: deliveryData[2]?.city_code || "",
          // FiasGuid: "",
          // PostalCode: deliveryData[2]?.postal_code || "",
          // Longitude: deliveryData[2]?.location[0] || "",
          // Latitude: deliveryData[2]?.location[1] || "",
          // CountryCode: deliveryData[2]?.country_code || "",
          // Region: deliveryData[2]?.region || "",
          // SubRegion: "",
          // KladrCode: "",
          // City: city || "",
          Addres: {
            StreetHome: formState.StreetHome,
            apartmentOrOffice: formState.apartmentOrOffice,
            floor: formState.floor,
            intercom: formState.intercom,
            entrance: formState.entrance,
          },
        },
        // Addres: {
        //   StreetHome: formState.StreetHome,
        //   apartmentOrOffice: formState.apartmentOrOffice,
        //   floor: formState.floor,
        //   intercom: formState.intercom,
        //   entrance: formState.entrance,
        // }
        NeedCall: true,
        // FromLocation: {
        //   PostalCode: "MSK951",
        //   CountryCode: "RU",
        //   City: "Москва",
        //   Address: "Нагатинская набережная, 54",
        // },
        // Packages: [
        //   {
        //     Number: new Date().toISOString(),
        //     Comment: "Упаковка",
        //     Height: 10,
        //     Length: 10,
        //     Weight: 4000,
        //     Width: 10,
        //     Items: packagesItems,
        //   },
        // ],
        // Sender: {
        //   Name: "Петров Петр",
        // },
      };
      await axios.post(
        "https://backendeleven.ru/api/Pay/create-payment-cuirer",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("body", body);
    }
  };

  const createOrder = async (items) => {
    if (!items || !items.length) {
      console.error("Items array is empty or undefined");
      return;
    }
    if (!formState) {
      console.error("Form state is missing");
      return;
    }
    if (!deliveryData || !deliveryData[2]) {
      console.error("Delivery data is incomplete");
      return;
    }

    const transformedItems = items.map((item) => {
      const { Id, Price, Amount, Name } = item;

      return {
        article: `${Id}12345`,
        billing_details: {
          assessed_unit_price: Price || 0,
          unit_price: Price || 0,
        },
        count: Amount || 1,
        name: Name || "Товар без названия",
        place_barcode: `${Id}_barcode`,
      };
    });

    const {
      paymentMethod = "string",
      deliveryFrom = "string",
      deliveryTo = "string",
      lastMilePolicy = "string",
      name = "",
      sorname = "",
      number = "",
    } = formState || {};

    const deliveryInfo = deliveryData[2] || {};
    const {
      address = "",
      city = "",
      postal_code = "",
      country_code = "RU",
      location = [0, 0],
      platform_id = "",
    } = deliveryInfo;

    const idProduct = localStorage.getItem("customerId");
    const bodyOrder = {
      billing_info: {
        payment_method: paymentMethod,
      },
      destination: {
        type: "custom_location",
        custom_location: {
          address,
          city,
          postal_code,
          country_code,
          longitude: location[0],
          latitude: location[1],
        },
        platform_station: {
          platform_id,
        },
        interval: {
          from: deliveryFrom,
          to: deliveryTo,
        },
      },
      info: {
        operator_request_id: idProduct || "string",
      },
      items: transformedItems,
      last_mile_policy: lastMilePolicy,
      places: [
        {
          barcode: new Date().toISOString(),
          physical_dims: {
            weight_gross: 2000,
            dx: 10,
            dy: 10,
            dz: 10,
          },
        },
      ],
      recipient_info: {
        first_name: name.trim(),
        last_name: sorname.trim(),
        phone: number.replace(/[^\d]/g, ""),
      },
      source: {
        platform_station: {
          platform_id: "MSK951",
        },
      },
    };

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://backendeleven.ru/YandexOrder/create-order",
        bodyOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.open(data?.PaymentURL, "_self");
    } catch (error) {
      console.error(
        "Error creating order:",
        error?.response?.data || error.message,
      );
      setPaymentError(true);
    } finally {
      setLoading(false);
    }
  };

  console.log("formState.check_box_1", formState);

  const placingAnOrder = async (e) => {
    e.preventDefault();
    setPaymentError(false);
    if (formState.check_box_3) {
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
        if (formState.check_box_3) {
          // const body = {
          //   Email: formState.email,
          //   Discription: formState.message || "",
          //   Anmount: (amountPrice - promo.itogProcent) * 100,
          //   Price: (amountPrice - promo.itogProcent) * 100,
          //   Name: formState.name,
          //   SurName: formState.sorname,
          //   Items: items,
          //   AcceptedTerms: formState.check_box_3,
          //   PromoCode: promo.promocode,
          //   DeliverPrice: deliveryPrice,
          //   city: city
          // }
          // if (formState.check_box_1) {
          //   body.Addres = {
          //     StreetHome: formState.StreetHome,        //Улица, дом
          //     apartmentOrOffice: formState.apartmentOrOffice, // Квартира или офис
          //     floor: formState.floor,             // Этаж
          //     intercom: formState.intercom,          // Домофон
          //     entrance: formState.entrance,          // Подъезд
          //   }
          // } else {
          //   // body.infoCdek = deliveryData
          // }

          // let packagesItems = []
          // const cartData = localStorage.getItem("dataGelary")
          // if (cartData) {
          //   const parse = JSON.parse(cartData)
          //   packagesItems = parse.map((v) => ({
          //     WareKey: v.id?.toString(),
          //     Payment: {
          //       Value: v?.price
          //     },
          //     Name: v?.name,
          //     Cost: v?.price * 100,
          //     Amount: (v?.price * v?.count) * 100,
          //     Weight: 100,
          //     Url: "https://elevenislands.ru",
          //   }))
          // }
          // console.log("packagesItems", packagesItems)
          console.log("PVZ");
          const cartData = localStorage.getItem("dataGelary");
          let items = [];
          if (cartData) {
            const parse = JSON.parse(cartData);
            if (promo.procentSkitki > 0 && promo.type) {
              items = parse.map((v) => ({
                Id: v?.id,
                Name: v?.name,
                Quantity: v?.count,
                Price: v?.price * 100,
                Amount:
                  v?.price * v?.count -
                  ((v?.price * v?.count * 100) / 100) * promo.procentSkitki,
                Tax: "none",
              }));
            } else {
              items = parse.map((v) => ({
                Id: v?.id,
                Name: v?.name,
                Quantity: v?.count,
                Price: v?.price * 100,
                Amount: v?.price * v?.count,
                Tax: "none",
              }));
            }
          }

          // let remainingDiscount = deliveryPrice;
          const totalDeliveryCost = deliveryPrice;
          const baseDeliveryCost = Math.floor(totalDeliveryCost / items.length);
          const deliveryRemainder = totalDeliveryCost % items.length;

          const body = {
            Email: formState.email,
            Discription: formState.message || "",
            Anmount:
              (amountPrice - promo.itogProcent + totalDeliveryCost) * 100,
            Price: (amountPrice - promo.itogProcent + totalDeliveryCost) * 100,
            Items: items.map((item, index) => ({
              ...item,
              Amount:
                (item.Amount +
                  baseDeliveryCost +
                  (index < deliveryRemainder ? 1 : 0)) *
                100,
            })),
          };
          setLoading(true);
          try {
            const { data } = await axios.post(
              "https://backendeleven.ru/api/Pay/create-payment",
              body,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            console.log("payment");
            // await createCdekOrder()
            if (!formState.check_box_1) {
              await createOrder(items);
            } else {
              await orderCuirer();
            }
            console.log("order");
            if (formState.check_box_1) {
              await orderCuirer();
            }
            // localStorage.removeItem("dataGelary")
            window.open(data?.PaymentURL, "_self");
          } catch (error) {
            console.log("error", error);
            setPaymentError(true);
          } finally {
            setLoading(false);
          }
        }
      }
    }
  };
  console.log(deliveryData);
  const filteredCities = ArrCity.filter(
    (city) =>
      city.name &&
      typeof city.name === "string" &&
      city.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSelectCity = (cityName) => {
    console.log("cityname", cityName);
    setCity(cityName);
    setSearchQuery(cityName?.name);
    setShowDropdown(false);
  };

  const onChangePromo = async () => {
    const code = promo.promocode.toUpperCase();
    if (!promo.type) {
      try {
        const res = await apiClient.get(
          `https://backendeleven.ru/Api/get-promo-for-user?name=${code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        // Math.floor
        // Math.ceil
        if (res.status === 200) {
          setPromo({
            ...promo,
            type: true,
            procent: `Промокод активирован. Воша сидка ${Math.floor(
              (amountPrice / 100) * res.data.promo,
            )} руб.`,
            itogProcent: Math.floor((amountPrice / 100) * res.data.promo),
            procentSkitki: res.data.promo,
          });
        }
      } catch (e) {
        console.log(e.response.status);
        if (e.response.status) {
          setPromo({
            ...promo,
            type: false,
            procent: "Неверный промокод или его срок действия истек",
            promocode: "",
            itogProcent: 0,
          });
        }
      }
    } else {
      setPromo({
        ...promo,
        type: null,
        procent: null,
        itogProcent: 0,
        promocode: "",
      });
    }
  };
  useEffect(() => {
    const cartData = localStorage.getItem("dataGelary");
    if (cartData) {
      const parse = JSON.parse(cartData);
      let countPrice = 0;
      parse.forEach((v) => {
        countPrice += v?.price * v.count;
      });
      setAmountPrice(countPrice);
    }
  }, []);
  return (
    <div className="PlacingAnOrder">
      <h2>Оформление</h2>
      <div className="PlacingAnOrder__box">
        <form
          noValidate
          onSubmit={placingAnOrder}
          className="PlacingAnOrder__form"
        >
          <div className="PlacingAnOrder__form__1">
            <h2>Получатель</h2>
            <div
              className="PlacingAnOrder__form__div__1"
              style={{ gap: "12px" }}
            >
              <div style={{ position: "relative", height: "90px" }}>
                <label htmlFor="name">Имя*</label>
                <input
                  style={{ borderColor: errors.name && "red" }}
                  type="text"
                  required
                  id="name"
                  onChange={(e) => onChange("name", e.target.value)}
                />
                {errors.name && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      position: "absolute",
                      bottom: "0px",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div style={{ position: "relative", height: "90px" }}>
                <label htmlFor="sorname">Фамилия*</label>
                <input
                  style={{ borderColor: errors.sorname && "red" }}
                  type="text"
                  required
                  id="sorname"
                  onChange={(e) => onChange("sorname", e.target.value)}
                />
                {errors.sorname && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      position: "absolute",
                      bottom: "0px",
                    }}
                  >
                    {errors.sorname}
                  </p>
                )}
              </div>
              <div style={{ position: "relative", height: "90px" }}>
                <label htmlFor="number">Телефон*</label>
                <InputMask
                  mask="9 (999) 9999 999"
                  style={{ borderColor: errors.number && "red" }}
                  type="text"
                  required
                  id="number"
                  onChange={(e) => onChange("number", e.target.value)}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      style={{ borderColor: errors.number && "red" }}
                      type="text"
                      id="number"
                    />
                  )}
                </InputMask>
                {errors.number && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      position: "absolute",
                      bottom: "0px",
                    }}
                  >
                    {errors.number}
                  </p>
                )}
              </div>
              <div style={{ position: "relative", height: "90px" }}>
                <label htmlFor="email">Email*</label>
                <input
                  style={{ borderColor: errors.email && "red" }}
                  type="text"
                  required
                  id="email"
                  onChange={(e) => onChange("email", e.target.value)}
                />
                {errors.email && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      position: "absolute",
                      bottom: "0px",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <h2>Доставка</h2>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="sity">Город*</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Поиск города"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    onFocus={() => setShowDropdown(true)}
                  />

                  {showDropdown && filteredCities.length > 0 && (
                    <ul
                      style={{
                        border: "1px solid #ccc",
                        padding: "0",
                        margin: "0",
                        top: "95%",
                        zIndex: "99999",
                        listStyle: "none",
                        position: "absolute",
                        backgroundColor: "white",
                        maxHeight: "220px",
                        width: "100%",
                        overflowY: "scroll",
                      }}
                    >
                      {filteredCities
                        ?.sort((a, b) => {
                          if (a.name < b.name) return -1;
                          if (a.name > b.name) return 1;
                          return 0;
                        })
                        ?.map((city) => (
                          <li
                            key={city.id}
                            onMouseDown={() => handleSelectCity(city)}
                            style={{ padding: "5px", cursor: "pointer" }}
                          >
                            {city.name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
              {formState.check_box_1 && (
                <div className="divAddres">
                  <div
                    className="Addres"
                    style={{ position: "relative", height: "90px" }}
                  >
                    <label htmlFor="StreetHome">Улица, дом*</label>
                    <input
                      style={{ borderColor: errors.StreetHome && "red" }}
                      type="text"
                      id="StreetHome"
                      onChange={(e) => onChange("StreetHome", e.target.value)}
                    />
                    {errors.StreetHome && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          position: "absolute",
                          bottom: "0px",
                        }}
                      >
                        {errors.StreetHome}
                      </p>
                    )}
                  </div>
                  <div className="comAddres">
                    <div>
                      <label htmlFor="apartmentOrOffice">
                        Квартира или офис
                      </label>
                      <input
                        style={{
                          borderColor: errors.apartmentOrOffice && "red",
                        }}
                        type="text"
                        id="apartmentOrOffice"
                        onChange={(e) =>
                          onChange("apartmentOrOffice", e.target.value)
                        }
                      />
                      {/* {errors.apartmentOrOffice && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.apartmentOrOffice}</p>} */}
                    </div>
                    <div>
                      <label htmlFor="floor">Этаж</label>
                      <input
                        style={{ borderColor: errors.floor && "red" }}
                        type="text"
                        id="floor"
                        onChange={(e) => onChange("floor", e.target.value)}
                      />
                      {/* {errors.floor && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.floor}</p>} */}
                    </div>
                    <div>
                      <label htmlFor="intercom">Домофон</label>
                      <input
                        style={{ borderColor: errors.intercom && "red" }}
                        type="text"
                        id="intercom"
                        onChange={(e) => onChange("intercom", e.target.value)}
                      />
                      {/* {errors.intercom && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.intercom}</p>} */}
                    </div>
                    <div>
                      <label htmlFor="entrance">Подъезд</label>
                      <input
                        style={{ borderColor: errors.entrance && "red" }}
                        type="text"
                        id="entrance"
                        onChange={(e) => onChange("entrance", e.target.value)}
                      />
                      {/* {errors.entrance && <p style={{ fontSize: '12px', color: 'red', position: 'absolute', bottom: '0px' }}>{errors.entrance}</p>} */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="PlacingAnOrder__form__1">
            <div className="PlacingAnOrder__form__div__3">
              <div>
                <div
                  className="PlacingAnOrder__CheckTrue"
                  onClick={() => onChange("check_box_1", true)}
                >
                  {formState.check_box_1 ? (
                    <img src={activeCheckbox} alt="CheckTrue" />
                  ) : (
                    ""
                  )}
                </div>
                <label htmlFor="sity">Курьером Яндекс до двери</label>
              </div>
              <div>
                <div
                  className="PlacingAnOrder__CheckTrue"
                  onClick={() => onChange("check_box_1", false)}
                >
                  {!formState.check_box_1 ? (
                    <img src={activeCheckbox} alt="CheckTrue" />
                  ) : (
                    ""
                  )}
                </div>
                <label htmlFor="sity">До пункта выдачи заказов Яндекс</label>
              </div>
            </div>
          </div>
          {!formState.check_box_1 && (
            <div className="PlacingAnOrder__form__1">
              <div className="PlacingAnOrder__form__div__4">
                <DeliveryMap setDeliveryPrice={setDeliveryPrice} city={city} />
                {errors.deliveryData && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      position: "absolute",
                      bottom: "-5%",
                    }}
                  >
                    {errors.deliveryData}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="PlacingAnOrder__form__1">
            <h2>Дополнительно</h2>
            <div className="PlacingAnOrder__form__div__1">
              <div>
                <label htmlFor="message">Комментарий</label>
                <input
                  type="text"
                  id="message"
                  onChange={(e) => onChange("message", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <h2>Способ оплаты</h2>
            <div className="PlacingAnOrder__form__div__5">
              <div onClick={() => onChange("radio_box", true)}>
                <div className="PlacingAnOrder__form__item__5">
                  <div>
                    <span>
                      {formState.radio_box ? (
                        <img src={iconRadeoButton} alt="iconRadeoButton" />
                      ) : (
                        <div></div>
                      )}
                    </span>
                    Картой онлайн
                  </div>
                  <div>
                    <img src={Branding} alt="Branding" />
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
                    Оплата "Долями" {useMediaQuery(`(max-width: ${widthLap})`) && <br />}
                  </div>
                  <div>
                    
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="PlacingAnOrder__form__1">
            <div className="PlacingAnOrder__form__div__3">
              <div>
                <div
                  className="PlacingAnOrder__CheckTrue"
                  onClick={() =>
                    onChange("check_box_3", !formState.check_box_3)
                  }
                >
                  {formState.check_box_3 ? (
                    <img src={activeCheckbox} alt="CheckTrue" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="PlacingAnOrder__Lable__6">
                  <label>
                    Я ознакомлен и согласен с условиями
                    <br /> оферты и <label>политики конфиденциальности</label>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {
            <div className="PlacingAnOrder__form__1">
              <h2>Ваш заказ</h2>
              <div className="PlacingAnOrder__form__div__1">
                <div>
                  <label htmlFor="promo">Промокод или сертификат</label>
                  <div>
                    <input
                      type="text"
                      value={promo.promocode}
                      id="promo"
                      onChange={(e) => {
                        if (!promo.type)
                          setPromo({ ...promo, promocode: e.target.value });
                      }}
                    />
                    <button
                      onClick={onChangePromo}
                      type="button"
                      style={{ backgroundColor: promo.type && "#0000004D" }}
                    >
                      {" "}
                      {promo.type ? "Сбросить" : "Применить"}
                    </button>
                  </div>
                  {
                    <p
                      className="mt-2"
                      style={{
                        color:
                          promo.type === null
                            ? "transparent"
                            : promo.type
                            ? "#408759"
                            : "#AA4D45",
                      }}
                    >
                      {promo.procent || "-"}
                    </p>
                  }
                </div>
              </div>
            </div>
          }

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
              <div
                style={{
                  color: promo.itogProcent === 0 ? "transparent" : "#AA4D45",
                }}
              >
                <p>Скидка:</p>
                <p>{Math.floor(promo.itogProcent)} руб</p>
              </div>
            </div>
            <div className="PlacingAnOrder__form__raschot">
              <div className="PlacingAnOrder__form__raschot__price">
                <p>Итого:</p>
                <p>
                  {Math.ceil(amountPrice - promo.itogProcent) + deliveryPrice}{" "}
                  руб
                </p>
              </div>

              <button
                disabled={!formState.check_box_3 || loading}
                className={`button__placing__an__order ${
                  !formState.check_box_3 && "block__button"
                }`}
                type="submit"
              >
                Оформить заказ
              </button>
              {paymentError ? (
                <p className="text-red-700 text-2xl text-center">
                  Ошибка при попытке оплаты
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
        {useMediaQuery(`(min-width: ${widthLap})`) && (
          <div className="PlacingAnOrder__basket">
            <ItemModalBasket see={true} />
          </div>
        )}
      </div>
    </div>
  );
}
