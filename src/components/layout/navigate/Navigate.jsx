import React from 'react'
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
// iconShoping.svg

export default function Navigate() {
  return (
    <div className='navigation'>
        <ul>
            <Link to=''>Йога</Link>
            <Link to=''>Тенис</Link>
            <Link to=''>Лайф стаил</Link>
            <Link to='/products'>Каталог</Link>
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
              <img src={iconSearch} alt="iconSearch" />
              <img src={iconShoping} alt="iconShoping" />
              <img src={iconPerson} alt="iconPerson" />
            </div>
        </div>
    </div>
  )
}
