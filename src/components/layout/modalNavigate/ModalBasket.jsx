import { useModalStore } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import ItemModalBasket from "./ItemModalBasket";
import { usePhotoStore } from '../storeState/store'
import axios from "axios";
import { useEffect } from "react";

export default function ModalBasket() {
    const { photos } = usePhotoStore();
    const { setModalState } = useModalStore()
    const getProductsBasket = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn("No token available. Cannot fetch photos.");
            return;
        }
        try {
            const response = await axios.post(`https://elevenislands.ru/api/shopping_cart_items/me`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }

    useEffect(() => {
        getProductsBasket()
    }, [])

    return (
        <div className="boxModalBasket">
            <div className="componentModal">
                <div className="componentModalHeader">
                    <h1>Корзина</h1>
                    <button onClick={() => setModalState(false)}><img src={CloasModal} alt="CloasModal" /></button>
                </div>
                <div className="productsBasket">
                    <ItemModalBasket products={photos} />
                </div>
                <div className="endPrice">
                    <h1>Итого:</h1>
                    <p>price</p>
                </div>
                <button className="place-an-order-btn">Оформить заказ</button>
            </div>
        </div>
    )
}
