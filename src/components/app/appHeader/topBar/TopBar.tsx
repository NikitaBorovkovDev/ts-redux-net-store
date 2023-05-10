import ContactPhone from "../contactPhone/ContactPhone";
import LangChange from "../lang-change/Lang-change";
import Login from "../login/Login";

import "./topBar.scss";

const TopBar = () => {
    return (
        <div className="topBar">
            <div className="container small-regular topBar__container">
                <ContactPhone />
                <nav className="menu-secondary">
                    <a>Delivery & returns</a>
                    <a>Track order</a>
                    <a>Blog</a>
                    <a>Contacts</a>
                </nav>
                <div className="topBar__right-panel">
                    <LangChange>Eng / $</LangChange>
                    <Login>Log in / Register</Login>
                </div>
            </div>
        </div>
    );
};

export default TopBar;