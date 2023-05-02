import "./login.scss";

import {IProps} from "../../interfaces";

const Login = (props: IProps) => {
    return (
        <a className="login small-regular">
            <span className="login__text">{props.children}</span>
        </a>
    );
};

export default Login;
