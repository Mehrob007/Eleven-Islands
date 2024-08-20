import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Box2({ arrDataImg }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className="box2">
        <div className="contentBox2">
          {arrDataImg ? arrDataImg.map((item, i) => (
            <Link
              to={`/product/${i}`}
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className='hoverable-item'
            >
              <div className='itemImgProduct'>
                <div
                  style={{
                    background: `url('${hoveredIndex === i ? item.hover : item.img}') center / cover no-repeat`,
                  }}></div>
              </div>
              <div className='itemInfoProduct'>
                <h1 className='productTitle'>{item.title}</h1>
                <h1 className='productPrice'>{item.price} ₽ {item.subTitle && <><span className='sorcle'>•</span> {item.subTitle}</>}</h1>
              </div>
            </Link>
          )) : <h1>Loading...</h1>}
        </div>
      </div>
  )
}
