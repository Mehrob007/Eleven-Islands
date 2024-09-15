import { useEffect } from 'react'
import Box2 from './pageElements/Box2'

import SendEmail from './pageElements/SendEmail';
import { usePhotoStore } from '../storeState/store';


export default function Products() {
  const { photos, currentPage, fetching, fetchPhotos, setFetching } = usePhotoStore();

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
  return (
    <>
      <div className='filterBar'>
        <h1>Каталог</h1>
        <div>
          <div className='filterProbucts'>
            <select id="">
              <option value="*">Тип продукции</option>
            </select>
            <select id="">
              <option value="*">Цвет</option>
            </select>
            <select id="">
              <option value="*">Размер</option>
            </select> 
          </div>
          <select id="">
            <option value="*">Сортировать по</option>
            <option value="descending">По убыванию цены</option>
            <option value="ascending">По возрастанию цены</option>
          </select>
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
