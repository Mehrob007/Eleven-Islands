export default function ImageCom({ img, setImg }) {
  return (
    <div onClick={() => setImg({
        open: false,
        img: null
    })} className="ImageCom">
        <img src={img} alt="img" />
    </div>
  )
}
