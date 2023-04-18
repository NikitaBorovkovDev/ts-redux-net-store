import {Link} from "react-router-dom";

import "./navbar.scss";
import Logo from "../../img/logo.svg";
import MenuList from "../menuList/MenuList";
import SearchField from "../searchField/SearchField";
import Divider from "../divider/Divider";
import Wishlist from "../wishlist/Wishlist";
import Cart from "../cart/Cart";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container navbar__container">
                <Link to="/" className="navbar__logo">
                    <img src={Logo} alt="" />
                </Link>
                <nav className="navbar__menu">
                    <MenuList />
                </nav>
                <SearchField />
                <div className="navbar__toolbar">
                    <Wishlist />
                    <Divider />
                    <Cart />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
