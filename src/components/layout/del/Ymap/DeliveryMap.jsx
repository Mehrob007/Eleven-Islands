import { useEffect } from 'react';
import apiClient from '../../../utils/api';

const DeliveryWidget = ({ city, setDeliveryPrice }) => {
    useEffect(() => {
        // Функция для добавления скрипта виджета
        const addWidgetScript = () => {
            const script = document.createElement('script');
            script.src = 'https://ndd-widget.landpro.site/widget.js';
            script.async = true;
            script.onload = () => {
                if (window.YaDelivery) {
                    console.log('Инициализация виджета...');
                    window.YaDelivery.createWidget({
                        containerId: 'delivery-widget',
                        params: {
                            city: city?.name || "Москва",
                            delivery_price: "от 200",
                            show_select_button: false,
                            size: {
                                height: '650px',
                                width: '100%',
                            },
                            source_platform_station: '05e809bb-4521-42d9-a936-0fb0744c0fb3',
                            physical_dims_weight_gross: 10000,
                            delivery_term: 'от 1 дня',
                            filter: {
                                type: ['pickup_point', 'terminal'], // Добавьте оба типа для большей гибкости
                                is_yandex_branded: false,           // Уберите фильтр на "брендированные" пункты
                                // payment_methods: [],                // Уберите фильтр на способы оплаты
                            }
                        },
                    });
                } else {
                    console.error('YaDelivery не загружен!');
                }
            };


            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        addWidgetScript();

        // Обработчик события выбора ПВЗ
        const handlePointSelected = async (event) => {
            const token = localStorage.getItem("token")
            const { detail } = event;
            console.log('ID:', detail.id);
            console.log('Адрес:', detail.address.full_address);
            console.log('Страна:', detail.address.country);
            console.log('Город:', detail.address.locality);
            console.log('Улица:', detail.address.street);
            console.log('Дом:', detail.address.house);
            console.log('Комментарий:', detail.address.comment);
            try {
                const res = await apiClient.post('https://backendeleven.ru/YandexOrder/calculate-order', {
                    "destination": {
                        "address": detail.address.full_address
                    },
                    "source": {
                        "address": detail.address.street
                    },
                    "tariff": "time_interval",
                    "total_weight": 2000,
                    "places": [
                        {
                            "physical_dims": {
                                "weight_gross": 2000,
                                "dx": 25,
                                "dy": 10,
                                "dz": 15
                            }
                        }
                    ]
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(res.data);
                setDeliveryPrice(res.data.pricing_total.split(' ')[0])

            } catch { (el) => console.error(el) }
        };
        document.addEventListener('YaNddWidgetPointSelected', handlePointSelected);
        return () => {
            document.removeEventListener('YaNddWidgetPointSelected', handlePointSelected);
        };
    }, []);

    return (
        <div id="delivery-widget"></div>
    );
};

export default DeliveryWidget;

