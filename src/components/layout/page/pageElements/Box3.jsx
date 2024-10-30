import StrelkaRight from '../../../../assets/icon/StrelkaRight.svg';
import StrelkaLeft from '../../../../assets/icon/StrelkaLeft.svg';
import { useEffect, useRef, useState } from 'react';
import imgSlider from '../../../../assets/img/imgSlidr.png';
import Slider from 'react-slick';
// import { dataGelaryStore } from '../../storeState/modalBasket';
import { Link } from 'react-router-dom';


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


export default function Box3({ images, title }) {
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false)


    useEffect(() => {
        updateButtonState();
        const currentRef = imageListRef.current;

        if (currentRef) {
            currentRef.addEventListener('scroll', updateButtonState);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', updateButtonState);
            }
        };
    }, []);

    const updateButtonState = () => {
        if (imageListRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = imageListRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        }
    };
    const imageListRef = useRef(null);
    const scrollSlider = (direction) => {
        if (imageListRef.current) {
            const scrollAmount = imageListRef.current.clientWidth * direction;
            imageListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const settingsGelary = {
        className: "slider Gelary variable-width",
        // dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    };

    return (
        <div>
            <div className="box3">
                <div className="header">
                    <div className='headerCom1'>
                        <h1>{title}</h1>
                    </div>
                    <div className='headerCom2 buttonSlider'>
                        <button
                            id="prev-slide"
                            className={`slider-button material-symbols-rounded ${isAtStart ? 'offButtonSlider' : ''}`}
                            onClick={() => scrollSlider(-1)}
                        >
                            <img src={StrelkaLeft} alt="StrelkaLeft" />
                        </button>
                        <button
                            id="next-slide"
                            className={`slider-button material-symbols-rounded ${isAtEnd ? 'offButtonSlider' : ''}`}
                            onClick={() => scrollSlider(1)}
                        >
                            <img src={StrelkaRight} alt="StrelkaRight" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="contentBox3">
                {useMediaQuery(`(min-width: ${widthLap})`) ? <div className="containerBox3">
                    <div className="slider-wrapper">
                        <div className="image-list" ref={imageListRef}>
                            {images.map((el, i) => (
                                <div key={i} className="bg">
                                    <img src={el} alt={`img-${i}`} className="image-item" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div> :
                    <Slider {...settingsGelary}>
                        {images.map((el, i) => (
                            <div key={i} className="bg-phone">
                                <img src={el} alt={`img-${i}`} className="image-item" />
                            </div>
                        ))}
                    </Slider>
                }
            </div>
            <div className='allPhotoButton'>
                <Link to='/com-gelary-all/1' >
                    <h3 style={{ cursor: 'pointer' }}>Вся фотогалерея</h3>
                </Link>
            </div>
        </div>
    )
}
