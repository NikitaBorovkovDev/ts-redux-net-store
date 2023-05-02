import men from "../../img/manCategories_1x.jpg";
import women from "../../img/womanCategories_1x.jpg";
import kid from "../../img/kidsCategories_1x.jpg";
import "./topCategories.scss";

const TopCategories = () => {
    return (
        <section>
            <div className="top-categories">
                <div className="top-categories__category-card">
                    <img className="top-categories__image" src={men} alt="" />
                    <h2 className="top-categories__text lead-bold">Women’s</h2>
                </div>
                <div className="top-categories__category-card">
                    <img className="top-categories__image" src={women} alt="" />
                    <h2 className="top-categories__text lead-bold">Men’s</h2>
                </div>
                <div className="top-categories__category-card">
                    <img className="top-categories__image" src={kid} alt="" />
                    <h2 className="top-categories__text lead-bold">Kid’s</h2>
                </div>
            </div>
        </section>
    );
};

export default TopCategories;
