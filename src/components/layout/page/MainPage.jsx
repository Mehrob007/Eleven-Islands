import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box2 from './pageElements/Box2';
import SendEmail from './pageElements/SendEmail';

import comRightColl from '../../../assets/icon/comRightColl.svg';
import elementBox1Logo from '../../../assets/icon/elementBox1Logo.svg';
import element2Box1Logo from '../../../assets/icon/element2Box1Logo.svg';


import imgSlider from '../../../assets/img/imgSlidr.png';
import VideoPc from '../../../assets/video/VideoPc.mp4';
import VideoMobile from '../../../assets/video/VideoMobile.mp4';
import imgBlog from '../../../assets/img/blogContent.png';

// import { Helmet } from 'react-helmet';
import { usePhotoStore } from '../storeState/store';
import Slider from 'react-slick';
import Box3 from './pageElements/Box3';

// import "slick-carousel/slick/slick-theme.css";

import IMG_1233 from "../../../assets/img/Сжатые фото/IMG_1233.jpg"
import IMG_1243 from "../../../assets/img/Сжатые фото/IMG_1243.jpg"
import IMG_1248 from "../../../assets/img/Сжатые фото/IMG_1248.jpg"
import IMG_1249 from "../../../assets/img/Сжатые фото/IMG_1249.jpg"
import IMG_1258 from "../../../assets/img/Сжатые фото/IMG_1258.jpg"
import IMG_1259 from "../../../assets/img/Сжатые фото/IMG_1259.jpg"
import IMG_1261 from "../../../assets/img/Сжатые фото/IMG_1261.jpg"
import IMG_1262 from "../../../assets/img/Сжатые фото/IMG_1262.jpg"
import IMG_1270 from "../../../assets/img/Сжатые фото/IMG_1270.jpg"
import IMG_1273 from "../../../assets/img/Сжатые фото/IMG_1273.jpg"
import IMG_1274 from "../../../assets/img/Сжатые фото/IMG_1274.jpg"
import IMG_1278 from "../../../assets/img/Сжатые фото/IMG_1278.jpg"
import IMG_1280 from "../../../assets/img/Сжатые фото/IMG_1280.jpg"
import IMG_1281 from "../../../assets/img/Сжатые фото/IMG_1281.jpg"
import IMG_1282 from "../../../assets/img/Сжатые фото/IMG_1282.jpg"
import IMG_1285 from "../../../assets/img/Сжатые фото/IMG_1285.jpg"
import IMG_1286 from "../../../assets/img/Сжатые фото/IMG_1286.jpg"
import IMG_1295 from "../../../assets/img/Сжатые фото/IMG_1295.jpg"
import IMG_1297 from "../../../assets/img/Сжатые фото/IMG_1297.jpg"
import IMG_1300 from "../../../assets/img/Сжатые фото/IMG_1300.jpg"
import IMG_1302 from "../../../assets/img/Сжатые фото/IMG_1302.jpg"
import IMG_1303 from "../../../assets/img/Сжатые фото/IMG_1303.jpg"
import IMG_1309 from "../../../assets/img/Сжатые фото/IMG_1309.jpg"
import IMG_1313 from "../../../assets/img/Сжатые фото/IMG_1313.jpg"
import IMG_1366 from "../../../assets/img/Сжатые фото/IMG_1366.jpg"
import IMG_1373 from "../../../assets/img/Сжатые фото/IMG_1373.jpg"
import IMG_1385 from "../../../assets/img/Сжатые фото/IMG_1385.jpg"
import IMG_1387 from "../../../assets/img/Сжатые фото/IMG_1387.jpg"
import IMG_1388 from "../../../assets/img/Сжатые фото/IMG_1388.jpg"
import IMG_1390 from "../../../assets/img/Сжатые фото/IMG_1390.jpg"
import IMG_1418 from "../../../assets/img/Сжатые фото/IMG_1418.jpg"
import IMG_1420 from "../../../assets/img/Сжатые фото/IMG_1420.jpg"
import IMG_1437 from "../../../assets/img/Сжатые фото/IMG_1437.jpg"
import IMG_1455 from "../../../assets/img/Сжатые фото/IMG_1455.jpg"
import IMG_1468 from "../../../assets/img/Сжатые фото/IMG_1468.jpg"
import IMG_1471 from "../../../assets/img/Сжатые фото/IMG_1471.jpg"
import IMG_1480 from "../../../assets/img/Сжатые фото/IMG_1480.jpg"
import IMG_1490 from "../../../assets/img/Сжатые фото/IMG_1490.jpg"
import IMG_1501 from "../../../assets/img/Сжатые фото/IMG_1501.jpg"
import IMG_1504 from "../../../assets/img/Сжатые фото/IMG_1504.jpg"
import IMG_1512 from "../../../assets/img/Сжатые фото/IMG_1512.jpg"
import IMG_1522 from "../../../assets/img/Сжатые фото/IMG_1522.jpg"
import IMG_1529 from "../../../assets/img/Сжатые фото/IMG_1529.jpg"
import IMG_1535 from "../../../assets/img/Сжатые фото/IMG_1535.jpg"
import IMG_1555 from "../../../assets/img/Сжатые фото/IMG_1555.jpg"
import IMG_1556 from "../../../assets/img/Сжатые фото/IMG_1556.jpg"
import IMG_1560 from "../../../assets/img/Сжатые фото/IMG_1560.jpg"
import IMG_1563 from "../../../assets/img/Сжатые фото/IMG_1563.jpg"
import IMG_1566 from "../../../assets/img/Сжатые фото/IMG_1566.jpg"
import IMG_1586 from "../../../assets/img/Сжатые фото/IMG_1586.jpg"

const images = [
  IMG_1233,
  IMG_1243,
  IMG_1248,
  IMG_1249,
  IMG_1258,
  IMG_1259,
  IMG_1261,
  IMG_1262,
  IMG_1270,
  IMG_1273,
  IMG_1274,
  IMG_1278,
  IMG_1280,
  IMG_1281,
  IMG_1282,
  IMG_1285,
  IMG_1286,
  IMG_1295,
  IMG_1297,
  IMG_1300,
  IMG_1302,
  IMG_1303,
  IMG_1309,
  IMG_1313,
  IMG_1366,
  IMG_1373,
  IMG_1385,
  IMG_1387,
  IMG_1388,
  IMG_1390,
  IMG_1418,
  IMG_1420,
  IMG_1437,
  IMG_1455,
  IMG_1468,
  IMG_1471,
  IMG_1480,
  IMG_1490,
  IMG_1501,
  IMG_1504,
  IMG_1512,
  IMG_1522,
  IMG_1529,
  IMG_1535,
  IMG_1555,
  IMG_1556,
  IMG_1560,
  IMG_1563,
  IMG_1566,
  IMG_1586,
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
  const { photos, fetchPhotos } = usePhotoStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (photos?.length > 0) {
        console.log("products have !!:" + photos.length + ";");
      } else {
        fetchPhotos({
          page: 1,
          limit: 50,
        });
        console.log('====================================');
        console.log("fetching !!");
        console.log('====================================');
      }
    }, 5000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [photos]);





  const settings = {
    className: "slider variable-width slider-blog",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  // useEffect(() => {
  //   if (fetching) {
  //     fetchPhotos({ limit: 50, page: 1 });
  //   }
  // }, [fetching]);

  return (
    <>
      {/* VideoPc
  VideoMobile */}
      <div className='box1'>

        <video autoPlay loop muted playsInline>
          <source src={useMediaQuery(`(min-width: ${widthLap})`) ? VideoPc : VideoMobile} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>

        <div className="box1newCollection">
          <div className='newCollection'>
            <div className="comLeftColl">
              <img src={element2Box1Logo} alt="element2Box1Logo" className='element2Box1Logo' />
              <img src={elementBox1Logo} className='elementBox1Logo' alt="elementBox1Logo" />
            </div>

            <div className="comRightColl">
              <h1>New collection</h1>
              <h1>ESSENTIAL</h1>
              {/* <img src={comRightColl} alt="comRightColl" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="header headerBox2 ">
        <div className='headerCom1'>
          <h1>Essential collection</h1>
        </div>
        {useMediaQuery(`(min-width: ${widthLap})`) &&
          <div className='headerCom2'>
            <Link to='products/all'>Смотреть все</Link>
          </div>
        }
      </div>
      <Box2 arrDataImg={photos.filter((prev, i) => prev.show_on_home_page && i < 32)} />

      {useMediaQuery(`(max-width: ${widthLap})`) &&
        <div className="header headerBox2 " style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='headerCom2'>
            <Link to='products/all' style={{ margin: '0 auto' }}>Смотреть все</Link>
          </div>
        </div>
      }
      {useMediaQuery(`(min-width: ${widthLap})`) &&
        <SendEmail />}
      <Box3 images={images.filter((_, i) => i < 10)} title={'Фотогалерея'} />
      {/* <div>
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
        
          <div style={{ paddingTop: useMediaQuery(`(min-width: ${widthLap})`) && '20px' }} className='allPhotoButton'>
            <h3>Вся фотогалерея</h3>
          </div>
      </div> */}
      {useMediaQuery(`(max-width: ${widthLap})`) &&
        <SendEmail />
      }
      {/* <div className="box4">
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
      </div> */}
    </>
  );
}
