import { useModalNav } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import Navigate from "../navigate/Navigate";
import { useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ModalNav() {
    const { setModalStateNav } = useModalNav()
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="boxModalBasket">
            <div className="componentModal">
                {/* <Navigate /> */}
                <div className="componentModalHeader">
                    {/* <h1>Корзина</h1> */}
                    <div></div>
                    <button onClick={() => setModalStateNav(false)}><img src={CloasModal} alt="CloasModal" /></button>
                </div>
                <div className='dop-info-product' style={{ padding: '2px 12px ', minHeight: '44px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '10px 0'
                        }}
                        onClick={toggleOpen}
                    >
                        <h2 style={{ margin: 0 }} className="Cotalog-nav-phone">Каталог</h2>
                        <span style={{ fontSize: '24px' }}>
                            {isOpen ? (<RiArrowDownSLine />) : (<RiArrowDownSLine style={{ rotate: '-90deg' }} />)}
                        </span>
                    </div>

                    {isOpen && (
                        <div className='info-d-product' style={{ padding: '15px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <Link onClick={() => setModalStateNav(false)} to='/products/all'>Смотреть все</Link>
                            <Link onClick={() => setModalStateNav(false)} to='/products/tops'>Топы</Link>
                            <Link onClick={() => setModalStateNav(false)} to='/products/t-shirts'>Футболки</Link>
                            <Link onClick={() => setModalStateNav(false)} to='/products/leggings'>Леггинсы</Link>
                            <Link onClick={() => setModalStateNav(false)} to='/products/hoodies'>Толстовки</Link>
                            <Link onClick={() => setModalStateNav(false)} to='/products/sweatpants'>Спортивные брюки</Link>
                            <Link onClick={() => setModalStateNav(false)} to='/products/accessories'>Аксессуары</Link>
                        </div>
                    )}

                </div>
                <div className='dop-info-product' style={{ padding: '2px 12px ', minHeight: '44px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '10px 0'
                        }}
                    >
                        <Link onClick={() => setModalStateNav(false)} to='/' >
                            <h2 style={{ margin: 0 }} className="Cotalog-nav-phone">LookBook</h2>
                        </Link>
                        {/* <span style={{ fontSize: '24px' }}>
                            {isOpen ? (<RiArrowDownSLine />) : (<RiArrowDownSLine style={{ rotate: '-90deg' }} />)}
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
