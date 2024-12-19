import { useState } from 'react';
import PropTypes from 'prop-types';
import yandexDeliveryLogo from '../../../../../assets/icon/yandexDeliveryLogo.svg';
import cdekLogo from '../../../../../assets/icon/cdekLogo.svg';
import './styles.css';

export const DeliveryServices = ({ onChange }) => {
    const [selectedOption, setSelectedOption] = useState('cdek');

    const handleChange = (event) => {
        const newValue = event.target.value;

        setSelectedOption(newValue);
        onChange(newValue);
    };

    return (
        <div className="delivery-options">
            <div className="delivery-option">
                <input
                    type="radio"
                    id="cdek"
                    name="delivery"
                    value="cdek"
                    checked={selectedOption === 'cdek'}
                    onChange={handleChange}
                />
                <label className="delivery-option__label" htmlFor="cdek">
                    <div className="custom-radio"></div>
                    <div className="delivery-logo">
                        <span><img src={cdekLogo} /></span>
                    </div>
                </label>
            </div>

            <div className="delivery-option">
                <input
                    type="radio"
                    id="yandex"
                    name="delivery"
                    value="yandex"
                    checked={selectedOption === 'yandex'}
                    onChange={handleChange}
                />
                <label className="delivery-option__label" htmlFor="yandex">
                    <div className="custom-radio"></div>
                    <div className="delivery-logo">
                        <span><img src={yandexDeliveryLogo} /></span>
                    </div>
                </label>
            </div>
        </div>
    );
};

DeliveryServices.propTypes = {
    onChange: PropTypes.func.isRequired,
};

