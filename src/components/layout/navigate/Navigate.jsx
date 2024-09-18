import VectorLogo from '../../../assets/icon/Vector.svg'
import VectorLogo2 from '../../../assets/icon/Vector2.svg'
import logoSmole from '../../../assets/icon/logoSmole.svg'
// logoSmole.svg
import logoSmoleTit from '../../../assets/icon/logoSmoleTit.svg'
// logoSmoleTit.svg
import iconPerson from '../../../assets/icon/iconPerson.svg'
// iconPerson.svg
import iconSearch from '../../../assets/icon/iconSearch.svg'
// iconSearch.svg
import iconShoping from '../../../assets/icon/iconShoping.svg'
import { Link } from 'react-router-dom'
import ModalBasket from '../modalBasket/modalBasket'
import ModalSearch from '../modalBasket/ModalSearch'
// iconShoping.svg

import { useModalSeatch, useModalStore } from '../storeState/modalBasket'
// import { useState } from 'react'


export default function Navigate() {
  const { modalState, setModalState } = useModalStore()
  const { modalStateSeatch, setModalStateSeatch } = useModalSeatch()
  // useModalSeatch
  // const [activeSearch, setActiveSearch] = useState(false)
  console.log(modalStateSeatch);
  

  return (
    <div className='navigation' >
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
      <Link to='/' className='logoNav'>
        <img src={VectorLogo} alt="VectorLogo" />
        <div className='logoSm'>
          <img src={logoSmoleTit} alt="logoSmoleTit" />
          <img className='anim' src={logoSmole} alt="logoSmole" />
        </div>
        <img src={VectorLogo2} alt="VectorLogo2" />
      </Link>

      <div className='paramsNav'>
        <div className='comParams'>
          {/* <input type="text" className={`search-product ${activeSearch ? 'active-search' : ''}`} placeholder='поиск...'/> */}
          <img src={iconSearch} onClick={() => setModalStateSeatch(true)} alt="iconSearch" />
          <img src={iconShoping} onClick={() => setModalState(true)} alt="iconShoping" />
          <Link to='/login'>
            <img src={iconPerson} alt="iconPerson" />
          </Link>
        </div>
      </div>  
      {modalState && <ModalBasket />}
      {modalStateSeatch && <ModalSearch />}
    </div>
  )
}
