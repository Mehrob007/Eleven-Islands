import { useModalSeatch } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import { LuSearch } from "react-icons/lu";

export default function ModalBasket() {
    const { setModalStateSeatch } = useModalSeatch()

    return (
        <div className="boxModalBasket">
            <div className="componentModal">
                <div className="componentModalHeader">
                    <div>Поиск</div>
                    <button onClick={() => setModalStateSeatch(false)}><img src={CloasModal} alt="CloasModal" /></button>
                </div>
                <div className="searchBox">
                    <div className="iconImgSearch">
                        <LuSearch />
                    </div>
                    <input type="text" placeholder="Найти" />
                </div>
                {/*<div className="endPrice">
                    <h1>Итого:</h1>
                    <p>price</p>
                </div>
                <button className="place-an-order-btn">Оформить заказ</button> */}
            </div>
        </div>
    )
}
