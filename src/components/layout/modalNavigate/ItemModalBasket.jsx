import { useState } from 'react'
import img from '../../../assets/img/1.png'
import minus from '../../../assets/icon/minus.svg'
import plus from '../../../assets/icon/plus.svg'
import { RiDeleteBin6Fill } from 'react-icons/ri'

export default function ItemModalBasket({ products }) {
    const [count, setCount] = useState(0)
    return (
        <div className="itemModalBasket">
            <div className='modalBasketImg'>
                <img src={img} alt="" />
            </div>
            <div className='modalBasketInfo'>
                <div className='info'>
                    <h1>
                        Dri-Fit Advantage
                        Shorts Women
                    </h1>
                    <p>Цена: </p>
                    <p>Размер: </p>
                </div>
                <div className='count'>
                    <button onClick={() => setCount((el) => el > 0 ? el -= 1 : el)}><img src={minus} alt='minus' /></button>
                    <p>{count}</p>
                    <button onClick={() => setCount((el) => el += 1)}><img src={plus} alt='plus' /></button>
                </div>
            </div>
            <RiDeleteBin6Fill className='delete-button-modal-basket' />
        </div>
    )
}
