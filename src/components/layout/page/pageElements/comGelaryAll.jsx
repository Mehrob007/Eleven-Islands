import { useEffect, useState } from 'react';
// import { dataGelaryStore } from '../../storeState/modalBasket'
// import imgSlider from '../../../../assets/img/imgSlidr.png';
import IMG_1233 from "../../../../assets/img/Сжатые фото/IMG_1233.jpg"
import IMG_1243 from "../../../../assets/img/Сжатые фото/IMG_1243.jpg"
import IMG_1248 from "../../../../assets/img/Сжатые фото/IMG_1248.jpg"
import IMG_1249 from "../../../../assets/img/Сжатые фото/IMG_1249.jpg"
import IMG_1258 from "../../../../assets/img/Сжатые фото/IMG_1258.jpg"
import IMG_1259 from "../../../../assets/img/Сжатые фото/IMG_1259.jpg"
import IMG_1261 from "../../../../assets/img/Сжатые фото/IMG_1261.jpg"
import IMG_1262 from "../../../../assets/img/Сжатые фото/IMG_1262.jpg"
import IMG_1270 from "../../../../assets/img/Сжатые фото/IMG_1270.jpg"
import IMG_1273 from "../../../../assets/img/Сжатые фото/IMG_1273.jpg"
import IMG_1274 from "../../../../assets/img/Сжатые фото/IMG_1274.jpg"
import IMG_1278 from "../../../../assets/img/Сжатые фото/IMG_1278.jpg"
import IMG_1280 from "../../../../assets/img/Сжатые фото/IMG_1280.jpg"
import IMG_1281 from "../../../../assets/img/Сжатые фото/IMG_1281.jpg"
import IMG_1282 from "../../../../assets/img/Сжатые фото/IMG_1282.jpg"
import IMG_1285 from "../../../../assets/img/Сжатые фото/IMG_1285.jpg"
import IMG_1286 from "../../../../assets/img/Сжатые фото/IMG_1286.jpg"
import IMG_1295 from "../../../../assets/img/Сжатые фото/IMG_1295.jpg"
import IMG_1297 from "../../../../assets/img/Сжатые фото/IMG_1297.jpg"
import IMG_1300 from "../../../../assets/img/Сжатые фото/IMG_1300.jpg"
import IMG_1302 from "../../../../assets/img/Сжатые фото/IMG_1302.jpg"
import IMG_1303 from "../../../../assets/img/Сжатые фото/IMG_1303.jpg"
import IMG_1309 from "../../../../assets/img/Сжатые фото/IMG_1309.jpg"
import IMG_1313 from "../../../../assets/img/Сжатые фото/IMG_1313.jpg"
import IMG_1366 from "../../../../assets/img/Сжатые фото/IMG_1366.jpg"
import IMG_1373 from "../../../../assets/img/Сжатые фото/IMG_1373.jpg"
import IMG_1385 from "../../../../assets/img/Сжатые фото/IMG_1385.jpg"
import IMG_1387 from "../../../../assets/img/Сжатые фото/IMG_1387.jpg"
import IMG_1388 from "../../../../assets/img/Сжатые фото/IMG_1388.jpg"
import IMG_1390 from "../../../../assets/img/Сжатые фото/IMG_1390.jpg"
import IMG_1418 from "../../../../assets/img/Сжатые фото/IMG_1418.jpg"
import IMG_1420 from "../../../../assets/img/Сжатые фото/IMG_1420.jpg"
import IMG_1437 from "../../../../assets/img/Сжатые фото/IMG_1437.jpg"
import IMG_1455 from "../../../../assets/img/Сжатые фото/IMG_1455.jpg"
import IMG_1468 from "../../../../assets/img/Сжатые фото/IMG_1468.jpg"
import IMG_1471 from "../../../../assets/img/Сжатые фото/IMG_1471.jpg"
import IMG_1480 from "../../../../assets/img/Сжатые фото/IMG_1480.jpg"
import IMG_1490 from "../../../../assets/img/Сжатые фото/IMG_1490.jpg"
import IMG_1501 from "../../../../assets/img/Сжатые фото/IMG_1501.jpg"
import IMG_1504 from "../../../../assets/img/Сжатые фото/IMG_1504.jpg"
import IMG_1512 from "../../../../assets/img/Сжатые фото/IMG_1512.jpg"
import IMG_1522 from "../../../../assets/img/Сжатые фото/IMG_1522.jpg"
import IMG_1529 from "../../../../assets/img/Сжатые фото/IMG_1529.jpg"
import IMG_1535 from "../../../../assets/img/Сжатые фото/IMG_1535.jpg"
import IMG_1555 from "../../../../assets/img/Сжатые фото/IMG_1555.jpg"
import IMG_1556 from "../../../../assets/img/Сжатые фото/IMG_1556.jpg"
import IMG_1560 from "../../../../assets/img/Сжатые фото/IMG_1560.jpg"
import IMG_1563 from "../../../../assets/img/Сжатые фото/IMG_1563.jpg"
import IMG_1566 from "../../../../assets/img/Сжатые фото/IMG_1566.jpg"
import IMG_1586 from "../../../../assets/img/Сжатые фото/IMG_1586.jpg"


    const images = [
        IMG_1233,
        IMG_1243,
        IMG_1248,
        IMG_1249,
        IMG_1258,
        IMG_1259,
        IMG_1261,
        IMG_1262,
        IMG_1270,
        IMG_1273,
        IMG_1274,
        IMG_1278,
        IMG_1280,
        IMG_1281,
        IMG_1282,
        IMG_1285,
        IMG_1286,
        IMG_1295,
        IMG_1297,
        IMG_1300,
        IMG_1302,
        IMG_1303,
        IMG_1309,
        IMG_1313,
        IMG_1366,
        IMG_1373,
        IMG_1385,
        IMG_1387,
        IMG_1388,
        IMG_1390,
        IMG_1418,
        IMG_1420,
        IMG_1437,
        IMG_1455,
        IMG_1468,
        IMG_1471,
        IMG_1480,
        IMG_1490,
        IMG_1501,
        IMG_1504,
        IMG_1512,
        IMG_1522,
        IMG_1529,
        IMG_1535,
        IMG_1555,
        IMG_1556,
        IMG_1560,
        IMG_1563,
        IMG_1566,
        IMG_1586,
    ];

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};
const widthLap = '1020px'
const dataGelary = {
    title: 'Essential collection',
    data: images
}
export default function comGelaryAll() {
    // const { dataGelary } = dataGelaryStore()
    return (
        <div className='comGelaryAll'>
            <div>
                <div className="comGelaryAll__box">
                    <h1 >{dataGelary.title}</h1>
                </div>
                <div className="comGelaryAll__contentBox">
                    {dataGelary.data.map((el, i) => (
                        <div key={i} className="bg">
                            <img src={el} alt={`img-${i}`} className="image-item" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}