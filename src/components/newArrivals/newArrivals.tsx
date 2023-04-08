import ProductSlider from "../productSlider/productSlider";
import "./newArrivals.scss";

const NewArrivals = () => {
    return (
        <section className="new-arrivals">
            <h2 className="heading-1 new-arrivals__heading">New arrivals</h2>
            <div className="new-arrivals__text-desc large-regular">
                Check out our latest arrivals for the upcoming season <br />
                <a href="" className="new-arrivals__link">
                    See the collection here
                </a>
            </div>
            <ProductSlider />
        </section>
    );
};

export default NewArrivals;
