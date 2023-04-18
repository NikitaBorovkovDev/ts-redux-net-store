import TopBar from "../topBar/TopBar";
import Navbar from "../navbar/NavBar";
import "./header.scss";
import SpecialOffers from "../specialOffers/SpecialOffers";

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
