import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getImageSrc} from "../../../../utils/getImageSrc.js";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default function Box2({ arrDataImg }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [parseProduct, setParseProduct] = useState([])
  // const navogate = useNavigate()

  // const addToBasket = async (id) => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     console.warn("No token available. Cannot fetch photos.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`https://elevenislands.ru/api/shopping_cart_items`, {
  //       product_id: id,
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error fetching photos:", error);
  //   }
  // }
  const widthLap = "1020px";

  useEffect(() => {
    if (arrDataImg) {
      function hexToBrightness(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return 0.299 * r + 0.587 * g + 0.114 * b;
      }
      const sortedData = arrDataImg?.map((group) => ({
        ...group,
        colors: group.colors.sort((a, b) => {
          const brightnessA = hexToBrightness(a.name.split("|")[0]);
          const brightnessB = hexToBrightness(b.name.split("|")[0]);
          return brightnessB - brightnessA; 
        }),
      }));
      console.log("sortedData", sortedData);
      setParseProduct(sortedData)
    }
  }, [arrDataImg]);

  return (
    <div className="box2">
      <div className="contentBox2">
        <h2 className="sr-only">Products</h2>
        <div
          className="grid grid-cols-2 gap-x-[10px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          style={{
            gap: useMediaQuery(`(max-width: ${widthLap})`) && "15px 5px",
          }}
        >
          {parseProduct ? (
            parseProduct?.map((item, i) => (
              <>
                <div
                  key={i}
                  className="itemBox2 aspect-h-1 mx-auto aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 relative "
                >
                  {/* <Link
                to={`/product/${item?.id}`}
                key={item?.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // onClick={() => navogate(0)}
                className='hoverable-item'
              > */}
                  <Link
                    to={`/product/${item?.id}`}
                    key={item?.id}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    // className='hoverable-item'
                  >
                    <img
                      className="itemImgProduct aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                      src={getImageSrc(hoveredIndex === i ? item?.images[1] : item?.images[0])}
                    >
                      {/* <div className='h-full w-full object-cover object-center group-hover:opacity-75'
                    
                  </div> */}
                    </img>
                  </Link>
                  <div className="color-product">
                    {/* <a key={i} style={{ borderColor: localStorage.getItem('colorVibor') == el.name.split("|")[0] && '#000' }}>
                  <nav onClick={() => {
                    localStorage.setItem('colorVibor', el.name.split("|")[0]);
                    setColorVibor(el.name.split("|")[0])
                    document.location.href = `/product/${el.name.split("|")[1]}`
                    }} style={{ background: el.name.split("|")[0] }}></nav>
                </a> */}

                    {item?.colors.map((el, i) => (
                      // <div
                      //   key={i}
                      //   style={{ borderColor: localStorage.getItem('colorVibor') == el.name.split("|")[0] && '#000' }}
                      // // style={{ background: el?.name?.split("|")[0] }}
                      // >
                      //   <nav onClick={() => {
                      //     localStorage.setItem('colorVibor', el.name.split("|")[0]);
                      //     document.location.href = `/product/${el.name.split("|")[1]}`
                      //   }} style={{ background: el.name.split("|")[0] }}></nav>
                      // </div>

                      <div
                        key={i}
                        style={{
                          border: "1px solid",
                          padding: "1px",
                          borderColor:
                            item.id == el.name.split("|")[1]
                              ? "#000"
                              : "transparent",
                        }}
                      >
                        <nav
                          onClick={() => {
                            // localStorage.setItem('colorVibor', el.name.split("|")[0]);
                            // setColorVibor(el.name.split("|")[0])
                            console.log(el.name);

                            document.location.href = `/product/${
                              el.name.split("|")[1]
                            }`;
                          }}
                          style={{
                            backgroundColor: el.name.startsWith("#")
                              ? el.name.split("|")[0]
                              : `#${el.name.split("|")[0]}`,
                            border:
                              el.name.split("|")[0] == "ffffff" ||
                              el.name.split("|")[0] == "#ffffff"
                                ? "1px solid #333"
                                : "0px",
                          }}
                        ></nav>
                      </div>
                    ))}
                  </div>

                  <div className="itemInfoProduct">
                    <h2 className="productTitle">{item?.shortDescription}</h2>
                    <div className="price__div price-product">
                      {item.discount != 0 && (
                        <h4 className="skitka" style={{ fontSize: "16px" }}>
                          {" "}
                          <>
                            {item?.price}{" "}
                            <span
                              style={{ fontFamily: "font-book, sans-serif" }}
                            >
                              ₽
                            </span>
                          </>
                        </h4>
                      )}
                      <h2 className="productPrice" style={{ fontSize: "16px" }}>
                        {item.discount != 0 ? item?.discount : item?.price}{" "}
                        <span style={{ fontFamily: "font-book, sans-serif" }}>
                          ₽
                        </span>
                      </h2>
                    </div>
                  </div>
                  {/* <Link to={`/product/${item?.id}`}>
                <label className='add-product-btn'>
                  <input type="checkbox" id="checkbox2" />
                  <span className="custom-checkbox">
                    <FiPlus />
                  </span>
                </label>
              </Link> */}

                  {/* </Link> */}
                </div>
              </>
            ))
          ) : (
            <h2>Загрузка...</h2>
          )}
          {/* {loading && <h2 style={{ textAlign: 'center' }}>loading...</h2>} */}
        </div>
      </div>
    </div>
  );
}
{
  /* {arrDataImg ? arrDataImg.map((item, i) => (<>
            <div className='itemBox2 aspect-h-1 mx-auto aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 relative'>
              <Link
                to={`/product/${item?.id}`}
                key={item?.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // onClick={() => navogate(0)}
                className='hoverable-item'
              >
                <Link
                  to={`/product/${item?.id}`}
                  key={item?.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  // className='hoverable-item'
                >
                  <div className='itemImgProduct aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                    <div className='h-full w-full object-cover object-center group-hover:opacity-75'
                      style={{
                        background: `url('${hoveredIndex !== i ? item?.images[0].src : item?.images[1].src}') center / cover no-repeat`,
                      }}>
                    </div>
                  </div>
                </Link>
                <div className='color-product'>
                  {item?.attributes.find(atr => atr.productAttributeId == 1)?.attributeValues.map((el, i) => (
                    <div key={item?.id} style={{ background: el.name }}>
                    </div>
                  ))}
                </div>

                <div className='itemInfoProduct'>
                  <h2 className='productTitle'>{item?.shortDescription}</h2>
                  <h2 className='productPrice'>{item?.price} ₽</h2>
                </div>

              </Link>
              <Link 
              to={`/product/${item?.id}`}
              >
              <label className='add-product-btn'>
                <input type="checkbox" id="checkbox2" />
                <span className="custom-checkbox">
                  <FiPlus />
                </span>
              </label></Link>
            </div></>)) : <h2>Loading...</h2>} */
}
