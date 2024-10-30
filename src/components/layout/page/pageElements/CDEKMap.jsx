import { useEffect } from 'react';

const CDEKMap = () => {
    useEffect(() => {
        // Load CDEK Widget script
        const cdekScript = document.createElement('script');
        cdekScript.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3';
        cdekScript.charset = 'utf-8';
        document.head.appendChild(cdekScript);

        // Load Yandex Maps API script with your API key
        const yandexScript = document.createElement('script');
        yandexScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=269cf3f0-3414-4a8f-82a9-97c20c42ce92&lang=ru_RU';
        document.head.appendChild(yandexScript);

        // Initialize the CDEK widget after both scripts load
        const initializeCDEKWidget = () => {
            if (window.CDEKWidget) {
                new window.CDEKWidget({
                    from: {
                        country_code: 'RU',
                        city: 'Новосибирск',
                        postal_code: 630009,
                        code: 270,
                        address: 'ул. Большевистская, д. 101',
                    },
                    root: 'cdek-map',
                    apiKey: '269cf3f0-3414-4a8f-82a9-97c20c42ce92',
                    servicePath: 'https://elevenislands.ru/cdek/service.php',
                    hideFilters: {
                        have_cashless: false,
                        have_cash: false,
                        is_dressing_room: false,
                        type: false,
                    },
                    hideDeliveryOptions: {
                        office: false,
                        door: false,
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
                    defaultLocation: [55.0415, 82.9346],
                    lang: 'rus',
                    currency: 'RUB',
                    tariffs: {
                        office: [234, 136, 138],
                        door: [233, 137, 139],
                    },
                    onReady() {
                        alert('Виджет загружен');
                    },
                    onCalculate() {
                        alert('Расчет стоимости доставки произведен');
                    },
                    onChoose() {
                        alert('Доставка выбрана');
                    },
                });
            }
        };

        // Wait for both scripts to load, then initialize the widget
        cdekScript.onload = () => {
            if (window.ymaps) {
                initializeCDEKWidget();
            }
        };
        yandexScript.onload = () => {
            if (window.CDEKWidget) {
                initializeCDEKWidget();
            }
        };

        // Cleanup scripts when component unmounts
        return () => {
            document.head.removeChild(cdekScript);
            document.head.removeChild(yandexScript);
        };
    }, []);

    return <div id="cdek-map" style={{ width: '100%', height: '300px' }}></div>;
};

export default CDEKMap;
