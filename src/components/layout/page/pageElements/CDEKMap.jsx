import { useEffect } from 'react';

const CDEKMap = () => {
    useEffect(() => {
        const cdekScript = document.createElement('script');
        cdekScript.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3';
        cdekScript.charset = 'utf-8';
        document.head.appendChild(cdekScript);

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
                        have_cashless: true,
                        have_cash: true,
                        is_dressing_room: true,
                        type: true,
                    },
                    hideDeliveryOptions: {
                        office: true,
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
                        console.log('Виджет CDEK загружен');
                    },
                    onCalculate() {
                        console.log('Расчет стоимости доставки произведен');
                    },
                    onChoose() {
                        console.log('Доставка выбрана');
                    },
                });
            }
        };

        cdekScript.onload = initializeCDEKWidget;

        return () => {
            document.head.removeChild(cdekScript);
        };
    }, []);

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
