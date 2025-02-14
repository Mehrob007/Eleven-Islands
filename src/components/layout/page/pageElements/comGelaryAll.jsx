import { useEffect, useState } from "react";
import apiClient from "../../../../utils/api";
import { useParams } from "react-router-dom";
// import { dataGelaryStore } from '../../storeState/modalBasket'

export default function comGelaryAll() {
  const { id } = useParams();
  const [images, setImages] = useState(null);
  const token = localStorage.getItem("token");

  const GetGallery = async () => {
    try {
      const response = await apiClient.get(`/galleries?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response?.data?.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetGallery();
  }, []);

  console.log("====================================");
  console.log("images", images);
  console.log("====================================");

  return (
    <div className="comGelaryAll">
      <div>
        <div className="comGelaryAll__box">
          <h2>{images?.name}</h2>
        </div>
        <div className="comGelaryAll__contentBox">
          {images?.images &&
            images.images.map((el, i) => (
              <div key={i} className="bg">
                <img
                  src={import.meta.env.VITE_ENV_URL_FILE + `gallery?gallery=${el?.source}`}
                  alt={`img-${i}`}
                  className="image-item"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
