import { useEffect } from 'react';
import PropTypes from "prop-types";
import CDEKWidget from '@cdek-it/widget'
import './cdekMapCSS.css'

export const CDEKMap = ({ city, onAddressChange }) => {
    console.log("city",city)
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

                window.cdekMapInstance = new CDEKWidget({
                    root: 'cdek-map',
                    apiKey: '269cf3f0-3414-4a8f-82a9-97c20c42ce92',
                    servicePath: 'https://elevenislands.ru/cdek/service.php',
                    hideFilters: {
                        type: false,
                    },
                    hideDeliveryOptions: {
                        office: false,
                        door: true,
                    },
                    forceFilters:{
                        type:"PVZ"
                    },
                    defaultLocation: city || "Москва",
                    lang: 'rus',
                    onChoose({ code }) {
                        onAddressChange({ address: code })
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
    }, [city]); // Зависимость от sity для повторной инициализации

    return (
        <>
            <div id="cdek-map" style={{ width: '100%', height: '450px' }}></div>
        </>
    );
};

CDEKMap.propTypes = {
    city: PropTypes.string.isRequired,
    onAddressChange: PropTypes.func.isRequired,
}