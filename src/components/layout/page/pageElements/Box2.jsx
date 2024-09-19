import { useState } from 'react'
import { Link } from 'react-router-dom';
// import plus from '../../../../assets/icon/plus.svg'
import { FiPlus } from 'react-icons/fi';


export default function Box2({ arrDataImg }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // console.log(arrDataImg);

  const addToBasket = (id) => {

  }
  console.log(arrDataImg);
  

  return (
    <div className="box2">
      <div className="contentBox2">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {arrDataImg ? arrDataImg.map((item, i) => (<>
                <div className='aspect-h-1 mx-auto w-[305px] h-[501px] aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 relative'>
                  <Link
                    to={`/product/${item.id}`}
                    key={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className='hoverable-item'
                  >
                    <div className='itemImgProduct aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                      <div className='h-full w-full object-cover object-center group-hover:opacity-75'
                        style={{
                          background: `url('${hoveredIndex !== i ? item.images[0].src : item.images[1].src}') center / cover no-repeat`,
                        }}>
                      </div>
                    </div>

                    <div className='itemInfoProduct'>
                      <h1 className='productTitle'>{item.name}</h1>
                      <h1 className='productPrice'>{item.price} ₽ {item.attributes[0]?.text_prompt == 'true' && <><span className='sorcle'>•</span> New collection</>}</h1>
                    </div>

                  </Link>
                  <label className='add-product-btn'>
                    <input type="checkbox" id="checkbox2" />
                    <span className="custom-checkbox">
                      <FiPlus />
                    </span>
                  </label>
                </div></>)) : <h1>Loading...</h1>}
            </div>
          </div>
    </div>
  )
}
