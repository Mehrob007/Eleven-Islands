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
      const response = await apiClient.get(
        `/CollectionGallery/get-collection-gallery?collectionId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImages(response?.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetGallery();
  }, []);

  return (
    <div className="comGelaryAll">
      <div>
        <div className="comGelaryAll__box">
          <h2>{images?.nameCollection}</h2>
        </div>
        <div className="comGelaryAll__contentBox">
          {images?.photos &&
            images.photos.map((el, i) => (
              <div key={i} className="bg">
                <img src={el} alt={`img-${i}`} className="image-item" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
