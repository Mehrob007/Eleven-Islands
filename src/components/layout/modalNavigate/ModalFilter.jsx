import CloasModal from '../../../assets/icon/CloasModal.svg';
import { useEffect, useState } from "react";

export default function ModalFilter({
    modalStateFilter,
    setModalStateFilter,
    componentDiv
}) {
    const [resetValue, setResetValue] = useState(false);


    useEffect(() => {
        if (resetValue) setResetValue(false);
    }, [resetValue]);

    return (
        <div className="boxModalBasket" style={{ zIndex: modalStateFilter ? 1000000 : -999, opacity: modalStateFilter ? 1 : 0 }}>
            <div className="componentModalFilter">
                <div className="componentModalHeaderFilter">
                    <button onClick={() => setModalStateFilter(false)}><img src={CloasModal} alt="CloasModal" /></button>
                    <h1>Фильтр</h1>
                    <button onClick={() => setResetValue(true)}>Сбросить</button>
                </div>
                <div className='FilterBox'>
                    {componentDiv(resetValue)}
                </div>
            </div>
        </div>
    );
}
