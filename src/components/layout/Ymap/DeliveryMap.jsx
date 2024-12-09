import { useEffect } from 'react';
// import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
// import { calculateOrder } from './apiFunctions';

const DeliveryMap = () => {
    useEffect(() => {
        // Загружаем скрипт виджета
        const script = document.createElement('script');
        script.src = 'https://ndd-widget.landpro.site/widget.js';
        script.async = true;

        document.body.appendChild(script);

        // Функция для инициализации виджета
        const startWidget = () => {
            if (window.YaDelivery) {
                window.YaDelivery.createWidget({
                    containerId: 'delivery-widget',
                    params: {
                        city: 'Москва',
                        size: {
                            height: '450px',
                            width: '100%',
                        },
                        source_platform_station: '05e809bb-4521-42d9-a936-0fb0744c0fb3',
                        physical_dims_weight_gross: 10000,
                        delivery_price: 'от 100',
                        delivery_term: 'от 1 дня',
                        show_select_button: true,
                        filter: {
                            type: ['pickup_point', 'terminal'],
                            is_yandex_branded: false,
                            payment_methods: ['already_paid', 'card_on_receipt'],
                            payment_methods_filter: 'or',
                        },
                    },
                });
            }
        };

        // Слушаем событие загрузки виджета
        const handleWidgetLoad = () => {
            startWidget();
        };

        document.addEventListener('YaNddWidgetLoad', handleWidgetLoad);

        // Слушаем событие выбора пункта выдачи
        const handlePointSelected = (event) => {
            const data = event.detail;
            console.log('ID:', data.id);
            console.log('Адрес:', data.address.full_address);
            console.log('Страна:', data.address.country);
            console.log('Город:', data.address.locality);
            console.log('Улица:', data.address.street);
            console.log('Дом:', data.address.house);
            console.log('Комментарий:', data.address.comment);
        };

        document.addEventListener('YaNddWidgetPointSelected', handlePointSelected);

        // Удаляем обработчики при размонтировании компонента
        return () => {
            document.removeEventListener('YaNddWidgetLoad', handleWidgetLoad);
            document.removeEventListener('YaNddWidgetPointSelected', handlePointSelected);
            document.body.removeChild(script);
        };
    }, []);

    return <div id="delivery-widget" style={{ width: '100%', height: '450px' }} />;
};

export default DeliveryMap;
