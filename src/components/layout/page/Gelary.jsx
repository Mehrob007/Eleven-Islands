import comRightColl from "../../../assets/icon/comRightColl.svg";
import elementBox1Logo from "../../../assets/icon/elementBox1Logo.svg";
import element2Box1Logo from "../../../assets/icon/element2Box1Logo.svg";
import Box3 from "./pageElements/Box3";
import { useEffect, useState } from "react";
import apiClient from "../../../utils/api";

export default function Gelary() {
  const token = localStorage.getItem("token");
  const [images, setImage] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [bunnertTitle, setTitleBunner] = useState();
  const [bunnerVideoDesk, setVideoDeskBunner] = useState();

  const GetGallery = async () => {
    try {
      const response = await apiClient.get(
        `/CollectionGallery/get-gallery-collection?limit=${50}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFetching(false);
      setPage(page + 1);
      setImage([...images, ...response?.data?.galleries[0]]);
    } catch (error) {
      console.error(error);
    }
  };
  const GetBunner = async () => {
    try {
      const response = await apiClient.get(`/Banner/get-all-banners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideoDeskBunner(response.data[response.data.length - 1].source);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Чистим обработчик при размонтировании
  }, []);

  useEffect(() => {
    if (fetching) {
      GetGallery();
    }
  }, [fetching]);

  useEffect(() => {
    GetBunner();
    GetBunnerTitle()
  }, []);
  console.log(images);

  return (
    <div className="GelaryCom">
      {/* <div className="box1">
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
              <h2>New collection</h2>
              <h2>ESSENTIAL</h2>
              {/* <img src={comRightColl} alt="comRightColl" /> 
            </div>
          </div>
        </div>
      </div> */}
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
      <br />
      <br />
      <br />
      {images?.length
        ? images?.map((el, i) => (
            <div key={i}>
              <Box3 images={el?.photos} title={el?.nameCollection} id={el?.id} />
            </div>
          ))
        : "Загрузка..."}
      {/* <br /><br /><br />
            <Box3 images={images.filter((_, i) => i < 20 && i > 10)} title={'Фотогалерея'} />
            <br /><br /><br />
            <Box3 images={images.filter((_, i) => i < 30 && i > 20)} title={'Фотогалерея'} />
            <br /><br /><br />
            <Box3 images={images.filter((_, i) => i < 40 && i > 30)} title={'Фотогалерея'} /> */}
    </div>
  );
}
