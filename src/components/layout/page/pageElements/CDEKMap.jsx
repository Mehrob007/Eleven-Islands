import { useEffect } from 'react';
// import phpfile from '../../../../assets/map/widget-main/dist/service.php'

const CDEKMap = () => {
    useEffect(() => {
        // Добавляем скрипт CDEK Widget в head
        const cdekScript = document.createElement('script');
        cdekScript.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3';
        cdekScript.charset = 'utf-8';
        document.head.appendChild(cdekScript);

        // Добавляем скрипт Яндекс.Карт для API-ключа
        const yandexScript = document.createElement('script');
        yandexScript.src = `https://api-maps.yandex.ru/2.1/?apikey=269cf3f0-3414-4a8f-82a9-97c20c42ce92&lang=ru_RU`;
        document.head.appendChild(yandexScript);

        // После загрузки скриптов инициализируем виджет
        cdekScript.onload = () => {
            yandexScript.onload = () => {
                if (window.CDEKWidget) {
                    new window.CDEKWidget({
                        from: 'Новосибирск',
                        root: 'cdek-map',
                        apiKey: '269cf3f0-3414-4a8f-82a9-97c20c42ce92', // Вставьте сюда свой API-ключ от Яндекс.Карт
                        servicePath: 'https://elevenislands.ru/service.php', // Вставьте сюда ссылку на ваш service.php
                        defaultLocation: 'Новосибирск',
                    });
                }
            };
        };

        // Очищаем скрипты при размонтировании компонента
        return () => {
            document.head.removeChild(cdekScript);
            document.head.removeChild(yandexScript);
        };
    }, []);

    return <div id="cdek-map" style={{ width: '100%', height: '300px' }}></div>;
};

export default CDEKMap;
