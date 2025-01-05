import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Box2 from "./pageElements/Box2";
import NewCollection from "../../../assets/icon/NewCollection.svg";
import lineyka from "../../../assets/icon/lineyka.svg";
import popupPc from "../../../assets/icon/popup-pc.svg";
// popupPc
import dalymiIcon from "../../../assets/icon/dalymiIcon.svg";
//dalymiIcon
import iconRightButtonDalymi from "../../../assets/icon/iconRightButtonDalymi.svg";
//iconRightButtonDalymi
import DalymiImgMobile from "../../../assets/icon/DalymiImgMobile.svg";
//DalymiImgMobile
import DalymiImgPc from "../../../assets/icon/DalymiImgPc.svg";
//DalymiImgPc
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { dataGelaryStore } from "../../layout/storeState/modalBasket";
// NewCollection.svg

import SendEmail from "./pageElements/SendEmail";

import { usePhotoStore } from "../storeState/store";
import { PiMinus, PiPlus } from "react-icons/pi";
// import axios from 'axios';
import Slider from "react-slick";
import ImageCom from "./pageElements/ImageCom";
import { Helmet } from "react-helmet";

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

export default function Prodect() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { findeElement, findeProduct } = usePhotoStore();
  const [count, setCount] = useState(null);
  const [colorVibor, setColorVibor] = useState(() => {
    return localStorage.getItem("colorVibor") || "";
  });

  console.log("====================================");
  console.log("findeElement", findeElement);
  console.log("====================================");

  // useEffect(() => {

  // }, [colorVibor]);
  const [isOpenDiscrip, setIsOpenDiscrip] = useState(true);
  const [isOpenDiscrip2, setIsOpenDiscrip2] = useState(false);
  const [isOpenDiscrip3, setIsOpenDiscrip3] = useState(false);
  const { dataGelary, setDataGelary } = dataGelaryStore();
  const sizeDef = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const [parsColors, setParsColors] = useState([]);
  const [haveSize, setHaveSize] = useState([]);
  const { photos, fetchPhotos } = usePhotoStore();
  const [sizeVibor, setSizeVibor] = useState(haveSize[0]);
  const [modalOpen, setModalOpen] = useState({
    open: false,
    img: null,
    element: {},
  });
  useEffect(() => {
    if (haveSize.length > 0) {
      setSizeVibor(haveSize[0]);
      setColorVibor(findeElement?.colors?.[0]?.name);
    }
  }, [haveSize, findeElement]);

  const toggleOpenDiscrip = () => {
    setIsOpenDiscrip(!isOpenDiscrip);
  };

  useEffect(() => {
    findeProduct(id);
    const element = document.getElementById("topSity");
    // window.scroll(0, 0)
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - 100,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    if (findeElement?.sizes) {
      const arrSize = [];
      findeElement?.sizes?.map((el) => {
        arrSize.push(el.sizeValue);
      });
      setHaveSize(arrSize);
    }
  }, [findeElement?.sizes]);

  const addToBasket = (_, countOp) => {
    // const dataBasket = JSON.parse(localStorage.getItem("dataGelary"))
    const existingProduct = dataGelary.find((product) => product.id === id);
    if (existingProduct) {
      const dataDeform = dataGelary.filter(
        (el) => el.id !== existingProduct.id,
      );
      setDataGelary([
        ...dataDeform,
        {
          ...existingProduct,
          count: count || 1,
          countPrice: existingProduct.price * count,
        },
      ]);
    } else {
      if (countOp) {
        setDataGelary([
          ...dataGelary,
          {
            id: id,
            idProduct: findeElement?.idProduct,
            title: findeElement?.name,
            name: findeElement?.shortDescription,
            price: findeElement?.price,
            size: sizeVibor,
            count: 1,
            titleImg: findeElement?.images?.[0],
            countPrice: findeElement?.price,
          },
        ]);
      }
      if (count) {
        setDataGelary([
          ...dataGelary,
          {
            id: id,
            idProduct: findeElement?.idProduct,
            title: findeElement?.name,
            name: findeElement?.shortDescription,
            price: findeElement?.price,
            size: sizeVibor,
            count: count || 1,
            titleImg: findeElement?.images?.[0],
            countPrice: findeElement?.price,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    if (count) {
      addToBasket();
    }
  }, [count]);

  const widthLap = "1020px";
  const settingsGelary = {
    className: "slider1 product-gelary variable-width-menu",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const location = useLocation();

  const ogData = {
    title: findeElement?.meta_title,
    description: findeElement?.meta_keywords,
    url: location?.pathname,
    image: findeElement?.images?.[0],
    siteName: "ELEVEN ISLANDS",
    keywords: findeElement?.meta_descriptioт,
  };

  useEffect(() => {
    if (
      findeElement?.colors
        ?.filter((el) => el?.name?.split("|")?.[1] === id)?.[0]
        ?.name?.split("|")?.[0]
    ) {
      localStorage.setItem(
        "colorVibor",
        findeElement?.colors
          ?.filter((el) => el?.name?.split("|")?.[1] === id)?.[0]
          ?.name?.split("|")?.[0],
      );
    }
  }, [findeElement]);

  useEffect(() => {
    if (findeElement?.colors) {
      function hexToBrightness(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return 0.299 * r + 0.587 * g + 0.114 * b;
      }

      const sortedColors = findeElement?.colors.sort((a, b) => {
        const brightnessA = hexToBrightness(a.name.split("|")[0]);
        const brightnessB = hexToBrightness(b.name.split("|")[0]);
        return brightnessB - brightnessA;
      });
      setParsColors(sortedColors);
    }
  }, [findeElement]);

  console.log("photos", photos);

  return (
    <>
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
      {findeElement && (
        <>
          <div className="contectProductId" id="topSity">
            {useMediaQuery(`(min-width: ${widthLap})`) && (
              <div className="contectProductId__img">
                {/* {arrDataImgFind[id] && arrDataImgFind[id].content.image.map((prev, i) => (
            <img key={i} src={prev} alt="imgProduct" />
          ))} */}
                {findeElement.images &&
                  findeElement?.images.map((prev, i) => (
                    <img
                      onClick={() =>
                        setModalOpen({
                          open: true,
                          img: prev,
                        })
                      }
                      key={i}
                      src={prev}
                      alt="imgProduct"
                    />
                  ))}
              </div>
            )}
            {useMediaQuery(`(max-width: ${widthLap})`) && (
              <div className="contectProductId_phone">
                <Slider {...settingsGelary}>
                  {findeElement?.images?.map((prev, i) => {
                    console.log(prev);
                    return (
                      <img
                        // style={{
                        //   minHeight: '630px',
                        //   maxHeight: '630px',
                        //   objectFit: 'cover'
                        // }}
                        className="img_phone_items"
                        key={i}
                        src={prev}
                        alt="imgProduct"
                      />
                    );
                  })}
                </Slider>
              </div>
            )}
            <div className="contectProductId__info">
              {/* Prodect{id} */}
              <div className="header-div-product">
                {findeElement?.newCollection && (
                  <img src={NewCollection} alt="NewCollection" />
                )}
                <div >
                  <h2>{findeElement?.shortDescription}</h2>
                  {/* <h2>{findeElement?.name}</h2> */}
                  <p>{findeElement?.descriptionProduct}</p>
                </div>
                <div className="price-product ">
                  {findeElement.discount != 0 && (
                    <h4 className="skitka">
                      {" "}
                      <>{findeElement?.price} ₽</>
                    </h4>
                  )}
                  <h4>
                    <span>
                      {findeElement.discount != 0
                        ? findeElement?.discount || "AAAAAAAA"
                        : findeElement?.price || "000000"}
                    </span>{" "}
                    ₽
                  </h4>
                </div>
              </div>
              {useMediaQuery(`(max-width: ${widthLap})`) ? (
                <div
                  className="block-dalymi"
                  onClick={() =>
                    setModalOpen({
                      open: true,
                      img: DalymiImgMobile,
                      element: {
                        priceDalymi:
                          findeElement?.discount > 0
                            ? findeElement?.discount / 4
                            : findeElement?.price / 4,
                        phone: true,
                      },
                    })
                  }
                >
                  <div>
                    <img src={dalymiIcon} alt="dalymiIcon" />
                    <p>
                      4 платежа по{" "}
                      {findeElement?.discount > 0
                        ? findeElement?.discount / 4
                        : findeElement?.price / 4}{" "}
                      ₽
                    </p>
                  </div>
                  <img
                    src={iconRightButtonDalymi}
                    alt="iconRightButtonDalymi"
                  />
                </div>
              ) : (
                <div
                  className="block-dalymi"
                  onClick={() =>
                    setModalOpen({
                      open: true,
                      img: DalymiImgPc,
                      element: {
                        priceDalymi:
                          findeElement?.discount > 0
                            ? findeElement?.discount / 4
                            : findeElement?.price / 4,
                        type: true,
                      },
                    })
                  }
                >
                  <div>
                    <img src={dalymiIcon} alt="dalymiIcon" />
                    <p>
                      4 платежа по{" "}
                      {findeElement?.discount > 0
                        ? findeElement?.discount / 4
                        : findeElement?.price / 4}{" "}
                      ₽
                    </p>
                  </div>
                  <img
                    src={iconRightButtonDalymi}
                    alt="iconRightButtonDalymi"
                  />
                </div>
              )}
              <div className="color-div-product">
                <h2>Другие цвета</h2>
                <div>
                  {parsColors.length &&
                    parsColors.map((el, i) => (
                      <Link
                        to={`/product/${el.name.split("|")[1]}`}
                        key={i}
                        style={{
                          borderColor:
                            localStorage.getItem("colorVibor") ==
                              el.name.split("|")[0] && "#000",
                        }}
                      >
                        <nav
                          onClick={() => {
                            localStorage.setItem(
                              "colorVibor",
                              el.name.split("|")[0],
                            );
                            setColorVibor(el.name.split("|")[0]);
                          }}
                          style={{
                            backgroundColor: el.name.startsWith("#")
                              ? el.name.split("|")[0]
                              : `#${el.name.split("|")[0]}`,
                            border:
                              el.name.split("|")[0] == "ffffff" ||
                              el.name.split("|")[0] == "#ffffff"
                                ? "1px solid #333"
                                : "0px",
                            borderRadius: "50%",
                          }}
                        ></nav>
                      </Link>
                    ))}
                </div>
              </div>
              <div className="size-div-product">
                <nav className="size-div-product-nav">
                  <h2>Размер</h2>
                  {useMediaQuery(`(max-width: ${widthLap})`) && (
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => setModalOpen({ open: true, img: popupPc })}
                    >
                      <img src={lineyka} alt="lineyka" /> Размерная сетка
                    </p>
                  )}
                </nav>
                <div>
                  {findeElement?.sizes &&
                    findeElement?.sizes
                      ?.sort(
                        (a, b) =>
                          sizeDef.indexOf(a.sizeValue) -
                          sizeDef.indexOf(b.sizeValue),
                      )
                      .map((el, i) => {
                        return (
                          <nav
                            className={el.quantity == 0 && `size-none`}
                            key={i}
                            onClick={() => {
                              el.quantity != 0 && setSizeVibor(el.sizeValue);
                            }}
                            style={{
                              background:
                                el.sizeValue == sizeVibor && "#408759",
                              color: el.sizeValue == sizeVibor && "#fff",
                              borderColor:
                                el.sizeValue == sizeVibor && "transparent",
                            }}
                          >
                            {el.sizeValue}
                          </nav>
                        );
                      })}
                  {/* {findeElement?.attributes && sizeDef.filter(item => !haveSize.includes(item)).map((size) =>
                (
                  <nav className='size-none' key={size}>
                    {size}
                  </nav>
                )


                )} */}
                  {/* {arrDataImgFind[id].content.size.map((size) => (
                <div key={size} onClick={() => setSizeVibor(size)} style={{ background: size == sizeVibor && '#408759', color: size == sizeVibor && '#fff', borderColor: size == sizeVibor && 'transparent' }} >
                  {size}
                </div>
              ))}
              {sizeDef.filter(item => !arrDataImgFind[id].content.size.includes(item)).map((size) => (
                <nav className='size-none' key={size}>
                  {size}
                </nav>
              ))} */}
                </div>
                {useMediaQuery(`(min-width: ${widthLap})`) && (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => setModalOpen({ open: true, img: popupPc })}
                  >
                    <img src={lineyka} alt="lineyka" /> Размерная сетка
                  </p>
                )}
              </div>
              <div className="button-div-product">
                <div>
                  {count ? (
                    <div className="add-to-basket button-product count-product">
                      <button
                        onClick={() => {
                          if (count > 1) {
                            return setCount(count - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{count}</span>
                      <button
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-basket button-product"
                      onClick={() => {
                        // addToBasket(findeElement.id)
                        // setIdProduct(findeElement.id)
                        setCount(1);
                      }}
                    >
                      Добавить в корзину
                    </button>
                  )}
                  {/* {useMediaQuery(`(max-width: ${widthLap})`) && count &&
                  <div className='add-to-basket button-product count-product'>
                    <button onClick={() => { if (count > 1) { return setCount(count - 1) } }}>-</button>
                    <span>{count}</span>
                    <button onClick={() => setCount(count + 1)}>+</button>
                  </div>
                } */}
                </div>
                <Link
                  onClick={() => {
                    setCount(1);
                    addToBasket(findeElement.id, count || true);
                  }}
                  to="/placing-an-order"
                  className="on-click-buy button-product"
                >
                  Купить в один клик
                </Link>
              </div>
              {/* {!useMediaQuery(`(max-width: ${widthLap})`) && count &&
              <div className='add-to-basket button-product count-product'>
                <button onClick={() => { if (count > 1) { return setCount(count - 1) } }}>-</button>
                <span>{count}</span>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
            } */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "20px ",
                }}
              >
                {/* <div className='dop-info-product'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px 0'
                }}
                onClick={toggleOpen}
              >
                <h2 style={{ margin: 0 }}>Уход</h2>
                <span style={{ fontSize: '24px' }}>
                  {isOpen ? (<PiMinus />) : (<PiPlus />)}
                </span>
              </div>

              {isOpen && (
                <div className='info-d-product' style={{ padding: '10px 0' }}>
                  <p>Ручная или машинная стирка до 30°C.</p>
                  <p>Стирать с аналогичными цветами.</p>
                  <p>Отжим до 600 оборотов.</p>
                  <p style={{ padding: '12px 0 0 0' }}>
                    *Изделия изготовленные по технологии garment dyed могут незначительно отличаться по цвету и узору варки.
                  </p>
                </div>
              )}
            </div> */}
                <div className="dop-info-product">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px 0",
                    }}
                    onClick={toggleOpenDiscrip}
                  >
                    <h2 style={{ margin: 0 }}>Описание</h2>
                    <span style={{ fontSize: "24px" }}>
                      {isOpenDiscrip ? <PiMinus /> : <PiPlus />}
                    </span>
                  </div>
                  <TransitionGroup style={{ height: "auto" }}>
                    {isOpenDiscrip && (
                      <CSSTransition timeout={300} classNames="fade">
                        <div
                          className="info-d-product"
                          style={{ padding: "10px 0" }}
                        >
                          <div
                            style={{ fontSize: "14px" }}
                            dangerouslySetInnerHTML={{
                              __html: findeElement?.fullDescription?.replace(/\n/g, "<br>"),
                            }}
                          />
                        </div>
                      </CSSTransition>
                    )}
                  </TransitionGroup>
                </div>
                <div className="dop-info-product">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px 0",
                    }}
                    onClick={() => setIsOpenDiscrip3(!isOpenDiscrip3)}
                  >
                    <h2 style={{ margin: 0 }}>Уход</h2>
                    <span style={{ fontSize: "24px" }}>
                      {isOpenDiscrip3 ? <PiMinus /> : <PiPlus />}
                    </span>
                  </div>
                  <TransitionGroup style={{ height: "auto" }}>
                    {isOpenDiscrip3 && (
                      <CSSTransition timeout={300} classNames="fade">
                        <div
                          className="info-d-product"
                          style={{ padding: "10px 0" }}
                        >
                          <div
                            style={{ fontSize: "14px" }}
                            dangerouslySetInnerHTML={{
                              __html: findeElement?.care?.replace(/\n/g, "<br>"),
                            }}
                          />
                        </div>
                      </CSSTransition>
                    )}
                  </TransitionGroup>
                </div>
                {/* care */}
                <div className="dop-info-product">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px 0",
                    }}
                    onClick={() => setIsOpenDiscrip2(!isOpenDiscrip2)}
                  >
                    <h2 style={{ margin: 0 }}>Доставка и возврат</h2>
                    <span style={{ fontSize: "24px" }}>
                      {isOpenDiscrip2 ? <PiMinus /> : <PiPlus />}
                    </span>
                  </div>
                  <TransitionGroup style={{ height: "auto" }}>
                    {isOpenDiscrip2 && (
                      <CSSTransition timeout={300} classNames="fade">
                        <div
                          className="info-d-product"
                          style={{ padding: "10px 0" }}
                        >
                          <div style={{ fontSize: 14 }}>
                            Стандартная доставка занимает 3-7 
                            рабочих дней. <br />
                            Экспресс-доставка возможна за дополнительную плату и
                            займет 1-3 рабочих дня. <br />
                            Вернуть или обменять товары
                            возможно в течение 14 дней с момента получения
                            заказа. <br />
                            Подробности о возвратах и обменах можно
                            найти на нашей странице "Возвраты и обмены"
                          </div>
                        </div>
                      </CSSTransition>
                    )}
                  </TransitionGroup>
                </div>
              </div>
              {/* item.attributes[0].text_prompt == 'true' */}
            </div>
          </div>
          <div>
            <div
              className="header headerBox2 headerBoxProbucts"
              style={{ marginTop: "60px" }}
            >
              <div className="headerCom1">
                <h2>Дополни свой образ</h2>
              </div>
              <div className="headerCom2"></div>
            </div>
            <Box2 arrDataImg={photos?.filter((_, i) => i < 4 )} />
            <SendEmail />
          </div>
        </>
      )}
      {modalOpen.open && (
        <ImageCom
          img={modalOpen.img}
          setImg={setModalOpen}
          element={modalOpen.element}
        />
      )}
    </>
  );
}
