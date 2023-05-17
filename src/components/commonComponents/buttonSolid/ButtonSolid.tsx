import PropTypes from "prop-types";
import "./buttonSolid.scss";
import clsx from "clsx";

type Props = {
    children: string | JSX.Element;
    onClick?: (e?: React.MouseEvent) => any;
    addedClasses: string;
};

const ButtonSolid = (props: Props) => {
    return (
        <button
            className={clsx("btn btn-solid ", props.addedClasses)}
            onClick={props.onClick}>
            <span className="btn__text btn__text-solid">{props.children}</span>
        </button>
    );
};

ButtonSolid.defaultProps = {
    children: "button",
    addedClasses: "",
};
ButtonSolid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default ButtonSolid;
