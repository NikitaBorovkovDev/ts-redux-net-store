import clsx from "clsx";
import addProductToLocalStorage from "../../services/addProductToLocalStorage";
import ButtonSolid from "../buttonSolid/buttonSolid";
import "./productCard.scss";
import {IProduct} from "../../services/fetchProducts";

export enum CardType {
    SMALL = "small",
    LARGE = "large",
}

const ProductCard = (
    product: IProduct,
    cardType: CardType = CardType.SMALL
) => {
    let price = (
        <div className="product-card__price-container">
            <div
                className={clsx(
                    "heading-5",
                    `product-card__price-current-${cardType}`
                )}>
                {product.currentPrice}
            </div>
        </div>
    );
    if (product.discount !== "0" && product.discount) {
        price = (
            <div className="product-card__price-container">
                <div
                    className={clsx(
                        "heading-5 product-card__price-current text-danger",
                        `product-card__price-current-${cardType}`
                    )}>
                    {product.currentPrice}
                </div>
                <div
                    className={clsx(
                        "product-card__price-old",
                        `product-card__price-old-${cardType}`
                    )}>
                    {product.basePrice}
                </div>
            </div>
        );
    }
    return (
        <div
            className={clsx("product-card", `${cardType}-card`)}
            key={product.id}
            onClick={() => {
                addProductToLocalStorage("products", product.id, {
                    size: 14,
                    color: "red",
                });
            }}>
            <img
                loading="lazy"
                className={clsx(
                    "product-card__img",
                    `product-card__img-${cardType}`
                )}
                src={product.imageAndVideo[0].url}
                alt=""
            />
            <div className="product-card__description-container">
                <div className="product-card__description-idle">
                    <div className="product-card__text">
                        <div className="large-regular product-card__title">
                            {product.name}
                        </div>
                        {price}
                    </div>
                </div>
                <div className="product-card__description-hover">
                    <div className="product-card__text">
                        <div className="large-regular product-card__title product-card__title-full">
                            {product.name}
                        </div>
                        {price}
                    </div>
                    <div className="product-card__properties">
                        <ul className="product-card__size-list">
                            <li className="product-card__size-list-item">xs</li>
                            <li className="product-card__size-list-item">s</li>
                            <li className="product-card__size-list-item">m</li>
                            <li className="product-card__size-list-item">l</li>
                            <li className="product-card__size-list-item">xl</li>
                        </ul>
                        <ul className="product-card__color-list">
                            <ul className="product-card__color-list-item">
                                <span
                                    className="product-card__color"
                                    style={{backgroundColor: "red"}}></span>
                            </ul>
                            <ul className="product-card__color-list-item">
                                <span
                                    className="product-card__color"
                                    style={{backgroundColor: "blue"}}></span>
                            </ul>
                            <ul className="product-card__color-list-item">
                                <span
                                    className="product-card__color"
                                    style={{backgroundColor: "yellow"}}></span>
                            </ul>
                        </ul>
                    </div>
                    <ButtonSolid>Add to cart</ButtonSolid>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
