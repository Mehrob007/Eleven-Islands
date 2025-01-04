import PropTypes from 'prop-types';
import './styles.css';

export const RadioGroup = ({ onChange, currentValue, radios }) => {

    const handleChange = (event) => {
        const newValue = event.target.value;

        onChange(newValue);
    };

    return (
        <div className="radio-group">
            {radios.map(({ value, icon }) => (
                <div key={value} className="radio-group__item">
                    <input
                        type="radio"
                        id={value}
                        value={value}
                        checked={currentValue === value}
                        onChange={handleChange}
                    />
                    <label className="radio-group__label" htmlFor={value}>
                        <div className="custom-radio"></div>
                        <div className="radio-group__logo">
                            <span><img src={icon}/></span>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioGroup.propTypes = {
    radios: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    currentValue: PropTypes.string.isRequired,
};

