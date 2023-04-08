import PropTypes from "prop-types";
import "./buttonSolid.scss";

type Props = {
    children: string | JSX.Element;
};

const ButtonSolid = (props: Props) => {
    return (
        <button className="btn btn-solid">
            <span className="btn__text btn__text-solid">{props.children}</span>
        </button>
    );
};

ButtonSolid.defaultProps = {
    children: "button",
};
ButtonSolid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default ButtonSolid;
