import {useEffect, useState} from "react";
import Swiper, {Pagination, A11y} from "swiper";
import sortProducts, {ProductFilter} from "services/sortProducts";
import ProductCard from "components/commonComponents/productCard/ProductCard";

import "swiper/css";
import "./productSlider.scss";
import {CardType} from "interfaces";
import {
    selectProductsStatus,
    selectProductsValue,
} from "components/app/productSlice";
import {useAppSelector} from "hooks/reduxHooks";

const ProductSlider = () => {
    const [slides, setSlides] = useState<JSX.Element[] | null>(null);
    const status = useAppSelector(selectProductsStatus);
    const products = useAppSelector(selectProductsValue);

    useEffect(() => {
        // eslint-disable-next-line
        const swiper = new Swiper(".product-slider .swiper", {
            modules: [Pagination, A11y],
            spaceBetween: 30,
            simulateTouch: false,
            slidesPerGroup: 6,
            slidesPerView: 6,
            pagination: {
                el: ".product-slider .swiper-pagination",
                clickable: true,
            },
        });
    }, []);

    useEffect(() => {
        if (status === "fulfilled") {
            let productsData = sortProducts(products, 12, ProductFilter.ALL);

            let productsSlides = productsData.map((product, index) => {
                return (
                    <div className="swiper-slide" key={index}>
                        <ProductCard
                            product={product}
                            cardType={CardType.SMALL}
                        />
                    </div>
                );
            });
            setSlides(productsSlides);
        }
    }, [status, products]);

    let content = slides ? slides : null;
    return (
        <div className="product-slider">
            <div className="swiper">
                <div className="swiper-wrapper">{content}</div>

                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
};

export default ProductSlider;
