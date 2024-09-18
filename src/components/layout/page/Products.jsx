import { useEffect, useState } from 'react'
import Box2 from './pageElements/Box2'

import SendEmail from './pageElements/SendEmail';
import { usePhotoStore } from '../storeState/store';
import { Checkbox, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import CustomSelect from './pageElements/CustomSelect';


export default function Products() {
  const { photos, currentPage, fetching, fetchPhotos, setFetching } = usePhotoStore();
  const [selectedSizes, setSelectedSizes] = useState([]);

  const sizes = [
    {label: 'XS', value: '0'}, 
    {label: 'S', value: '1'}, 
    {label: 'M', value: '2'}, 
    {label: 'L', value: '3'}, 
    {label: 'XL', value: '4'}
  ];

  const handleSizeChange = (size) => {
    setSelectedSizes(size);
  };

  useEffect(() => {
    fetchPhotos(4, currentPage);
  }, []);

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
      console.log('scroll');
    }
  };

  useEffect(() => {
    if (fetching) {
      fetchPhotos(4, currentPage);
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const arrSort = [
    { label: 'Сортировать по', value: 'all' },
    { label: 'По убыванию цены', value: '1' },
    { label: 'По возрастанию цены', value: '2' }
  ]

  const typeSelect = [
    { label: 'Все типы', value: 'all' },
    { label: 'Топы', value: 'tops' },
    { label: 'Футболки', value: 't-shirts' },
    { label: 'Леггинсы', value: 'leggings' },
    { label: 'Толстовки', value: 'hoodies' },
    { label: 'Спортивные брюки', value: 'sweatpants' },
    { label: 'Аксессуары', value: 'accessories' },
  ]
  return (
    <>
      <div className='filterBar'>
        <h1>Каталог</h1>
        <div>
          <div className='filterProbucts'>
            <CustomSelect title='Тип продукции' value={typeSelect} />
            <CustomSelect title='Цвет' value={''} />
            <CustomSelect title='Размер' value={sizes} />
          </div>
          <div className='max-w-auto'>
            <CustomSelect title='Сортировать по' value={arrSort} />
          </div>
        </div>
      </div>
      <div className="contentProducts">
        <Box2 arrDataImg={photos.filter((_, i) => i < 12)} />
        <SendEmail />
        <Box2 arrDataImg={photos.filter((_, i) => i > 12)} />
      </div>
    </>
  )
}
