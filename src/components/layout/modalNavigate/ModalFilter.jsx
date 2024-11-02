import { useModalFilter, useModalReset } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import CustomSelect from "../page/pageElements/CustomSelect";
import { useEffect, useState } from "react";
import { usePhotoStore } from "../storeState/store";
import apiClient from "../../../utils/api";

const sizes = [
    { label: 'all', value: 'all' },
    { label: 'XS', value: '0' },
    { label: 'S', value: '1' },
    { label: 'M', value: '2' },
    { label: 'L', value: '3' },
    { label: 'XL', value: '4' }
];
const typeSelect = [
    { label: 'Все типы', value: 'all' },
    { label: 'Топы', value: 'tops' },
    { label: 'Футболки', value: 't-shirts' },
    { label: 'Леггинсы', value: 'leggings' },
    { label: 'Толстовки', value: 'hoodies' },
    { label: 'Спортивные брюки', value: 'sweatpants' },
    { label: 'Аксессуары', value: 'accessories' },
];

export default function ModalFilter({ setdataGetSearsh }) {
    const { setModalStateFilter } = useModalFilter()
    const [resetValue, setResetValue] = useState(false)
    const { photos, fetchPhotos } = usePhotoStore();
    const [selectedSizes, setSelectedSizes] = useState('');
    const [openSelect, setOpenSelect] = useState(null);
    const [typeSelect, setTypeSelect] = useState([]);
    const [count, setCount] = useState(1);
    const [dateSearch, setDateSearch] = useState({ reset: true })
    const [stemsSort, setItemsSort] = useState();

    const sizes = [
        {
            label: 'Все размеры', value: "*"
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
    // const typeSelect = [
    //     { label: 'Все типы', value: 'all' },
    //     { label: 'Топы', value: 'tops' },
    //     { label: 'Футболки', value: 't-shirts' },
    //     { label: 'Леггинсы', value: 'leggings' },
    //     { label: 'Толстовки', value: 'hoodies' },
    //     { label: 'Спортивные брюки', value: 'sweatpants' },
    //     { label: 'Аксессуары', value: 'accessories' },
    // ];
    const toggleSelect = (selectName) => {
        setOpenSelect(openSelect === selectName ? null : selectName);
    };
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


    const [isFetching, setIsFetching] = useState(false);

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

    // const resFilterType = typeSelect.filter((item, index, self) => index === self.findIndex(other => other.value === item.value))




    useEffect(() => {
        if (resetValue) {
            setResetValue(false)
        }
    }, [resetValue])


    return (
        <div className="boxModalBasket">
            <div className="componentModalFilter">
                <div className="componentModalHeaderFilter">
                    {/* <h1>Корзина</h1> */}
                    <button onClick={() => setModalStateFilter(false)}><img src={CloasModal} alt="CloasModal" /></button>
                    <h1>Фильтр</h1>
                    <button onClick={() => {
                        setResetValue(true)
                    }}>Сбросить</button>
                </div>
                <div className='FilterBox'>
                    <CustomSelect
                        onClick={(id) => {
                            setSelectedSizes(id)
                            setCount(0)
                            // handleSizeChange(id)
                            setDateSearch({ ...dateSearch, reset: !dateSearch.reset })
                        }}
                        title='Размер' phone={true} value={sizes} open={openSelect === "size"} toggle={() => toggleSelect("size")} />
                    {
                        <CustomSelect
                            onClick={(id) => {
                                setCount(0)
                                setdataGetSearsh([])
                                setDateSearch({ ...dateSearch, CategoryId: id })
                            }}
                            title='Тип продукции' phone={true} open={openSelect === "type"} toggle={() => toggleSelect("type")} value={typeSelect} />}
                    {/* <CustomSelect title='Цвет' value={''} open={openSelect === "color"} toggle={() => toggleSelect("color")} /> */}

                </div>
                {/* <div className="FilterBox">
                    <CustomSelect resetValue={resetValue} phone={true} title='Размер' value={sizes} />
                    <CustomSelect resetValue={resetValue} phone={true} title='Тип продукции' value={typeSelect} />
                    {/* <CustomSelect resetValue={resetValue} phone={true} title='Цвет' colors={''} /> 
                </div> */}
                {/*<div className="endPrice">
                    <h1>Итого:</h1>
                    <p>price</p>
                </div>
                <button className="place-an-order-btn">Оформить заказ</button> */}
            </div>
        </div>
    )
}
