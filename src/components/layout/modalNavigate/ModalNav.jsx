import { useModalNav, useModalSeatch, useModalStore } from "../storeState/modalBasket"

import iconClouseBlack from '../../../assets/icon/iconClouseBlack.svg';
import iconEiBlack from '../../../assets/icon/iconEiBlack.svg';
import iconSearchBlack from '../../../assets/icon/iconSearchBlack.svg';
import iconBusketBlack from '../../../assets/icon/iconBusketBlack.svg';

import { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ModalNav() {
    const { setModalStateNav } = useModalNav()
    const [isOpen, setIsOpen] = useState(false);
    const { setModalState } = useModalStore();
    const { setModalStateSeatch } = useModalSeatch();
    const [lengthCount, setLengthCount] = useState(0);
    useEffect(() => {
        const updateLengthCount = () => {
            const storedData = localStorage.getItem('dataGelary');
            const parsedData = storedData ? JSON.parse(storedData) : [];
            setLengthCount(parsedData.length);
        };


        updateLengthCount();


        window.addEventListener('storage', updateLengthCount);

        const intervalId = setInterval(updateLengthCount, 1000);

        return () => {
            window.removeEventListener('storage', updateLengthCount);
            clearInterval(intervalId);
        };
    }, []);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

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
    const widthLap = '1020px';
    const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);


    return (
        <div className="boxModalBasket">
            {!isLargeScreen ? <div className="componentModal">
                {/* <Navigate /> */}
                <div className="componentModalHeaderNav" >
                    <div className="navigation">
                        <button onClick={() => setModalStateNav(false)}><img src={iconClouseBlack} alt="iconClouseBlack" /></button>
                        <img src={iconEiBlack} alt="iconEiBlack" />
                        <div className='paramsNav'>
                            <div className='comParams'>
                                <img src={iconSearchBlack} onClick={() => {
                                    setModalStateNav(false)
                                    setModalStateSeatch(true)
                                }} alt="iconSearchBlack" />

                                {/* <img src={iconBusketBlack} onClick={() => {
                                    setModalStateNav(false)
                                    setModalState(true)
                                }} alt="iconShoping" /> */}
                                <div className='comParamsDiv' onClick={() => {
                                    setModalStateNav(false)
                                    setModalState(true)
                                }}>
                                    {lengthCount > 0 && <span>{lengthCount}</span>}
                                    <img src={iconBusketBlack} onClick={() => setModalState(true)} alt="iconBusketBlack" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dop-info-product' style={{ padding: '0 12px ', borderTop: 'none', alignContent: 'space-between', justifyContent: 'center', display: 'flex', flexDirection: 'column', minHeight: '36px', }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '0px 0'
                        }}
                        onClick={toggleOpen}
                    >
                        <Link style={{ margin: 0, padding: 0, alignItems: 'center', maxHeight: '36px' }} className="Cotalog-nav-phone">Каталог</Link>
                        <span style={{ fontSize: '24px' }}>
                            {isOpen ? (<RiArrowDownSLine />) : (<RiArrowDownSLine style={{ rotate: '-90deg' }} />)}
                        </span>
                    </div>
                    <TransitionGroup style={{ height: 'auto' }}>
                        {isOpen && (
                            <CSSTransition timeout={200} classNames="fade" >
                                <div className='info-d-product' style={{ padding: '15px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/all'>Смотреть все</Link>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/Топы'>Топы</Link>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/Футболки'>Футболки</Link>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/Леггинсы'>Леггинсы</Link>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/Толстовки'>Толстовки</Link>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/Спортивные брюки'>Спортивные брюки</Link>
                                    <Link onClick={() => setModalStateNav(false)} to='/products/Аксессуары'>Аксессуары</Link>
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>

                </div>
                <div className='dop-info-product' style={{
                    padding: '0px 12px ', minHeight: '36px', maxHeight: '36px', borderTop: 'none',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '0px 0'
                        }}
                    >
                        <Link onClick={() => setModalStateNav(false)} to='/gelary' >
                            <h2 style={{ margin: 0 }} className="Cotalog-nav-phone">LookBook</h2>
                        </Link>
                        {/* <span style={{ fontSize: '24px' }}>
                            {isOpen ? (<RiArrowDownSLine />) : (<RiArrowDownSLine style={{ rotate: '-90deg' }} />)}
                        </span> */}
                    </div>
                </div>
            </div>
                :
                <div className="componentModal">
                    {/* <Navigate /> */}
                    <div className="componentModalHeaderNav" >
                        <div className="navigation">
                            <button onClick={() => setModalStateNav(false)}><img src={iconClouseBlack} alt="iconClouseBlack" /></button>

                            <div className='paramsNav'>
                                <div className='comParams'>
                                    <img src={iconSearchBlack} onClick={() => {
                                        setModalStateNav(false)
                                        setModalStateSeatch(true)
                                    }} alt="iconSearchBlack" />
                                    <img src={iconBusketBlack} onClick={() => {
                                        setModalStateNav(false)
                                        setModalState(true)
                                    }} alt="iconShoping" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dop-info-product' style={{ padding: '0 12px ', borderTop: 'none', alignContent: 'space-between', justifyContent: 'center', display: 'flex', flexDirection: 'column', minHeight: '36px', }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: '0px 0'
                            }}
                            onClick={toggleOpen}
                        >
                            <Link style={{ margin: 0, padding: 0, alignItems: 'center', maxHeight: '36px' }} className="Cotalog-nav-phone">Каталог</Link>
                            <span style={{ fontSize: '24px' }}>
                                {isOpen ? (<RiArrowDownSLine />) : (<RiArrowDownSLine style={{ rotate: '-90deg' }} />)}
                            </span>
                        </div>
                        <TransitionGroup style={{ height: 'auto' }}>
                            {isOpen && (
                                <CSSTransition timeout={200} classNames="fade" >
                                    <div className='info-d-product' style={{ padding: '15px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/all'>Смотреть все</Link>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/Топы'>Топы</Link>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/Футболки'>Футболки</Link>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/Леггинсы'>Леггинсы</Link>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/Толстовки'>Толстовки</Link>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/Спортивные брюки'>Спортивные брюки</Link>
                                        <Link onClick={() => setModalStateNav(false)} to='/products/Аксессуары'>Аксессуары</Link>
                                    </div>
                                </CSSTransition>
                            )}
                        </TransitionGroup>

                    </div>
                    <div className='dop-info-product' style={{
                        padding: '0px 12px ', minHeight: '36px', maxHeight: '36px', borderTop: 'none',
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: '0px 0'
                            }}
                        >
                            <Link onClick={() => setModalStateNav(false)} to='/gelary' >
                                <h2 style={{ margin: 0 }} className="Cotalog-nav-phone">LookBook</h2>
                            </Link>
                            {/* <span style={{ fontSize: '24px' }}>
                            {isOpen ? (<RiArrowDownSLine />) : (<RiArrowDownSLine style={{ rotate: '-90deg' }} />)}
                        </span> */}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
