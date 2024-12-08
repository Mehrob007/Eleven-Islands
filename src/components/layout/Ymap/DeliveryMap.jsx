import { useState } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { calculateOrder } from './apiFunctions';

const DeliveryMap = () => {
    const [routePoints, setRoutePoints] = useState([
        {
            id: 1,
            coordinates: [55.684396, 37.695519], // Статичная точка отправления (Москва)
            fullname: 'Корабельная ул., 11, корп. 1',
            size: { length: 10, width: 10, height: 10 }, // Примерные размеры груза
            weight: 1, // Примерный вес
            quantity: 1, // Количество
        },
    ]);
    const [selectedPointType, setSelectedPointType] = useState('dropoff'); // Начальный выбор - доставка
    const [calculationResult, setCalculationResult] = useState(null);

    // Обработчик клика по карте
    const handleMapClick = (e) => {
        console.log(e);
        
        const coordinates = e.get('coords');
        const pointType = selectedPointType;

        setRoutePoints((prevPoints) => {
            // Проверяем, есть ли уже точка с таким типом (pickup или dropoff)
            const existingIndex = prevPoints.findIndex(
                (point) => point.fullname === (pointType === 'pickup' ? 'Корабельная ул., 11, корп. 1' : 'Пункт доставки')
            );

            // Если точка с таким типом уже есть, заменяем её координаты
            if (existingIndex !== -1) {
                const updatedPoints = [...prevPoints];
                updatedPoints[existingIndex] = {
                    ...updatedPoints[existingIndex],
                    coordinates, // Обновляем координаты
                };
                return updatedPoints;
            }

            // Если точки с таким типом ещё нет, добавляем её
            return [
                ...prevPoints,
                {
                    id: prevPoints.length + 1,
                    coordinates,
                    fullname: pointType === 'pickup' ? 'Корабельная ул., 11, корп. 1' : 'Пункт доставки',
                    size: { length: 10, width: 10, height: 10 }, // Примерные размеры для новой точки
                    weight: 1, // Примерный вес
                    quantity: 1, // Количество
                },
            ];
        });
    };

    // Функция расчета стоимости
    const handleCalculateOrder = async () => {
        if (routePoints.length < 2) {
            alert('Добавьте пункт доставки на карте.');
            return;
        }

        const data = {
            order: 'order123',  // Пример значения для поля "order"
            Places: routePoints.map((point, index) => ({
                coordinates: point.coordinates,
                address: index === 0 ? 'Москва, Корабельная ул., 11, корп. 1От метро на автобусе 824. Выход на остановке Ривер парк - 10 метров до входа. Ориентир - вывеска Яндекс Маркет' : 'Адрес пункта назначения',
                name: index === 0 ? 'Корабельная ул., 11, корп. 1' : 'Пункт доставки',
                PhysicalDims: `${10}x${10}x${10}`,  // Пример: строки в формате "длина x ширина x высота"
            })),
            Source: {
                coordinates: routePoints[0].coordinates,
                address: 'Москва, Корабельная ул., 11, корп. 1От метро на автобусе 824. Выход на остановке Ривер парк - 10 метров до входа. Ориентир - вывеска Яндекс Маркет',
                name: 'Корабельная ул., 11, корп. 1',
                PhysicalDims: `${10}x${10}x${10}`,  // Преобразуем PhysicalDims в строку
            },
            Destination: {
                coordinates: routePoints[routePoints.length - 1].coordinates,
                address: 'Адрес пункта назначения',
                name: 'Пункт доставки',
                PlatformStationsId: 'station123',
            },
            Tariff: 'econom',
            PaymentMethod: 'cash',
            items: [
                {
                    size: { length: 10, width: 10, height: 10 },
                    weight: 1,
                    quantity: 1,
                    pickup_point: 1,
                    dropoff_point: 2,
                },
            ],
            requirements: {
                taxi_classes: ['econom'],
                cargo_type: 'parcel',
                cargo_loaders: 0,
                pro_courier: true,
                cargo_options: 'fragile',
                skip_door_to_door: false,
                due: new Date().toISOString(),
            },
        };
        console.log(JSON.stringify(data));


        try {
            const result = await calculateOrder(data);
            setCalculationResult(result);
            console.log('Рассчитано:', result);
        } catch (error) {
            console.error('Ошибка расчета:', error);
        }
    };



    return (
        <div>
            <h1>Карта доставки</h1>

            {/* Выбор типа точки */}
            <div>
                <label>
                    <input
                        type="radio"
                        name="pointType"
                        value="pickup"
                        checked={selectedPointType === 'pickup'}
                        onChange={() => setSelectedPointType('pickup')}
                        disabled // Заблокируем выбор пункта отправления
                    />
                    Корабельная ул., 11, корп. 1 (статичный)
                </label>
                <label>
                    <input
                        type="radio"
                        name="pointType"
                        value="dropoff"
                        checked={selectedPointType === 'dropoff'}
                        onChange={() => setSelectedPointType('dropoff')}
                    />
                    Пункт доставки
                </label>
            </div>
            <button onClick={handleCalculateOrder}>Рассчитать доставку</button>

            {/* Карта */}
            <YMaps>
                <Map
                    defaultState={{ center: [55.7558, 37.6173], zoom: 5 }}
                    width="100%"
                    height="500px"
                    onClick={handleMapClick} // Событие клика по карте
                >
                    {routePoints.map((point) => (
                        <Placemark
                            key={point.id}
                            geometry={point.coordinates}
                            properties={{ hintContent: point.fullname }}
                        />
                    ))}
                    {routePoints.length > 1 && (
                        <Polyline
                            geometry={routePoints.map((point) => point.coordinates)}
                            options={{
                                balloonCloseButton: false,
                                strokeColor: '#000',
                                strokeWidth: 4,
                                strokeOpacity: 0.5,
                            }}
                        />
                    )}
                </Map>
            </YMaps>

            {/* Результаты расчета */}
            {calculationResult && (
                <div>
                    <h2>Результат расчета</h2>
                    <pre>{JSON.stringify(calculationResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default DeliveryMap;
