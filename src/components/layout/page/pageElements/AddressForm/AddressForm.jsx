import {TextInput} from "../TextInput/index.jsx";
import './styles.css';

export const AddressForm = () => (
        <div className="address-form">
            <TextInput htmlFor="street" label="Улица, дом" type="text" name="street" className="input" />
            <div className="address-form__inputs">
                <div className="address-form__input">
                    <TextInput htmlFor="apartment" label="Квартира или офис" type="text" name="apartment" />
                </div>
                <div className="address-form__input">
                    <TextInput htmlFor="floor" label="Этаж" type="text" name="floor" />
                </div>
                <div className="address-form__input">
                    <TextInput htmlFor="intercom" label="Домофон" type="text" name="intercom" />
                </div>
                <div className="address-form__input">
                    <TextInput htmlFor="entrance" label="Подъезд" type="text" name="entrance" />
                </div>
            </div>
        </div>
);
