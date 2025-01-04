import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box2 from "./pageElements/Box2";
import SendEmail from "./pageElements/SendEmail";

import comRightColl from "../../../assets/icon/comRightColl.svg";
import elementBox1Logo from "../../../assets/icon/elementBox1Logo.svg";
import element2Box1Logo from "../../../assets/icon/element2Box1Logo.svg";

// import VideoMobileLocal from "../../../assets/video/VideoMobile.mp4";
import imgBlog from "../../../assets/img/blogContent.png";

// import { Helmet } from 'react-helmet';
import { usePhotoStore } from "../storeState/store";
import Slider from "react-slick";
import Box3 from "./pageElements/Box3";

import apiClient from "../../../utils/api";

const BlogData = [
  {
    image: imgBlog,
    title: " энергетическим напиткам",
  },
  {
    image: imgBlog,
    title: " энергетическим напиткам",
  },
  {
    image: imgBlog,
    title: " энергетическим напиткам",
  },
];

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

export default function MainPage() {
  const widthLap = "1020px";
  const isDesktop = useMediaQuery(`(min-width: ${widthLap})`);
  const { photos, fetchPhotos } = usePhotoStore();
  const token = localStorage.getItem("token");
  const [bunnertTitle, setTitleBunner] = useState();
  const [bunnerVideoDesk, setVideoDeskBunner] = useState();
  const [images, setImage] = useState({});

  const settings = {
    className: "slider variable-width slider-blog",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const GetBunner = async () => {
    if (isDesktop) {
      try {
        const response = await apiClient.get(`/Api/get-all-banners`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideoDeskBunner(response.data[response.data.length - 1].source);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    } else {
      try {
        const response = await apiClient.get(`/Api/get-all-banner-mobile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideoDeskBunner(response.data[response.data.length - 1].source);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }

    // await setVideoPc(VideoPc);
    // await setVideoMobile(VideoMobileLocal);
  };
  const GetBunnerTitle = async () => {
    try {
      const response = await apiClient.get(
        `/CollectionProduct/get-all-collection-banner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTitleBunner(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const GetGallery = async () => {
    try {
      const response = await apiClient.get(
        `/CollectionGallery/get-gallery-collection?limit=${1}&page=${1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImage(response?.data?.galleries[0][0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    // GetBunner();
    GetBunnerTitle();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (photos?.length > 0) {
        console.log("products have !!:" + photos.length + ";");
      } else {
        fetchPhotos({
          page: 1,
          limit: 50,
        });
        console.log("====================================");
        console.log("fetching !!");
        console.log("====================================");
      }
    }, 5000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [photos]);
  // useEffect(() => {
  //   if (fetching) {
  //     fetchPhotos({ limit: 50, page: 1 });
  //   }
  // }, [fetching]);

  useEffect(() => {
    GetBunner();
    GetGallery();
  }, []);
  console.log("====================================");
  console.log(photos);
  console.log("images", images);
  console.log("====================================");

  return (
    <>
      <div className="box1">
        {bunnerVideoDesk?.length && (
          <video autoPlay loop muted playsInline>
            <source src={bunnerVideoDesk} type="video/mp4" />
            {/* Ваш браузер не поддерживает видео. */}
          </video>
        )}

        <div className="box1newCollection">
          <div className="newCollection">
            <div className="comLeftColl">
              <img
                src={element2Box1Logo}
                alt="element2Box1Logo"
                className="element2Box1Logo"
              />
              <img
                src={elementBox1Logo}
                className="elementBox1Logo"
                alt="elementBox1Logo"
              />
            </div>
            <div className="comRightColl">
              {/* https://backendeleven.ru/CollectionProduct/get-all-collection-banner */}
              <h2>New collection</h2>
              <h2>{bunnertTitle?.[bunnertTitle.length - 1]?.name}</h2>
              {/* <img src={comRightColl} alt="comRightColl" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="header headerBox2 ">
        <div className="headerCom1">
          <h2>{bunnertTitle?.[bunnertTitle.length - 1]?.name}</h2>
        </div>
        {useMediaQuery(`(min-width: ${widthLap})`) ? (
          <div className="headerCom2">
            <Link to="products/all">Смотреть все</Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <Box2 arrDataImg={photos.filter((prev, i) => prev.popular && i < 32)} />

      {useMediaQuery(`(max-width: ${widthLap})`) ? (
        <div
          className="header headerBox2 "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="headerCom2">
            <Link to="products/all" style={{ margin: "0 auto" }}>
              Смотреть все
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      {useMediaQuery(`(min-width: ${widthLap}`) ? <SendEmail /> : ""}
      {images?.photos?.length && (
        <Box3
          images={images?.photos}
          title={images?.nameCollection}
          id={images?.id}
        />
      )}
      {/* <div>
        <div className="box3">
          <div className="header">
            <div className='headerCom1'>
              <h2>Фотогалерея</h2>
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
      {useMediaQuery(`(max-width: ${widthLap})`) ? <SendEmail /> : ""}
      {/* <div className="box4">
        <div className="header">
          <div className='headerCom1'>
            <h2>Блог</h2>
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
