import VectorLogo from '../../../assets/icon/Vector.svg';
import VectorLogo2 from '../../../assets/icon/Vector2.svg';
import logoSmole from '../../../assets/icon/logoSmole.svg';
import logoSmoleTit from '../../../assets/icon/logoSmoleTit.svg';
import iconPerson from '../../../assets/icon/iconPerson.svg';
import iconSearch from '../../../assets/icon/iconSearch.svg';
import iconShoping from '../../../assets/icon/iconShoping.svg';
import EIPhone from '../../../assets/icon/EIPhone.svg';
import Burger from '../../../assets/icon/Burger.svg';
import { Link } from 'react-router-dom';
import ModalBasket from '../modalNavigate/modalBasket';
import ModalSearch from '../modalNavigate/ModalSearch';
import ModalNav from '../modalNavigate/ModalNav';
import { useModalSeatch, useModalStore, useModalNav } from '../storeState/modalBasket';
import { useEffect, useState } from 'react';

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

export default function Navigate() {
  const [lengthCount, setLengthCount] = useState(0);
  const { modalState, setModalState } = useModalStore();
  const { modalStateSeatch, setModalStateSeatch } = useModalSeatch();
  const { modalStateNav, setModalStateNav } = useModalNav();

  const handleNavClick = () => {
    setModalStateNav(true);
  };


  useEffect(() => {
    const updateLengthCount = () => {
      const storedData = localStorage.getItem('dataGelary');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      const countArr = parsedData?.map(el => el?.count)?.reduce((acc, current) => acc + current, 0)
      setLengthCount(countArr);
    };
    updateLengthCount();
    window.addEventListener('storage', updateLengthCount);

    const intervalId = setInterval(updateLengthCount, 1000);

    return () => {
      window.removeEventListener('storage', updateLengthCount);
      clearInterval(intervalId);
    };
  }, []);

  const widthLap = '1020px';
  const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);

  return (
    <div className='navigation'>
      {isLargeScreen ? (
        <ul>
          <li className='Catalog'>
            <Link to='/products/all'>Каталог</Link>
          </li>
          <Link to='/gelary'>LookBook</Link>
        </ul>
      ) : (
        <div onClick={() => handleNavClick()}>
          <img src={Burger} alt="Burger" />
        </div>
      )}

      <Link to='/' className='logoNav'>
        {isLargeScreen ? (
          <>
            <img src={VectorLogo} alt="VectorLogo" />
            <div className='logoSm'>
              <img src={logoSmoleTit} alt="logoSmoleTit" />
              <img className='anim' src={logoSmole} alt="logoSmole" />
            </div>
            <img src={VectorLogo2} alt="VectorLogo2" />
          </>
        ) : (
          <img src={EIPhone} alt='EIPhone' />
        )}
      </Link>

      <div className='paramsNav'>
        <div className='comParams'>
          <img src={iconSearch} onClick={() => setModalStateSeatch(true)} alt="iconSearch" />
          <div className='comParamsDiv' onClick={() => setModalState(true)}>
            {lengthCount > 0 && <span>{lengthCount}</span>}
            <img src={iconShoping} alt="iconShoping" />
          </div>
          {isLargeScreen && (
            <Link to='/login'>
              <img src={iconPerson} alt="iconPerson" />
            </Link>
          )}
        </div>
      </div>

      {modalState && <ModalBasket />}
      {modalStateSeatch && <ModalSearch />}
      {modalStateNav && <ModalNav />}
    </div>
  );
}
