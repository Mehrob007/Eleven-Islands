import React from 'react'
import Box2 from './pageElements/Box2'


import image from '../../../assets/img/1.png';
import hover from '../../../assets/img/2.png';
import SendEmail from './pageElements/SendEmail';



const arrDataImg = [
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
  },
  {
    img: image,
    hover: hover,
    title: 'Dri-Fit Advantage Shorts Women',
    price: "23.000",
    subTitle: 'New collection'
  }
];


export default function Products() {
  return (
    <>
      <div className='filterBar'>
        <h1>Каталог</h1>
        <div>
          <div>
            <select id="">
              <option value="*">Наличие</option>
            </select>
            <select id="">
              <option value="*">Тип</option>
            </select>
            <select id="">
              <option value="*">Цвет</option>
            </select>
            <select id="">
              <option value="*">Пол</option>
            </select>
            <select id="">
              <option value="*">Размер</option>
            </select>
          </div>
          <select id="">
            <option value="*">Цена</option>
          </select>
        </div>
      </div>
      <div className="contentProducts">
        <Box2 arrDataImg={arrDataImg} />
        <SendEmail />
        <Box2 arrDataImg={arrDataImg} />
      </div>
    </>
  )
}
