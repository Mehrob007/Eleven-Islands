import { dataBasketItems, useModalStore } from "../storeState/modalBasket";
import CloasModal from "../../../assets/icon/CloasModal.svg";
import ItemModalBasket from "./ItemModalBasket";
// import { usePhotoStore } from '../storeState/store'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dataGelaryStore } from "../../layout/storeState/modalBasket";
import iconBasketGrey from "../../../assets/icon/iconBasketGrey.svg";

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

export default function ModalBasket() {
  // const { photos } = usePhotoStore();
  const { dataBasket } = dataBasketItems();
  const { setModalState } = useModalStore();
  const [price, setPrice] = useState(0);
  const { setDataGelary } = dataGelaryStore();

  // const getProductsBasket = async () => {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //         console.warn("No token available. Cannot fetch photos.");
  //         return;
  //     }
  //     setLoading(true)
  //     try {
  //         const response = await axios.get(`https://elevenislands.ru/api/shopping_cart_items/me`, null, {
  //             headers: {
  //                 Authorization: `Bearer ${token}`
  //             }
  //         });
  //         setDataBasket(response.data);
  //     } catch (error) {
  //         console.error("Error fetching photos:", error);
  //     }
  //     finally{
  //         setLoading(false)
  //     }
  // }
  const widthLap = "1020px";
  const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);

  const DeleteProductsBasket = async () => {
    setDataGelary([]);
  };

  const dataGelary = JSON.parse(localStorage.getItem("dataGelary"));
  useEffect(() => {
    if (dataGelary.length) {
      setPrice(
        dataGelary?.reduce((total, item) => total + item?.price, 0),
      );
    
    }
    // getProductsBasket()
    // setDataBasket(photos)
  }, [dataGelary]);

  console.log("====================================");
  console.log();
  console.log("====================================");

  return (
    <div
      id="cart_overlay"
      onClick={(e) => {
        if (e.target.id == "cart_overlay") {
          setModalState(false);
        }
      }}
      className="boxModalBasket"
    >
      {JSON?.parse?.(localStorage?.getItem?.("dataGelary"))?.length > 0 ? (
        <div onClick={() => console.log(123)} className="componentModal">
          {!isLargeScreen ? (
            <div className="componentModalHeader">
              <button onClick={() => setModalState(false)}>
                <img src={CloasModal} alt="CloasModal" />
              </button>
              <h2>Корзина</h2>
              <button onClick={DeleteProductsBasket}>Очистить</button>
            </div>
          ) : (
            <div className="componentModalHeader">
              <button onClick={DeleteProductsBasket}>Очистить</button>
              <h2>Корзина</h2>
              <button onClick={() => setModalState(false)}>
                <img src={CloasModal} alt="CloasModal" />
              </button>
            </div>
          )}

          <div className="productsBasket">
            <ItemModalBasket setPrice={setPrice} />
          </div>
          <div className="endPrice">
            <h2>Итого:</h2>
            <p>{price} руб</p>
          </div>
          {price > 0 && (
            <Link
              to={"/placing-an-order"}
              className="place-an-order-btn"
              onClick={() => {
                setModalState(false);
                localStorage.setItem("price", price);
              }}
            >
              <button>Оформить заказ</button>
            </Link>
          )}
        </div>
      ) : (
        <div className="componentModal ">
          {!isLargeScreen ? (
            <div className="componentModalHeader">
              <button onClick={() => setModalState(false)}>
                <img src={CloasModal} alt="CloasModal" />
              </button>
              <h2>Корзина</h2>
              {/* <button onClick={DeleteProductsBasket}>Очистить</button> */}
            </div>
          ) : (
            <div className="componentModalHeader">
              {/* <button onClick={DeleteProductsBasket}>Очистить</button> */}
              <h2>Корзина</h2>
              <button onClick={() => setModalState(false)}>
                <img src={CloasModal} alt="CloasModal" />
              </button>
            </div>
          )}
          <div className="dontProductBusket">
            <h2>Тут пока что пусто</h2>
            <img src={iconBasketGrey} alt="iconShoping" />
          </div>
        </div>
      )}
    </div>
  );
}
