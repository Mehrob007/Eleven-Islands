import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box2 from './pageElements/Box2';
import SendEmail from './pageElements/SendEmail';

import comRightColl from '../../../assets/icon/comRightColl.svg';
import elementBox1Logo from '../../../assets/icon/elementBox1Logo.svg';
import element2Box1Logo from '../../../assets/icon/element2Box1Logo.svg';
import StrelkaRight from '../../../assets/icon/StrelkaRight.svg';
import StrelkaLeft from '../../../assets/icon/StrelkaLeft.svg';

import imgSlider from '../../../assets/img/imgSlidr.png';
import imgBlog from '../../../assets/img/blogContent.png';

import { Helmet } from 'react-helmet';
import { usePhotoStore } from '../storeState/store';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


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
    title: ' энергетическим напиткам'
  },
  {
    image: imgBlog,
    title: ' энергетическим напиткам'
  },
  {
    image: imgBlog,
    title: ' энергетическим напиткам'
  }
]

const ogData = {
  title: 'ELEVEN ISLANDS',
  description: 'Eleven Islands — онлайн-магазин модной одежды, предлагающий уникальные коллекции для мужчин и женщин. Откройте для себя стильные и качественные наряды, вдохновленные красотой природы и современными трендами. Совершайте покупки онлайн и подчеркивайте свою индивидуальность с Eleven Islands.',
  url: 'https://eleven-islands.netlify.app',
  image: 'https://cotton-road.com/images/detskie-futbolki/37-temno-zelenaya.jpg',
  siteName: 'ELEVEN ISLANDS',
  keywords: 'модная одежда, стильная одежда, онлайн-магазин одежды, женская мода, мужская мода, эксклюзивная одежда, дизайнерская одежда, Eleven Islands, тренды моды, покупки онлайн, аксессуары, стиль'
};


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




export default function MainPage() {
  const widthLap = '1020px'

  const imageListRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { photos, currentPage, fetching, fetchPhotos } = usePhotoStore();

  console.log(photos);


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
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };
  useEffect(() => {
    fetchPhotos(4, currentPage);
  }, []);
  useEffect(() => {
    if (fetching) {
      fetchPhotos(4, currentPage);
    }
  }, [fetching]);

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

  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };
  const settingsGelary = {
    className: "slider Gelary variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };
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
        {useMediaQuery(`(min-width: ${widthLap})`) &&
          <div className='headerCom2'>
            <Link to='products/all'>Смотреть все</Link>
          </div>
        }
      </div>
      <Box2 arrDataImg={photos.filter((prev) => prev.show_on_home_page)} />

      {useMediaQuery(`(max-width: ${widthLap})`) &&
        <div className="header headerBox2 " style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='headerCom2'>
            <Link to='products/all' style={{ margin: '0 auto' }}>Смотреть все</Link>
          </div>
        </div>
      }
      {useMediaQuery(`(min-width: ${widthLap})`) &&
        <SendEmail />
      }
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
          {useMediaQuery(`(min-width: ${widthLap})`) ? <div className="containerBox3">
            <div className="slider-wrapper">
              <div className="image-list" ref={imageListRef}>
                {images.map((el, i) => (
                  <div key={i} className="bg">
                    <img src={el} alt={`img-${i}`} className="image-item" />
                  </div>
                ))}
              </div>
            </div>
          </div> :

            <Slider {...settingsGelary}>
              {images.map((el, i) => (
                <div key={i} className="bg-phone">
                  <img src={el} alt={`img-${i}`} className="image-item" />
                </div>
              ))}
            </Slider >


          }
        </div>
        {useMediaQuery(`(min-width: ${widthLap})`) &&
        <div className='allPhotoButton'>
          <h3>Вся фотогалерея</h3>
        </div>}
      </div>
      {useMediaQuery(`(max-width: ${widthLap})`) &&
        <SendEmail />
      }
      <div className="box4">
        <div className="header">
          <div className='headerCom1'>
            <h1>Блог</h1>
          </div>
          {useMediaQuery(`(min-width: ${widthLap})`) &&
            <div className='headerCom2'>
              <p>Смотреть все</p>
            </div>
          }
        </div>
        {useMediaQuery(`(min-width: ${widthLap})`) ?
          <div className="contentBox4">
            {BlogData.map((prevState, i) => (
              <Link key={i} className="box4ContentCom">
                <span><img src={prevState.image} alt="imageBlog" /></span>
                <p>{prevState.title}</p>
              </Link>
            ))}
          </div >
          :
          <Slider {...settings} className="contentBox4">
            {BlogData.map((prevState, i) => (
              <Link key={i} className="box4ContentCom">
                <span><img src={prevState.image} alt="imageBlog" /></span>
                <p>{prevState.title}</p>
              </Link>
            ))}
          </Slider >
        }
        {/* {useMediaQuery(`(max-width: ${widthLap})`) &&
          <div className='navigate-btn-slider'>
            <div>

            </div>
          </div> 
          } */}

      </div>
    </>
  );
}
