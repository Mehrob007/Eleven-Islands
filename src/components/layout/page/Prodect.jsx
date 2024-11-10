import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Box2 from './pageElements/Box2';
import NewCollection from '../../../assets/icon/NewCollection.svg'
import lineyka from '../../../assets/icon/lineyka.svg'
import popupPc from '../../../assets/icon/popup-pc.svg'
// popupPc
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { dataGelaryStore } from '../../layout/storeState/modalBasket'
// NewCollection.svg


import SendEmail from './pageElements/SendEmail';

import { usePhotoStore } from '../storeState/store';
import { PiMinus, PiPlus } from 'react-icons/pi';
// import axios from 'axios';
import Slider from 'react-slick';
import ImageCom from './pageElements/ImageCom';
import { Helmet } from 'react-helmet';

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


export default function Prodect() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { findeElement, findeProduct } = usePhotoStore()
  const [count, setCount] = useState(0)
  const [colorVibor, setColorVibor] = useState(() => {
    return localStorage.getItem('colorVibor') || '';
  });

  // useEffect(() => {

  // }, [colorVibor]);
  const [isOpenDiscrip, setIsOpenDiscrip] = useState(true);
  const [isOpenDiscrip2, setIsOpenDiscrip2] = useState(false);
  const { dataGelary, setDataGelary } = dataGelaryStore()
  // const sizeDef = ['XXS', 'XS', 'S', 'L', 'XL', 'XXL']
  // const [idProduct, setIdProduct] = useState(0)
  const [haveSize, setHaveSize] = useState([])
  const { photos, fetchPhotos } = usePhotoStore();
  const [sizeVibor, setSizeVibor] = useState(haveSize[0])
  const [modalOpen, setModalOpen] = useState({
    open: false,
    img: null
  })




  useEffect(() => {
    if (haveSize.length > 0) {
      setSizeVibor(haveSize[0])
      setColorVibor(findeElement?.attributes.find(atr => atr.product_attribute_id == 1)?.attribute_values[0].name)
    }
  }, [haveSize, findeElement])

  const toggleOpenDiscrip = () => {
    setIsOpenDiscrip(!isOpenDiscrip);
  }

  useEffect(() => {
    findeProduct(id)
    const element = document.getElementById("topSity");
    // window.scroll(0, 0)
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - 100,
      behavior: 'smooth',
    });
  }, [id])

  useEffect(() => {
    if (findeElement?.attributes) {
      const arrSize = []
      findeElement?.attributes.find(atr => atr?.product_attribute_id == 2)?.attribute_values.map(el => {
        arrSize.push(el.name)
      })

      setHaveSize(arrSize)
    }
  }, [findeElement?.attributes])

  const addToBasket = () => {
    // const dataBasket = JSON.parse(localStorage.getItem("dataGelary"))
    const existingProduct = dataGelary.find(product => product.id === id);
    if (existingProduct) {
      const dataDeform = dataGelary.filter(el => el.id !== existingProduct.id)
      setDataGelary([...dataDeform, { ...existingProduct, count: count, countPrice: existingProduct.price * count }])
    } else {
      setDataGelary([
        ...dataGelary,
        {
          id: id,
          title: findeElement?.name,
          name: findeElement?.short_description,
          price: findeElement?.price,
          size: sizeVibor, count: count || 1,
          titleImg: findeElement.images[0],
          countPrice: findeElement?.price,
        }])
    }
  }

  useEffect(() => {
    addToBasket()
  }, [count])
  const widthLap = '1020px'
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
    image: findeElement?.images?.[0]?.src,
    siteName: 'ELEVEN ISLANDS',
    keywords: findeElement?.meta_descriptioт
  };

  useEffect(() => {
    if (findeElement?.attributes?.find(atr => atr?.product_attribute_id == 1)?.attribute_values?.filter(el => el?.name?.split("|")?.[1] === id)?.[0]?.name?.split("|")?.[0]) {
      localStorage.setItem('colorVibor', findeElement?.attributes?.find(atr => atr?.product_attribute_id == 1)?.attribute_values?.filter(el => el?.name?.split("|")?.[1] === id)?.[0]?.name?.split("|")?.[0]);
    }
  }, [findeElement])

  console.log(count);




  return (<>
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
    {findeElement &&
      <>
        <div className='contectProductId' id='topSity'>
          {useMediaQuery(`(min-width: ${widthLap})`) && <div className='contectProductId__img'>
            {/* {arrDataImgFind[id] && arrDataImgFind[id].content.image.map((prev, i) => (
            <img key={i} src={prev} alt="imgProduct" />
          ))} */}
            {findeElement.images &&
              findeElement?.images.map((prev, i) => (
                <img onClick={() => setModalOpen({
                  open: true,
                  img: prev.src
                })} key={i} src={prev.src} alt="imgProduct" />
              )
              )
            }
          </div>}
          {useMediaQuery(`(max-width: ${widthLap})`) &&
            <div className='contectProductId_phone'>
              <Slider {...settingsGelary}>
                {findeElement?.images?.map((prev, i) => {
                  console.log(prev.src)
                  return (
                    <img
                      // style={{
                      //   minHeight: '630px', 
                      //   maxHeight: '630px', 
                      //   objectFit: 'cover' 
                      // }}
                      className='img_phone_items'
                      key={i}
                      src={prev.src}
                      alt="imgProduct"
                    />
                  )
                }
                )}
              </Slider >
            </div>}
          <div className='contectProductId__info'>
            {/* Prodect{id} */}
            <div className='header-div-product'>
              <img src={NewCollection} alt="NewCollection" />
              <div style={{ width: '300px' }}>
                <h1>{findeElement?.name}</h1>
                <p>{findeElement?.short_description}</p>
              </div>
              <div className='price-product'>
                {findeElement.old_price != 0 && <h4 className='skitka'> <>{findeElement?.old_price} ₽</></h4>}
                <h4><span>{findeElement?.price}</span> ₽</h4>
              </div>
            </div>
            <div className="color-div-product">
              <h1>Другие цвета</h1>
              <div>
                {findeElement?.attributes && findeElement?.attributes.find(atr => atr.product_attribute_id == 1)?.attribute_values.map((el, i) => (
                  <Link to={`/product/${el.name.split("|")[1]}`} key={i} style={{ borderColor: localStorage.getItem('colorVibor') == el.name.split("|")[0] && '#000' }}>
                    <nav onClick={() => {
                      localStorage.setItem('colorVibor', el.name.split("|")[0]);
                      setColorVibor(el.name.split("|")[0])
                    }} style={{ background: el.name.split("|")[0] }}></nav>
                  </Link>
                ))}
              </div>


            </div>
            <div className='size-div-product'>
              <nav className='size-div-product-nav'>
                <h1>Размер</h1>
                {useMediaQuery(`(max-width: ${widthLap})`) && <p style={{ cursor: 'pointer' }} onClick={() => setModalOpen({ open: true, img: popupPc })}><img src={lineyka} alt="lineyka" /> Размерная сетка</p>}
              </nav>
              <div>
                {findeElement?.attributes && findeElement?.attributes.find(atr => atr?.product_attribute_id == 2)?.attribute_values.map((el, i) => {
                  return (
                    <nav className={el.quantity == 0 && `size-none`} key={i} onClick={() => { el.quantity != 0 && setSizeVibor(el.name) }} style={{ background: el.name == sizeVibor && '#408759', color: el.name == sizeVibor && '#fff', borderColor: el.name == sizeVibor && 'transparent' }}>
                      {el.name}
                    </nav>
                  )
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
              {useMediaQuery(`(min-width: ${widthLap})`) && <p style={{ cursor: 'pointer' }} onClick={() => setModalOpen({ open: true, img: popupPc })} ><img src={lineyka} alt="lineyka" /> Размерная сетка</p>}
            </div>
            <div className='button-div-product'>
              <div>
                {count ?
                  <div className='add-to-basket button-product count-product'>
                    <button onClick={() => {
                      if (count > 1) { return setCount(count - 1) }
                    }}>-</button>
                    <span>{count}</span>
                    <button onClick={() => {
                      setCount(count + 1)
                    }}>+</button>
                  </div> :
                  <button className='add-to-basket button-product' onClick={() => {
                    // addToBasket(findeElement.id)
                    // setIdProduct(findeElement.id)
                    setCount(1)
                  }
                  }>Добавить в корзину</button>}
                {/* {useMediaQuery(`(max-width: ${widthLap})`) && count &&
                  <div className='add-to-basket button-product count-product'>
                    <button onClick={() => { if (count > 1) { return setCount(count - 1) } }}>-</button>
                    <span>{count}</span>
                    <button onClick={() => setCount(count + 1)}>+</button>
                  </div>
                } */}
              </div>
              <Link onClick={() => {
                addToBasket(findeElement.id)
              }} to='/placing-an-order' className='on-click-buy button-product'>Купить в один клик</Link>

            </div>
            {/* {!useMediaQuery(`(max-width: ${widthLap})`) && count &&
              <div className='add-to-basket button-product count-product'>
                <button onClick={() => { if (count > 1) { return setCount(count - 1) } }}>-</button>
                <span>{count}</span>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
            } */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px ' }}>
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
              <div className='dop-info-product'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '10px 0'
                  }}
                  onClick={toggleOpenDiscrip}
                >
                  <h2 style={{ margin: 0 }}>Описание</h2>
                  <span style={{ fontSize: '24px' }}>
                    {isOpenDiscrip ? (<PiMinus />) : (<PiPlus />)}
                  </span>
                </div>
                <TransitionGroup style={{ height: 'auto' }}>
                  {isOpenDiscrip && (
                    <CSSTransition timeout={300} classNames="fade" >
                      <div className='info-d-product' style={{ padding: '10px 0' }}>
                        <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: findeElement?.full_description }} />
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </div>
              <div className='dop-info-product'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '10px 0'
                  }}
                  onClick={() => setIsOpenDiscrip2(!isOpenDiscrip2)}
                >
                  <h2 style={{ margin: 0 }}>Доставка и возврат</h2>
                  <span style={{ fontSize: '24px' }}>
                    {isOpenDiscrip2 ? (<PiMinus />) : (<PiPlus />)}
                  </span>
                </div>
                <TransitionGroup style={{ height: 'auto' }}>
                  {isOpenDiscrip2 && (
                    <CSSTransition timeout={300} classNames="fade" >
                      <div className='info-d-product' style={{ padding: '10px 0' }}>
                        <div style={{ fontSize: 14 }}>
                          Стандартная доставка занимает 3-7 рабочих дней. Экспресс-доставка возможна за
                          дополнительную плату и займет 1-3 рабочих дня.
                          Вернуть или обменять товары возможно в течение 14 дней с момента получения заказа.
                          Подробности о возвратах и обменах можно найти на нашей странице "Возвраты и обмены"
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
          <div className="header headerBox2 headerBoxProbucts" style={{ marginTop: '60px' }}>
            <div className='headerCom1'>
              <h1>Дополни свой образ</h1>
            </div>
            <div className='headerCom2'>
            </div>
          </div>
          <Box2 arrDataImg={photos?.filter((_, i) => i < 9 && i > 4)} />
          <SendEmail />
        </div>
      </>
    }
    {modalOpen.open &&
      <ImageCom img={modalOpen.img} setImg={setModalOpen} />}
  </>)
}
