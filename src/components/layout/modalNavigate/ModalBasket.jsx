import { useModalStore } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import ItemModalBasket from "./ItemModalBasket";
import { usePhotoStore } from '../storeState/store'

export default function ModalBasket() {
    const { photos } = usePhotoStore();
    const { setModalState } = useModalStore()

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
