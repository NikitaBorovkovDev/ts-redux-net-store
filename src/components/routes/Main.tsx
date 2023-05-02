import Banners from "../banners/Banners";
import HeroSlider from "../heroSlider/HeroSlider";
import NewArrivals from "../newArrivals/NewArrivals";
import TopCategories from "../topCategories/TopCategories";

const MainRoot = () => {
    return (
        <>
            <HeroSlider />
            <TopCategories />
            <NewArrivals />
            <Banners />
        </>
    );
};

export default MainRoot;
