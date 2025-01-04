import PropTypes from 'prop-types'
import {TextInput} from "../TextInput/index.jsx";
import './styles.css';

export const AddressForm = ({ onChange, onFormBlur }) => {
    const handleChange = (e) => onChange(e.target.name, e.target.value);

    return (
        <div className="address-form">
            <TextInput htmlFor="street" label="Улица, дом" type="text" name="street" className="input" onChange={handleChange} onBlur={onFormBlur} />
            <div className="address-form__inputs">
                <div className="address-form__input">
                    <TextInput htmlFor="apartment" label="Квартира или офис" type="text" name="apartment" onChange={handleChange} onBlur={onFormBlur} />
                </div>
                <div className="address-form__input">
                    <TextInput htmlFor="floor" label="Этаж" type="text" name="floor" onChange={handleChange} onBlur={onFormBlur} />
                </div>
                <div className="address-form__input">
                    <TextInput htmlFor="intercom" label="Домофон" type="text" name="intercom" onChange={handleChange} onBlur={onFormBlur} />
                </div>
                <div className="address-form__input">
                    <TextInput htmlFor="entrance" label="Подъезд" type="text" name="entrance" onChange={handleChange} onBlur={onFormBlur} />
                </div>
            </div>
        </div>
    );
}

AddressForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onFormBlur: PropTypes.func.isRequired,
}
