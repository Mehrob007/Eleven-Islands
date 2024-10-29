import { useModalFilter } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import CustomSelect from "../page/pageElements/CustomSelect";
import { useEffect, useState } from "react";

const sizes = [
    { label: 'all', value: 'all' },
    { label: 'XS', value: '0' },
    { label: 'S', value: '1' },
    { label: 'M', value: '2' },
    { label: 'L', value: '3' },
    { label: 'XL', value: '4' }
];
const typeSelect = [
    { label: 'Все типы', value: 'all' },
    { label: 'Топы', value: 'tops' },
    { label: 'Футболки', value: 't-shirts' },
    { label: 'Леггинсы', value: 'leggings' },
    { label: 'Толстовки', value: 'hoodies' },
    { label: 'Спортивные брюки', value: 'sweatpants' },
    { label: 'Аксессуары', value: 'accessories' },
];

export default function ModalFilter() {
    const { setModalStateFilter } = useModalFilter()
    const [resetValue, setResetValue] = useState(false)

    useEffect(() => {
        if (resetValue) {
            setResetValue(false)
        }
    }, [resetValue])


    return (
        <div className="boxModalBasket">
            <div className="componentModalFilter">
                <div className="componentModalHeaderFilter">
                    {/* <h1>Корзина</h1> */}
                    <button onClick={() => setModalStateFilter(false)}><img src={CloasModal} alt="CloasModal" /></button>
                    <h1>Фильтр</h1>
                    <button onClick={() => {
                        setResetValue(true)
                    }}>Сбросить</button>
                </div>
                <div className="FilterBox">
                    <CustomSelect resetValue={resetValue} phone={true} title='Размер' value={sizes} />
                    <CustomSelect resetValue={resetValue} phone={true} title='Тип продукции' value={typeSelect} />
                    {/* <CustomSelect resetValue={resetValue} phone={true} title='Цвет' colors={''} /> */}
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
