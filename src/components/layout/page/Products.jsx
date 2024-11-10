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
    const { photos, fetchPhotos } = usePhotoStore();
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
    const [isFetching, setIsFetching] = useState(false);




    const getDataStaffs = () => {
        fetchPhotos({
            page: count,
            limit: 50,
            CategoryId: dateSearch?.CategoryId
        })

    }

    const arrSort = [
        { label: 'По убыванию цены', value: '1' },
        { label: 'По возрастанию цены', value: '2' }
    ];

    const getTypeElement = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await apiClient.get(`categories?Limit=${100}&Page=${1}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newPhotos = response.data.categories;
            // console.log('==============111======================');
            // console.log(newPhotos);
            // console.log('====================================');
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

    useEffect(() => {
        getDataStaffs()
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
        getDataStaffs()
    }, [count, selectedSizes, dateSearch, stemsSort]);

    useEffect(() => {
        if (photos.length > 0) {
            setdataGetSearsh(prevData => [
                ...prevData,
                ...photos
                    .filter(el => !prevData.some(prevEl => prevEl.id === el.id))
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
        }
    }, [photos]);





    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.offsetHeight - 100;
            if (scrollPosition >= threshold && !isFetching) {
                setIsFetching(true);
                setCount(prevCount => prevCount + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        // Запрос данных при изменении count
        const fetchData = async () => {
            // Загрузка данных
            await fetchPhotos({
                CategoryId: dateSearch?.CategoryId,
                limit: 50,
                page: count
            });
            setIsFetching(false); // Сбрасываем флаг после загрузки
        };

        if (isFetching) {
            fetchData();
        }
    }, [count, isFetching]);

    useEffect(() => {
        if (selectedSizes === '*' || !selectedSizes) {
            // If "All Sizes" is selected or selectedSizes is empty, reset to original data
            setdataGetSearsh(photos);
        } else {
            // Filter by selectedSizes
            setdataGetSearsh(prevState => prevState.filter(el =>
                el.attributes?.some(attr =>
                    attr.product_attribute_id === 2 &&
                    attr.attribute_values.some(attrValue =>
                        Array.isArray(selectedSizes)
                            ? selectedSizes.includes(attrValue.name)
                            : attrValue.name === selectedSizes
                    )
                )
            ));
        }
    }, [selectedSizes, photos]); // Ensure photos is a dependency to handle resets

    console.log('====================================');
    console.log(dataGetSearsh);
    console.log('====================================');
    useEffect(() => {
        console.log("Sorting triggered with stemsSort:", stemsSort);
        console.log("Data before sorting:", dataGetSearsh);

        if (dataGetSearsh && dataGetSearsh.length > 0) {
            const sortedData = [...dataGetSearsh];

            if (stemsSort === '1') {
                sortedData.sort((a, b) => b.price - a.price);
            } else if (stemsSort === '2') {
                sortedData.sort((a, b) => a.price - b.price);
            }

            setdataGetSearsh(sortedData);

            console.log("Data after sorting:", sortedData);
        }
    }, [stemsSort]);



    // const resFilterType = typeSelect.filter((item, index, self) => index === self.findIndex(other => other.value === item.value))



    return (
        <>
            <div className='filterBar'>
                <h1>Каталог</h1>
                <div> {isLargeScreen ?
                    <div className='filterProbucts'>
                        <CustomSelect
                            onClick={(id) => {
                                setCount(0)
                                setdataGetSearsh([])
                                setDateSearch({ ...dateSearch, CategoryId: id })
                            }}
                            title='Тип продукции' open={openSelect === "type"} toggle={() => toggleSelect("type")} value={typeSelect} />
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
                                    setItemsSort(id)
                                }}
                                title='Сортировать по' value={arrSort} open={openSelect === "sort"} toggle={() => toggleSelect("sort")} />
                        </div>
                        :
                        <><button onClick={() => setModalStateReset(true)} className='btn-filter-phone'>
                            Сортировать по
                        </button>
                            <ModalReset element={<CustomSelect
                                onClick={(id) => {
                                    setCount(0)
                                    setItemsSort(id)
                                }}
                                title='Сортировать по' value={arrSort} phone={true} />} modalStateReset={modalStateReset} />
                        </>}
                </div>

            </div>
            <div className="contentProducts">
                {/* {fetching && <h1 style={{ margin: '0 auto', textAlign: 'center' }}>Loading...</h1>}  */}
                <Box2 arrDataImg={dataGetSearsh?.filter((_, i) => i < 8)} />
                <SendEmail />
                <Box2 arrDataImg={dataGetSearsh?.filter((_, i) => i >= 8)} />
            </div>
            <ModalFilter
                modalStateFilter={modalStateFilter}
                setModalStateFilter={setModalStateFilter}
                componentDiv={(resetValue) => {
                    return <>
                        <CustomSelect
                            onClick={(id) => {
                                setCount(0)
                                setdataGetSearsh([])
                                setDateSearch({ ...dateSearch, CategoryId: id })
                            }}
                            resetValue={resetValue}
                            title='Тип продукции' phone={true} value={typeSelect} />
                        {/* <CustomSelect title='Цвет' value={''} open={openSelect === "color"} toggle={() => toggleSelect("color")} /> */}
                        <CustomSelect
                            onClick={(id) => {
                                setSelectedSizes(id)
                                setCount(0)
                                // handleSizeChange(id)
                                setDateSearch({ ...dateSearch, reset: !dateSearch.reset })
                            }}
                            resetValue={resetValue}
                            title='Размер' value={sizes} phone={true} />
                    </>
                }}
            />
        </>
    );
}