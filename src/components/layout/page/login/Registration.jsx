import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../../utils/api";
// POST
// ​/api​/customers

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

export default function Registration() {
    const widthLap = '1020px';
    const navigate = useNavigate()

    // Состояния для формы и ошибок
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
    });

    // Функция для обновления состояния полей формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // Функция для валидации и отправки формы
    const loginFunction = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Валидация имени
        if (!formData.first_name) {
            validationErrors.first_name = 'Поле не должно быть пустым!';
        }

        // Валидация фамилии
        if (!formData.last_name) {
            validationErrors.last_name = 'Поле не должно быть пустым!';
        }

        // Валидация email
        if (!formData.email) {
            validationErrors.email = 'Поле не должно быть пустым!';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            validationErrors.email = 'Введите корректный email!';
        }

        // Валидация телефона
        if (!formData.phone_number) {
            validationErrors.phone_number = 'Поле не должно быть пустым!';
        } else if (!/^\+?\d{10,15}$/.test(formData.phone_number)) {
            validationErrors.phone_number = 'Введите корректный телефон!';
        }

        // Валидация пароля
        if (!formData.password) {
            validationErrors.password = 'Поле не должно быть пустым!';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Пароль должен содержать не менее 6 символов!';
        }

        setErrors(validationErrors);

        // Если ошибок нет, можно отправлять форму
        if (Object.keys(validationErrors).length === 0) {
            // console.log('Форма валидна, данные отправлены:', formData);
            const token = localStorage.getItem('token');
            try {
                const res = await apiClient.post('/Customer', { 
                    Email: formData.email,
                    LastName: formData.last_name,
                    Password: formData.password,
                    FirstName: formData.first_name,
                    PhoneNumber: formData.phone_number
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                navigate('/login')
                // console.log(res);
            }
            catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className={`login-box`} style={{
            minHeight: useMediaQuery(`(max-width: ${widthLap})`) && '700px'
        }}>
            <div className="box-login" style={{ height: '610px' }}>
                <h2>Регистрация</h2>
                <form onSubmit={loginFunction} className="input-login" style={{ height: '543px' }}>
                    <div className="login-inputs">
                        <label htmlFor="input-name">Имя</label>
                        <input
                            type="text"
                            id="input-name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        {errors.first_name && <p style={{ color: 'red', position: 'absolute', bottom: '-17px' }}>{errors.first_name}</p>}
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-surname">Фамилия</label>
                        <input
                            type="text"
                            id="input-surname"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p style={{ color: 'red', position: 'absolute', bottom: '-17px' }}>{errors.last_name}</p>}
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-email">Email</label>
                        <input
                            type="text"
                            id="input-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{ color: 'red', position: 'absolute', bottom: '-17px' }}>{errors.email}</p>}
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-phone_number">Телефон</label>
                        <input
                            type="text"
                            id="input-phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        {errors.phone_number && <p style={{ color: 'red', position: 'absolute', bottom: '-17px' }}>{errors.phone_number}</p>}
                    </div>
                    <div className="login-inputs">
                        <label htmlFor="input-password">Пароль</label>
                        <input
                            type="password"
                            id="input-password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p style={{ color: 'red', position: 'absolute', bottom: '-17px' }}>{errors.password}</p>}
                    </div>
                    <button type="submit" className="button-login">
                        Создать
                    </button>
                    <div className="dop-options-login" style={{ justifyContent: 'center', gap: '10px' }}>
                        <p style={{ border: 'none' }}>Есть аккаунт?</p>
                        <p><Link to="/login">Войти</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
