import {useEffect, useState} from "react";
import "./lang-change.scss";
import {IProps} from "../../interfaces";

const LangChange = (props: IProps) => {
    const [arrowDown, setArrowDown] = useState(true);
    let arrowDirectionClass = `arrow ${arrowDown ? "" : "lang-menu-open"}`;
    useEffect(() => {
        const onClick = (e: any) => {
            if (!e.target.closest(".lang-change-container")) {
                setArrowDown(true);
            }
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);
    return (
        <button
            className="lang-change-container"
            onClick={() => setArrowDown(!arrowDown)}>
            <span className="lang-change-container__text small-regular">
                {props.children}
            </span>
            <span className={arrowDirectionClass}></span>
        </button>
    );
};

export default LangChange;
