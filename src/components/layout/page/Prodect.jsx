import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box2 from './pageElements/Box2';
import NewCollection from '../../../assets/icon/NewCollection.svg'
import lineyka from '../../../assets/icon/lineyka.svg'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// NewCollection.svg


import SendEmail from './pageElements/SendEmail';

import { usePhotoStore } from '../storeState/store';
import { PiMinus, PiPlus } from 'react-icons/pi';
import axios from 'axios';

export default function Prodect() {
  const { id } = useParams()
  const { findeElement, findeProduct } = usePhotoStore()
  const [colorVibor, setColorVibor] = useState('')
  const [sizeVibor, setSizeVibor] = useState('')
  const [isOpenDiscrip, setIsOpenDiscrip] = useState(false);
  // const sizeDef = ['XS', 'S', 'M', 'L', 'XL']
  const sizeDef = ['XXS', 'XS', 'S', 'L', 'XL', 'XXL']
  const [haveSize, setHaveSize] = useState([])
  const { photos, fetchPhotos } = usePhotoStore();


  useEffect(() => {
    fetchPhotos(4, 1);
  }, []);

  const toggleOpenDiscrip = () => {
    setIsOpenDiscrip(!isOpenDiscrip);
  }

  useEffect(() => {
    findeProduct(id)
  }, [])
  console.log(findeElement && findeElement);
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (findeElement?.attributes) {
      const arrSize = []
      findeElement?.attributes.find(atr => atr?.product_attribute_id == 2)?.attribute_values.map(el => {
        // console.log(el.name);
        arrSize.push(el.name)

      })
      // console.log(arrSize);
      setHaveSize(arrSize)
    }
  }, [findeElement?.attributes])
  console.log(photos);

  const addToBasket = async (id) => {
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');


    if (!token) {
      console.warn("No token available. Cannot fetch photos.");
      return;
    }
    try {
      const response = await axios.post(`https://elevenislands.ru/api/shopping_cart_items`, {
        shopping_cart_item: {
          product_id: id,
          product_attributes: [
            {
              value: colorVibor,
              id: 1
            },
            {
              value: sizeVibor,
              id: 2
            }
          ],
          customer_id: customerId
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      console.log({
        shopping_cart_item: {
          product_id: id,
          product_attributes: [
            {
              value: colorVibor,
              id: 1
            },
            {
              value: sizeVibor,
              id: 2
            }
          ],
          customer_id: customerId
        }
      });

    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }


  return (<>
    {findeElement && <>
      <div className='contectProductId'>
        <div className='contectProductId__img'>
          {/* {arrDataImgFind[id] && arrDataImgFind[id].content.image.map((prev, i) => (
            <img key={i} src={prev} alt="imgProduct" />
          ))} */}
          {findeElement.images && findeElement?.images.map((prev, i) => (
            <img key={i} src={prev.src} alt="imgProduct" />
          ))}
        </div>
        <div className='contectProductId__info'>
          {/* Prodect{id} */}
          <div className='header-div-product'>
            <img src={NewCollection} alt="NewCollection" />
            <div>
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
                <div key={i} style={{ borderColor: colorVibor == el.name && '#000' }}>
                  <nav onClick={() => setColorVibor(el.name)} style={{ background: el.name }}></nav>
                </div>
              ))}
            </div>


          </div>
          <div className='size-div-product'>
            <h1>Размер</h1>
            <div>
              {findeElement?.attributes && findeElement?.attributes.find(atr => atr?.product_attribute_id == 2)?.attribute_values.map((el, i) => {
                return (
                  <nav className={el.quantity == 0 && `size-none`} key={i} onClick={() => { el.quantity != 0 && setSizeVibor(el.name) }} style={{ background: el.name == sizeVibor && '#408759', color: el.name == sizeVibor && '#fff', borderColor: el.name == sizeVibor && 'transparent' }}>
                    {el.name}
                  </nav>
                )
              }
                // console.log(el.name)
              )}
              {findeElement?.attributes && sizeDef.filter(item => !haveSize.includes(item)).map((size) =>
              (
                <nav className='size-none' key={size}>
                  {size}
                </nav>
              )
                // console.log(findeElement?.attributes.find(atr => atr?.product_attribute_id == 2)?.attribute_values.includes(item.name))

              )}
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
            <p><img src={lineyka} alt="lineyka" /> Размерная сетка</p>
          </div>
          <div className='button-div-product'>
            <button className='add-to-basket' onClick={() => addToBasket(findeElement.id)}>Добавить в корзину</button>
            <button className='on-click-buy'>Купить в один клик</button>
          </div>
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
              {/* 
              {isOpenDiscrip && (
                <div className='info-d-product' style={{ padding: '10px 0' }}>
                  <div dangerouslySetInnerHTML={{ __html: findeElement?.full_description }} />
                </div>
              )} */}
              <TransitionGroup style={{ height: 'auto' }}>
                {isOpenDiscrip && (
                  <CSSTransition timeout={300} classNames="fade" >
                    <div className='info-d-product' style={{ padding: '10px 0' }}>
                      <div dangerouslySetInnerHTML={{ __html: findeElement?.full_description }} />
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
        <div className="header headerBox2">
          <div className='headerCom1'>
            <h1>Дополни свой образ</h1>
          </div>
          <div className='headerCom2'>
          </div>
        </div>
        <Box2 arrDataImg={photos.filter((_, i) => i < 12)} />
        <SendEmail />
      </div>
    </>}
  </>)
}
