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
// iconShoping.svg

import { useModalStore } from '../storeState/modalBasket'
import { useState } from 'react'


export default function Navigate() {
  const { modalState, setModalState } = useModalStore()
  const [activeSearch, setActiveSearch] = useState(false)


  return (
    <div className='navigation'>
      <ul>
        <li className='Catalog'>
          <Link>Каталог</Link>
          <ol>
            <li><Link to='/products'>Смотреть все</Link></li>
            <li><Link to='/products/tops'>Топы</Link></li>
            <li><Link to='/products/t-shirts'>Футболки</Link></li>
            <li><Link to='/products/leggings'>Леггинсы</Link></li>
            <li><Link to='/products/hoodies'>Толстовки</Link></li>
            <li><Link to='/products/sweatpants'>Спортивные брюки</Link></li>
            <li><Link to='/products/accessories'>Аксессуары</Link></li>
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
          <input type="text" className={`search-product ${activeSearch ? 'active-search' : ''}`} placeholder='поиск...'/>
          <img src={iconSearch} onClick={() => setActiveSearch(!activeSearch)} alt="iconSearch" />
          <img src={iconShoping} onClick={() => setModalState(true)} alt="iconShoping" />
          <Link to='/login'>
            <img src={iconPerson} alt="iconPerson" />
          </Link>
        </div>
      </div>  
      {modalState && <ModalBasket />}
    </div>
  )
}
