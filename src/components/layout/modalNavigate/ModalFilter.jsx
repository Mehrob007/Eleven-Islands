import { useModalFilter, useModalReset } from "../storeState/modalBasket";
import CloasModal from '../../../assets/icon/CloasModal.svg';
import CustomSelect from "../page/pageElements/CustomSelect";
import { useEffect, useState } from "react";
import { usePhotoStore } from "../storeState/store";
import apiClient from "../../../utils/api";

// const sizesOptions = [
//     { label: 'Все размеры', value: "*" },
//     { label: 'XS', value: 'XS' },
//     { label: 'S', value: 'S' },
//     { label: 'M', value: 'M' },
//     { label: 'L', value: 'L' },
//     { label: 'XL', value: 'XL' }
// ];

const sortOptions = [
    { label: 'По убыванию цены', value: '1' },
    { label: 'По возрастанию цены', value: '2' }
];

export default function ModalFilter({
    modalStateFilter,
    setModalStateFilter,
    componentDiv
}) {
    const [resetValue, setResetValue] = useState(false);
    // const { setModalStateFilter } = useModalFilter();
    // const { photos, fetchPhotos } = usePhotoStore();
    // const [selectedSizes, setSelectedSizes] = useState('');
    // // const [openSelect, setOpenSelect] = useState(null);
    // // const [typeSelect, setTypeSelect] = useState([]);
    // // const [count, setCount] = useState(1);
    // const [dateSearch, setDateSearch] = useState({ reset: true });
    // const [stemsSort, setItemsSort] = useState();
    // // const [isFetching, setIsFetching] = useState(false);

    // const getDataStaffs = () => {
    //     fetchPhotos({
    //         page: count,
    //         limit: 50,
    //         CategoryId: dateSearch?.CategoryId,
    //     });
    // };

    // // const getTypeElement = async () => {
    // //     const token = localStorage.getItem('token');
    // //     try {
    // //         const response = await apiClient.get(`categories?Limit=100&Page=1`, {
    // //             headers: { Authorization: `Bearer ${token}` }
    // //         });
    // //         const newCategories = response.data.categories.map((category) => ({
    // //             label: category.name, value: category.id
    // //         }));
    // //         setTypeSelect([{ label: 'Все типы', value: '' }, ...newCategories]);
    // //     } catch (error) {
    // //         console.error("Error fetching categories:", error);
    // //     }
    // // };

    // // useEffect(() => { getTypeElement(); }, []);

    // const applyFilters = (data) => {
    //     return data.filter(el =>
    //     (!selectedSizes || el.attributes?.some(attr =>
    //         attr.product_attribute_id === 2 &&
    //         attr.attribute_values.some(attrValue =>
    //             Array.isArray(selectedSizes) ? selectedSizes.includes(attrValue.name) : attrValue.name === selectedSizes
    //         )
    //     ))
    //     );
    // };

    // const applySort = (data) => {
    //     if (stemsSort === '1') return [...data].sort((a, b) => b.price - a.price);
    //     if (stemsSort === '2') return [...data].sort((a, b) => a.price - b.price);
    //     return data;
    // };

    // useEffect(() => {
    //     getDataStaffs();
    // }, [count, isFetching, dateSearch, selectedSizes]);

    // useEffect(() => {
    //     setdataGetSearsh(prevData => {
    //         const uniquePhotos = photos.filter(newPhoto => !prevData.some(prev => prev.id === newPhoto.id));
    //         const filteredPhotos = applyFilters(uniquePhotos);
    //         return applySort([...prevData, ...filteredPhotos]);
    //     });
    // }, [photos, selectedSizes, stemsSort]);
    // useEffect(() => {
    //     if (isFetching) {
    //         fetchPhotos({ limit: 50, page: count, CategoryId: dateSearch?.CategoryId, }).then(() => setIsFetching(false));
    //     }
    // }, [count, isFetching]);

    useEffect(() => {
        if (resetValue) setResetValue(false);
    }, [resetValue]);

    return (
        <div className="boxModalBasket" style={{ zIndex: modalStateFilter ? 1000000 : -999, opacity: modalStateFilter ? 1 : 0 }}>
            <div className="componentModalFilter">
                <div className="componentModalHeaderFilter">
                    <button onClick={() => setModalStateFilter(false)}><img src={CloasModal} alt="CloasModal" /></button>
                    <h1>Фильтр</h1>
                    <button onClick={() => setResetValue(true)}>Сбросить</button>
                </div>
                <div className='FilterBox'>
                    {componentDiv(resetValue)}
                    {/*<CustomSelect
                        onClick={(id) => { setSelectedSizes(id); setCount(1); setDateSearch({ ...dateSearch, reset: !dateSearch.reset }) }}
                        title='Размер' phone={true} resetValue={resetValue} value={sizesOptions} />
                    <CustomSelect
                        onClick={(id) => { setCount(1); setdataGetSearsh([]); setDateSearch({ ...dateSearch, CategoryId: id }) }}
                        title='Тип продукции' phone={true} resetValue={resetValue} value={typeSelect} /> */}
                </div>
            </div>
        </div>
    );
}
