import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box2 from './pageElements/Box2';
import NewCollection from '../../../assets/icon/NewCollection.svg'
import lineyka from '../../../assets/icon/lineyka.svg'
// NewCollection.svg


import image from '../../../assets/img/1.png';
import hover from '../../../assets/img/2.png';
import SendEmail from './pageElements/SendEmail';

import Photo2 from '../../../assets/img/Фото2.png';
import Photo4 from '../../../assets/img/Фото4.png';
import { usePhotoStore } from '../storeState/store';
import { PiMinus, PiPlus } from 'react-icons/pi';

const arrDataImgFind = [
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2, Photo2],
      overview: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      Care: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
      DeliveryAndReturn: {
        overviewh1: 'Эти шорты средней длины из плотного джерси имеют пояс на кулиске, передние и задний карманы. ',
        overviewul: ['- 100% хлопок, 9 унций.', '- Сделано в Португалии.', '- Эластичный пояс со шнурком.', '- Без усадки', '- Окрашенная одежда', '- Унисекс']
      },
    },
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  }
];

export default function Prodect() {
  const { id } = useParams()
  const { findeElement, findeProduct } = usePhotoStore()
  const [colorVibor, setColorVibor] = useState('#262626')
  const [sizeVibor, setSizeVibor] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const sizeDef = ['XS', 'S', 'M', 'L', 'XL']

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    findeProduct(id)
  }, [])
  // console.log(findeElement ? findeElement : 'loading...');
  // console.log(`Prodect${id}`);


  useEffect(() => {
    window.scroll(0, 0)
  }, [])



  return (<>
    {findeElement && <>
      <div className='contectProductId'>
        <div className='contectProductId__img'>
          {arrDataImgFind[id] && arrDataImgFind[id].content.image.map((prev, i) => (
            <img key={i} src={prev} alt="imgProduct" />
          ))}
        </div>
        <div className='contectProductId__info'>
          {/* Prodect{id} */}
          <div className='header-div-product'>
            <img src={NewCollection} alt="NewCollection" />
            <div>
              <h1>Emblem Gym Short</h1>
              <p>Спортивные шорты Emblem</p>
            </div>
            <h4>23.000 ₽</h4>
          </div>
          <div className="color-div-product">
            <h1>Другие цвета</h1>
            <div>
              <div style={{ borderColor: colorVibor == '#262626' && '#000' }}>
                <nav onClick={() => setColorVibor('#262626')} style={{ background: '#262626' }}></nav>
              </div>
              <div style={{ borderColor: colorVibor == '#D0D0D0' && '#000' }}>
                <nav onClick={() => setColorVibor('#D0D0D0')} style={{ background: '#D0D0D0' }}></nav>
              </div>
              <div style={{ borderColor: colorVibor == '#DED8CF' && '#000' }}>
                <nav onClick={() => setColorVibor('#DED8CF')} style={{ background: '#DED8CF' }}></nav>
              </div>
              <div style={{ borderColor: colorVibor == '#EAEAEA' && '#000' }}>
                <nav onClick={() => setColorVibor('#EAEAEA')} style={{ background: '#EAEAEA' }}></nav>
              </div>
              <div style={{ borderColor: colorVibor == '#CAB293' && '#000' }}>
                <nav onClick={() => setColorVibor('#CAB293')} style={{ background: '#CAB293' }}></nav>
              </div>
            </div>
            <p>
              Посадка: в стиле унисекс. Модель создана
              для свободного кроя и оверсайза - уменьшите
              размер, если предпочитаете более тесную посадку.
            </p>
          </div>
          <div className='size-div-product'>
            <h1>Размер</h1>
            <div>
              {arrDataImgFind[id].content.size.map((size) => (
                <div key={size} onClick={() => setSizeVibor(size)} style={{ background: size == sizeVibor && '#408759', color: size == sizeVibor && '#fff', borderColor: size == sizeVibor && 'transparent' }} >
                  {size}
                </div>
              ))}
              {sizeDef.filter(item => !arrDataImgFind[id].content.size.includes(item)).map((size) => (
                <nav className='size-none' key={size}>
                  {size}
                </nav>
              ))}
            </div>
            <p><img src={lineyka} alt="lineyka" /> Размерная сетка</p>
          </div>
          <div className='button-div-product'>
            <button className='add-to-basket'>Добавить в корзину</button>
            <button className='on-click-buy'>Купить в один клик</button>
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
          </div>
          {/* item.attributes[0].text_prompt == 'true' */}
        </div>
      </div>
      <div>
        <div className="header headerBox2">
          <div className='headerCom1'>
            <h1>Летняя коллекция</h1>
          </div>
          <div className='headerCom2'>
          </div>
        </div>
        {/* <Box2 arrDataImg={arrDataImg} />  */}
        <SendEmail />
      </div>
    </>}
  </>)
}
