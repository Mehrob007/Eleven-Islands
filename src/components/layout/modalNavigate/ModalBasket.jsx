import { dataBasketItems, useModalStore } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import ItemModalBasket from "./ItemModalBasket";
// import { usePhotoStore } from '../storeState/store'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dataGelaryStore } from '../../layout/storeState/modalBasket'

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

export default function ModalBasket() {
    // const { photos } = usePhotoStore();
    const { dataBasket } = dataBasketItems()
    const { setModalState } = useModalStore()
    const [price, setPrice] = useState(0);
    const { setDataGelary } = dataGelaryStore()
  
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
    const widthLap = '1020px';
    const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);

    const DeleteProductsBasket = async () => {
        setDataGelary([])
    }

    useEffect(() => {
        // getProductsBasket()
        // setDataBasket(photos)
    }, [])

    return (
        <div className="boxModalBasket">
            <div className="componentModal">
                {!isLargeScreen ?
                    <div className="componentModalHeader">
                        <button onClick={() => setModalState(false)}><img src={CloasModal} alt="CloasModal" /></button>
                        <h1>Корзина</h1>
                        <button onClick={DeleteProductsBasket}>Очистить</button>
                    </div>
                    :
                    <div className="componentModalHeader">
                        <button onClick={DeleteProductsBasket}>Очистить</button>
                        <h1>Корзина</h1>
                        <button onClick={() => setModalState(false)}><img src={CloasModal} alt="CloasModal" /></button>
                    </div>}

                <div className="productsBasket">
                    <ItemModalBasket setPrice={setPrice} />
                </div>
                <div className="endPrice">
                    <h1>Итого:</h1>
                    <p>{price} руб</p>
                </div>
                {price > 0 &&
                    <Link to={'/placing-an-order'} className="place-an-order-btn" onClick={() => {
                        setModalState(false)
                        localStorage.setItem('price', price)
                    }} ><button >Оформить заказ</button></Link>}
            </div>
        </div>
    )
}
