import TopBar from "../topBar/topBar";
import Navbar from "../navbar/navBar";
import "./header.scss";
import SpecialOffers from "../specialOffers/specialOffers";

const Header = () => {
    return (
        <header className="header">
            <TopBar></TopBar>
            <Navbar></Navbar>
            <SpecialOffers></SpecialOffers>
        </header>
    );
};

export default Header;
