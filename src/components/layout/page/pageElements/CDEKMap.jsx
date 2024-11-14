import { useEffect, useState } from 'react';
import CDEKWidget from '@cdek-it/widget'
import './cdekMapCSS.css'
const CDEKMap = ({ city, setDeliveryData, typeSakath }) => {
    console.log(typeSakath)
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
                    from: {
                        country_code: 'RU',
                        city: 'Москва',
                        postal_code: "MSK951",
                        
                        address: 'Нагатинская набережная, 54',
                    },
                    root: 'cdek-map',
                    apiKey: '269cf3f0-3414-4a8f-82a9-97c20c42ce92',
                    servicePath: 'https://elevenislands.ru/cdek/service.php',
                    hideFilters: {
                  
                        type: false,
                    },
                    
                    hideDeliveryOptions: {
                        office: typeSakath,
                        door: !typeSakath,
                    },
                    tariffs: {
                        office: !typeSakath ? [136,234] : [],
                        door: typeSakath ? [145, 150] : []
                    },
                    forceFilters:{
                        type:"PVZ"
                    },
                    // canChoose:true,
                    goods: [
                        {
                            width: 10,
                            height: 10,
                            length: 10,
                            weight: 10,
                        },
                    ],
                    showSearch: true, sender: true,
                    defaultLocation: city || "Москва",
                    lang: 'rus',
                    currency: 'RUB',
                    onReady() {
                        // console.log('Виджет CDEK загружен');
                    },
                    onCalculate(el) {
                        // Логика расчета доставки
                        console.log("CDEK", el)
                    },
                    onChoose(...v) {
                        console.log('Доставка выбрана');
                        setDeliveryData(v)
                        console.log(v);
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
        
    }, [city, typeSakath]); // Зависимость от sity для повторной инициализации

    return (
        <>
           
            <div id="cdek-map" style={{ width: '100%', height: '100%' }}></div>
        </>
    );
};

export default CDEKMap;
