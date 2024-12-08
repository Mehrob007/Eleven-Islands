import apiClient from '../../../utils/api';


const token = localStorage.getItem("token")
// Рассчитать стоимость доставки
export const calculateOrder = async (data) => {
    try {
        const response = await apiClient.post('/YandexOrder/calculate-order', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при расчете доставки:', error);
        throw error;
    }
};

// Создать заказ
export const createOrder = async (data) => {
    try {
        const response = await apiClient.post('/YandexOrder/create-order', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        throw error;
    }
};

// Подтвердить заказ
export const acceptOrder = async (data) => {
    try {
        const response = await apiClient.post('/YandexOrder/accept-order', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при подтверждении заказа:', error);
        throw error;
    }
};
