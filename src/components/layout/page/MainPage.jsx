import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box2 from './pageElements/Box2';
import SendEmail from './pageElements/SendEmail';

import comRightColl from '../../../assets/icon/comRightColl.svg';
import elementBox1Logo from '../../../assets/icon/elementBox1Logo.svg';
import element2Box1Logo from '../../../assets/icon/element2Box1Logo.svg';
import StrelkaRight from '../../../assets/icon/StrelkaRight.svg';
import StrelkaLeft from '../../../assets/icon/StrelkaLeft.svg';

import image from '../../../assets/img/1.png';
import hover from '../../../assets/img/2.png';

import imgSlider from '../../../assets/img/imgSlidr.png';
import imgBlog from '../../../assets/img/blogContent.png';

import Photo2 from '../../../assets/img/Фото2.png';
import Photo4 from '../../../assets/img/Фото4.png';


const arrDataImg = [
  {
    content: {
      image: [Photo2, Photo2, Photo4, Photo4],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [Photo2, Photo2],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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
      image: [''],
      subTitle: 'Спортивные шорты Emblem',
      size: ['XS', 'S', 'M', 'L'],
      color: [''],
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


const images = [
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
  imgSlider,
];
const BlogData = [
  {
    image: imgBlog,
    title: '4 альтернативы натуральным энергетическим напиткам'
  },
  {
    image: imgBlog,
    title: '4 альтернативы натуральным энергетическим напиткам'
  },
  {
    image: imgBlog,
    title: '4 альтернативы натуральным энергетическим напиткам'
  }
]



export default function MainPage() {

  const imageListRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollSlider = (direction) => {
    if (imageListRef.current) {
      const scrollAmount = imageListRef.current.clientWidth * direction;
      imageListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const updateButtonState = () => {
    if (imageListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = imageListRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 100);
    }
  };

  useEffect(() => {
    updateButtonState();
    const currentRef = imageListRef.current;

    if (currentRef) {
      currentRef.addEventListener('scroll', updateButtonState);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', updateButtonState);
      }
    };
  }, []);


  return (
    <>
      <div className='box1'>
        <div className="box1newCollection">
          <div className='newCollection'>
            <div className="comLeftColl">
              <img src={element2Box1Logo} alt="element2Box1Logo" className='element2Box1Logo' />
              <img src={elementBox1Logo} className='elementBox1Logo' alt="elementBox1Logo" />
            </div>
            <div className="comRightColl">
              <img src={comRightColl} alt="comRightColl" />
            </div>
          </div>
        </div>
      </div>
      <div className="header headerBox2 ">
        <div className='headerCom1'>
          <h1>Летняя коллекция</h1>
        </div>
        <div className='headerCom2'>
          <Link to='products'>Смотреть все</Link>
        </div>
      </div>
      <Box2 arrDataImg={arrDataImg} />
      <SendEmail />
      <div>
        <div className="box3">
          <div className="header">
            <div className='headerCom1'>
              <h1>Фотогалерея</h1>
            </div>
            <div className='headerCom2 buttonSlider'>
              <button
                id="prev-slide"
                className={`slider-button material-symbols-rounded ${isAtStart ? 'offButtonSlider' : ''}`}
                onClick={() => scrollSlider(-1)}
              >
                <img src={StrelkaLeft} alt="StrelkaLeft" />
              </button>
              <button
                id="next-slide"
                className={`slider-button material-symbols-rounded ${isAtEnd ? 'offButtonSlider' : ''}`}
                onClick={() => scrollSlider(1)}
              >
                <img src={StrelkaRight} alt="StrelkaRight" />
              </button>
            </div>
          </div>
        </div>
        <div className="contentBox3">
          <div className="containerBox3">
            <div className="slider-wrapper">
              <div className="image-list" ref={imageListRef}>
                {images.map((el, i) => (
                  <div key={i} className="bg">
                    <img src={el} alt={`img-${i}`} className="image-item" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='allPhotoButton'>
          <h3>Вся фотогалерея</h3>
        </div>
      </div>
      <div className="box4">
        <div className="header">
          <div className='headerCom1'>
            <h1>Блог</h1>
          </div>
          <div className='headerCom2'>
            <p>Смотреть все</p>
          </div>
        </div>
        <div className="contentBox4">
          {BlogData.map((prevState, i) => (
            <Link key={i} className="box4ContentCom">
              <span><img src={prevState.image} alt="imageBlog" /></span>
              <p>{prevState.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
