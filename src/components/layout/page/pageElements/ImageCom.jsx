export default function ImageCom({ img, setImg, element }) {
  console.log(element);

  return (
    <div onClick={() => setImg({
      open: false,
      img: null
    })} className="ImageCom">
      {!element ?
        <img src={img} alt="img" />
        :
        <div>
          <img src={img} alt="img" />
          <div className="ImageComDiv">
            <div>
              {element?.priceDalymi} ₽
            </div>
            <div>
              {element?.priceDalymi} ₽
            </div>
            <div>
              {element?.priceDalymi} ₽
            </div>
            <div>
              {element?.priceDalymi} ₽
            </div>
          </div>
        </div>}
    </div>
  )
}
