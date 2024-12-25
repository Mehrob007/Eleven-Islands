import { InputLabel } from "../InputLabel/index.jsx";
import './styles.css';

export const TextInput = (inputProps) => (
    <div className="text-input">
        <InputLabel htmlFor={inputProps.htmlFor}>{inputProps.label}</InputLabel>
        <input {...inputProps} type="text" className="text-input__input" />
    </div>
);
