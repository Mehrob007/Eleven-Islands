import PropTypes from "prop-types";
import "./styles.css";

export const InputLabel = ({ htmlFor, children }) => (
    <label className="input-label" htmlFor={htmlFor}>{children}</label>
)

InputLabel.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}