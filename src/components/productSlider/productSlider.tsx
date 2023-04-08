import {useEffect, useState} from "react";
import Swiper, {Pagination} from "swiper";
import fetchProducts, {ProductFilter} from "../../services/fetchProducts";
import ProductCard from "../productCard/productCard";
import {URL_PRODUCTS} from "../../usedUrls";

import "swiper/css";
import "./productSlider.scss";
import {CardType} from "../productCard/productCard";

const ProductSlider = () => {
    const [slides, setSlides] = useState<JSX.Element[] | null>(null);
    // const lazyImage = () => (
    //     <LazyLoadImage
    //         alt={image.alt}
    //         height={image.height}
    //         src={image.src} // use normal <img> attributes as props
    //         width={image.width} />
    // )

    const loadingProductSlide = async () => {
        let productsData = await fetchProducts(
            URL_PRODUCTS,
            36,
            ProductFilter.ALL
        );
        if (!productsData) {
            throw new Error("fetch error");
        }
        let products = productsData.map((product, index) => {
            return (
                <div className="swiper-slide" key={index}>
                    {ProductCard(product, CardType.SMALL)}
                </div>
            );
        });
        setSlides(products);
    };

    useEffect(() => {
        // eslint-disable-next-line
        const swiper = new Swiper(".product-slider .swiper", {
            modules: [Pagination],
            spaceBetween: 30,
            simulateTouch: false,
            slidesPerGroup: 6,
            slidesPerView: 6,
            pagination: {
                el: ".product-slider .swiper-pagination",
                clickable: true,
            },
        });
        loadingProductSlide();
    }, []);

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
