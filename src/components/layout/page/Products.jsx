import { useEffect, useState } from 'react';
import Box2 from './pageElements/Box2';
import SendEmail from './pageElements/SendEmail';
import { usePhotoStore } from '../storeState/store';
import CustomSelect from './pageElements/CustomSelect';
import iconFilter from '../../../assets/icon/iconFilter.svg'
import { useModalFilter, useModalReset } from '../storeState/modalBasket';
import ModalFilter from '../modalNavigate/ModalFilter';
import ModalReset from '../modalNavigate/ModalReset';
import apiClient from '../../../utils/api';

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

export default function Products() {
    const { photos, fetchPhotos, loading } = usePhotoStore();
    const [selectedSizes, setSelectedSizes] = useState('');
    const { modalStateFilter, setModalStateFilter } = useModalFilter()
    const { setModalStateReset, modalStateReset } = useModalReset()
    const [openSelect, setOpenSelect] = useState(null);
    const [typeSelect, setTypeSelect] = useState([]);
    const [count, setCount] = useState(1);
    const [dataGetSearsh, setdataGetSearsh] = useState([]);
    const [dateSearch, setDateSearch] = useState({ reset: true })
    const [stemsSort, setItemsSort] = useState();

    const sizes = [
        {
            label: 'Все размеры', value: "*"
            // ['XS', 'S', 'M', 'L', 'XL']
        },
        { label: 'XS', value: 'XS' },
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' }
    ];



    // const handleSizeChange = (size) => {

    // };




    const getDataStaffs = () => {
        fetchPhotos({
            page: count,
            limit: 50,
            CategoryId: dateSearch?.CategoryId,
        })
    }







    const arrSort = [
        { label: 'По убыванию цены', value: '1' },
        { label: 'По возрастанию цены', value: '2' }
    ];

    const getTypeElement = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await apiClient.get(`products?Limit=${100}&Page=${1}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newPhotos = response.data.products;
            setTypeSelect([{ label: 'Все типы', value: '' }, ...newPhotos.map((e) => ({
                label: e.name, value: e.id
            }))])
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }

    useEffect(() => {
        getTypeElement()
    }, [])
    // const typeSelect = [
    //     { label: 'Все типы', value: 'all' },
    //     { label: 'Топы', value: 'tops' },
    //     { label: 'Футболки', value: 't-shirts' },
    //     { label: 'Леггинсы', value: 'leggings' },
    //     { label: 'Толстовки', value: 'hoodies' },
    //     { label: 'Спортивные брюки', value: 'sweatpants' },
    //     { label: 'Аксессуары', value: 'accessories' },
    // ];
    const widthLap = '1020px';
    const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);
    const toggleSelect = (selectName) => {
        setOpenSelect(openSelect === selectName ? null : selectName);
    };
    useEffect(() => {
        fetchPhotos({
            limit: 50,
            page: count
        });
    }, []);
    useEffect(() => {
        getDataStaffs()
    }, [count, dateSearch]);

    useEffect(() => {
        setdataGetSearsh(prevData => [
            ...prevData,
            ...photos
                .filter(el => !prevData.some(prevEl => prevEl.id === el.id)) // Filter out duplicates by ID
                .map(el => ({
                    ...el,
                    jobpositions: el.jobpositions
                        ?.filter(prev => prev.end_date)
                        ?.sort((a, b) => {
                            const dateA = parseInt(a.end_date.replace(/-/g, ''), 10);
                            const dateB = parseInt(b.end_date.replace(/-/g, ''), 10);
                            return dateB - dateA;
                        }),
                }))
        ]);
        setdataGetSearsh(prevState =>
            prevState.filter(el =>
                el.attributes?.some(attr =>
                    attr.product_attribute_id == 2 &&
                    attr.attribute_values.some(attrValue =>
                        Array.isArray(selectedSizes) ? selectedSizes.includes(attrValue.name) : attrValue.name === selectedSizes
                    )
                )
            )
        );
    }, [photos, count, selectedSizes]);


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.offsetHeight - 20;

            if (scrollPosition >= threshold) {
                setCount(prevCount => prevCount + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        setdataGetSearsh(prevState =>
            prevState.filter(el =>
                el.attributes?.some(attr =>
                    attr.product_attribute_id == 2 &&
                    attr.attribute_values.some(attrValue =>
                        Array.isArray(selectedSizes) ? selectedSizes.includes(attrValue.name) : attrValue.name === selectedSizes
                    )
                )
            )
        );
    }, [selectedSizes]);
    useEffect(() => {
        setdataGetSearsh(prevState => {
            // Copy the previous state to avoid direct mutation
            const sortedData = [...prevState];

            // Check the sorting value in stemsSort and apply the appropriate sort
            if (stemsSort === '1') {
                // Sort by descending price
                sortedData.sort((a, b) => b.price - a.price);
            } else if (stemsSort === '2') {
                // Sort by ascending price
                sortedData.sort((a, b) => a.price - b.price);
            }

            return sortedData;
        });
    }, [stemsSort]);



    return (
        <>
            <div className='filterBar'>
                <h1>Каталог</h1>
                <div> {isLargeScreen ?
                    <div className='filterProbucts'>
                        {typeSelect.length > 0 &&
                            <CustomSelect
                                onClick={(id) => {
                                    setCount(0)
                                    setdataGetSearsh([])
                                    setDateSearch({ ...dateSearch, CategoryId: id })
                                }}
                                title='Тип продукции' open={openSelect === "type"} toggle={() => toggleSelect("type")} value={typeSelect}
                            />}
                        {/* <CustomSelect title='Цвет' value={''} open={openSelect === "color"} toggle={() => toggleSelect("color")} /> */}
                        <CustomSelect
                            onClick={(id) => {
                                setSelectedSizes(id)
                                setCount(0)
                                // handleSizeChange(id)
                                setDateSearch({ ...dateSearch, reset: !dateSearch.reset })
                            }}
                            title='Размер' value={sizes} open={openSelect === "size"} toggle={() => toggleSelect("size")} />
                    </div>
                    : <button onClick={() => setModalStateFilter(true)} className='btn-filter-phone'>
                        <img src={iconFilter} alt="iconFilter" />
                        Фильтр
                    </button>}
                    {isLargeScreen ?
                        <div className='max-w-auto'>
                            <CustomSelect
                                onClick={(id) => {
                                    setCount(0)
                                    setdataGetSearsh([])
                                    setItemsSort(id)
                                }}
                                title='Сортировать по' value={arrSort} open={openSelect === "sort"} toggle={() => toggleSelect("sort")} />
                        </div>
                        :
                        <><button onClick={() => setModalStateReset(true)} className='btn-filter-phone'>
                            Сортировать по
                        </button>
                            {modalStateReset && <ModalReset />}
                        </>}
                </div>

            </div>
            <div className="contentProducts">
                {/* {fetching && <h1 style={{ margin: '0 auto', textAlign: 'center' }}>Loading...</h1>}  */}
                <Box2 loading={loading} arrDataImg={dataGetSearsh?.filter((_, i) => i < 12)} />
                <SendEmail />
                <Box2 loading={loading} arrDataImg={dataGetSearsh?.filter((_, i) => i > 12)} />
            </div>
            {modalStateFilter && <ModalFilter />}

        </>
    );
}