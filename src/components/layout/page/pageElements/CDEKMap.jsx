import { useEffect } from 'react';

const CDEKMap = ({ sity }) => {    
    useEffect(() => {
        const cdekScript = document.createElement('script');
        cdekScript.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3';
        cdekScript.charset = 'utf-8';
        document.head.appendChild(cdekScript);

        const initializeCDEKWidget = () => {
            if (window.CDEKWidget) {
                // Удаляем предыдущий виджет, если он существует
                if (window.cdekMapInstance) {
                    window.cdekMapInstance.destroy();
                }

                window.cdekMapInstance = new window.CDEKWidget({
                    from: {
                        country_code: 'RU',
                        city: sity?.name || 'Москва',
                        postal_code: 101000,
                        code: 270,
                        address: 'ул. Большевистская, д. 101',
                    },
                    root: 'cdek-map',
                    apiKey: '269cf3f0-3414-4a8f-82a9-97c20c42ce92',
                    servicePath: 'https://elevenislands.ru/cdek/service.php',
                    hideFilters: {
                        have_cashless: true,
                        have_cash: true,
                        is_dressing_room: true,
                        type: false,
                    },
                    hideDeliveryOptions: {
                        office: false,
                        door: true,
                    },
                    debug: false,
                    goods: [
                        {
                            width: 10,
                            height: 10,
                            length: 10,
                            weight: 10,
                        },
                    ],
                    defaultLocation: sity?.gps || [37.6156, 55.7522],
                    lang: 'rus',
                    currency: 'RUB',
                    tariffs: {
                        office: [139, 138],
                        door: [],
                    },
                    onReady() {
                        // console.log('Виджет CDEK загружен');
                    },
                    onCalculate() {
                        // Логика расчета доставки
                    },
                    onChoose(e, a) {
                        console.log('Доставка выбрана');
                        console.log(a);
                    },
                });
            }
        };

        cdekScript.onload = initializeCDEKWidget;

        return () => {
            // Очистка: удаление скрипта и уничтожение виджета
            document.head.removeChild(cdekScript);
            if (window.cdekMapInstance) {
                window.cdekMapInstance.destroy();
                window.cdekMapInstance = null; // Убираем ссылку на экземпляр
            }
        };
    }, [sity]); // Зависимость от sity для повторной инициализации

    return (
        <>
            <style>
                {`
                    /* Скрытие всех кнопок управления на CDEK карте */
                    .ymaps-2-1-79-controls__control,
                    .ymaps-2-1-79-copyright,
                    .ymaps3x0--control, .ymaps3x0--control__background,
                    .ymaps-2-1-79-copyright__link {
                        display: none !important;
                    }
                `}
            </style>
            <div id="cdek-map" style={{ width: '100%', height: '100%' }}></div>
        </>
    );
};

export default CDEKMap;
