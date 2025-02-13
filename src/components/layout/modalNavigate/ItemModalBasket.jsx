import img from '../../../assets/img/1.png';
import minus from '../../../assets/icon/minus.svg';
import plus from '../../../assets/icon/plus.svg';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { dataGelaryStore } from '../storeState/modalBasket.js'
import {getImageSrc} from "../../../utils/getImageSrc.js";

export default function ItemModalBasket({ see = false }) {
    const { dataGelary, setDataGelary } = dataGelaryStore()
    // const { setDataBasket } = dataBasketItems()
    // const [products, setProducts] = useState([
    //     { id: 1, title: 'Dri-Fit Advantage Shorts Women', name: 'Product 1', price: 10, size: 'S', count: 1 }
    // ]);
    // const [loading, setLoading] = useState(true);

    // const getProductsBasket = async () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         console.warn("No token available. Cannot fetch products.");
    //         return;
    //     }
    //     setLoading(true);
    //     try {
    //         const response = await axios.get('https://elevenislands.ru/api/shopping_cart_items/me', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.data) {
    //             const productsWithCount = response.data.map((product) => ({
    //                 ...product,
    //                 count: 1 // Initialize count for each product
    //             }));
    //             setProducts(productsWithCount);

    //         }
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     } finally {
    //         setLoading(false);
    //         setDataBasket(products)
    //     }
    // };

    // useEffect(() => {
    //     getProductsBasket();
    // }, []);

    const updateProductCount = (index, delta) => {
        setDataGelary(
            dataGelary.map((product, i) =>
                i === index
                    ? { ...product, count: Math.max(product.count + delta, 1), countPrice: product.price * Math.max(product.count + delta, 1) }
                    : product
            )
        );
    };
    const deleteElement = (id) => {
        setDataGelary(dataGelary.filter((product) => product.id != id));
    }


    // useEffect(() => {
    //     setPrice(dataGelary?.reduce((total, item) => total + item?.countPrice, 0))
    // }, [dataGelary])
    // if (loading) return <p>Loading...</p>;
    // if (dataGelary.length === 0) return <h1>нет товаров!</h1>;

    return dataGelary.map((product, index) => (
        <div className='itemModalBasket' key={index}>
            <div className='modalBasketImg'>
                <img src={getImageSrc(product?.titleImg?.source || img)} alt={product?.title} />
            </div>
            <div className='modalBasketInfo'>
                <div className='info'>
                    <h2 >{product?.title}</h2>
                    <p>Цена: <span style={{ color: '#262626' }}>{product?.price} руб</span></p>
                    <p>Размер: <span style={{ color: '#262626' }}>{product?.size?.name}</span></p>
                </div>
                {!see ?
                    <div className='count'>
                        <button onClick={() => updateProductCount(index, -1)}>
                            <img src={minus} alt='minus' />
                        </button>
                        <p>{product?.count}</p>
                        <button onClick={() => updateProductCount(index, 1)}>
                            <img src={plus} alt='plus' />
                        </button>
                    </div> : <div className='info' style={{ height: '17px' }}>
                        <p>Количество: <span style={{ color: '#262626' }}>{product?.count}</span></p>
                    </div>}
            </div>
            {!see &&
                <RiDeleteBin6Fill className='delete-button-modal-basket' onClick={() => deleteElement(product?.id)} />}
        </div>
    ));
}
