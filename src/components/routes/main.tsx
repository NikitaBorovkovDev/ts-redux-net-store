import Banners from "../banners/banners";
import HeroSlider from "../heroSlider/heroSlider";
import NewArrivals from "../newArrivals/newArrivals";
import TopCategories from "../topCategories/topCategories";

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
