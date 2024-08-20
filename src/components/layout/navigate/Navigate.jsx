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
// iconShoping.svg

export default function Navigate() {
  return (
    <div className='navigation'>
        <ul>
            <li>Йога</li>
            <li>Тенис</li>
            <li>Лайф стаил</li>
            <li>Каталог</li>
        </ul>
        <div className='logoNav'>
            <img src={VectorLogo} alt="VectorLogo" />    
            <div className='logoSm'>
                <img src={logoSmoleTit} alt="logoSmoleTit" />
                <img className='anim' src={logoSmole} alt="logoSmole" />
            </div>
            <img src={VectorLogo2} alt="VectorLogo2" />
        </div>

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
