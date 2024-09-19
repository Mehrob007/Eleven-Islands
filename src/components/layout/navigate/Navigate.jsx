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

const widthLap = '1020px';

export default function Navigate() {
  const { modalState, setModalState } = useModalStore();
  const { modalStateSeatch, setModalStateSeatch } = useModalSeatch();
  const { modalStateNav, setModalStateNav } = useModalNav();

  const handleNavClick = () => {
    setModalStateNav(true);
  };

  console.log(modalStateNav);
  

  const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);

  return (
    <div className='navigation'>
      {isLargeScreen ? (
        <ul>
          <li className='Catalog'>
            <Link>Каталог</Link>
            <ol>
              <ul>
                <li><Link to='/products/all'>Смотреть все</Link></li>
                <li><Link to='/products/tops'>Топы</Link></li>
                <li><Link to='/products/t-shirts'>Футболки</Link></li>
                <li><Link to='/products/leggings'>Леггинсы</Link></li>
                <li><Link to='/products/hoodies'>Толстовки</Link></li>
                <li><Link to='/products/sweatpants'>Спортивные брюки</Link></li>
                <li><Link to='/products/accessories'>Аксессуары</Link></li>
              </ul>
            </ol>
          </li>
          <Link to=''>LookBook</Link>
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
          <img src={iconShoping} onClick={() => setModalState(true)} alt="iconShoping" />
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
