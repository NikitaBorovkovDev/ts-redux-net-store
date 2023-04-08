import spinnerIcon from "../../img/spinner.svg";
import "./spinner.scss";

const Spinner = () => {
    return (
        <div className="spinner-container">
            <img src={spinnerIcon} alt="loading" />
        </div>
    );
};

export default Spinner;
