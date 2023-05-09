import clsx from "clsx";
import ButtonSolid from "../buttonSolid/ButtonSolid";
import "./productCard.scss";
import {CardType, IProduct} from "interfaces";
import {
    addProductToLocalStorage,
    removeProductFromLocalStorage,
    selectLocalStorageProductsValue,
} from "../../app/cartSlice";
import {useAppSelector, useAppDispatch} from "../../../hooks/reduxHooks";
import {useEffect, useRef, useState} from "react";
import Price from "../price/Price";
import {Link} from "react-router-dom";

interface IProductCard {
    product: IProduct;
    cardType: CardType;
}

const ProductCard = (props: IProductCard) => {
    const productsLocalStorageData = useAppSelector(
        selectLocalStorageProductsValue
    );
    const dispatch = useAppDispatch();
    const [selectedParams, setSelectedParams] = useState<{
        [key: string]: string;
    }>({});

    const nameRef = useRef<HTMLParagraphElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const defaultHeight = 27;
    const {product, cardType} = props;
    const propsValues = selectedParams ? Object.values(selectedParams) : null;
    const sortedValue = propsValues
        ? propsValues.sort((a, b) =>
              a.toLowerCase().localeCompare(b.toLowerCase(), "en")
          )
        : null;

    const productId = sortedValue
        ? `${product.id}+${sortedValue.join("+")}`
        : product.id;

    const isInStorage = productsLocalStorageData.find(
        (productInStorage) => productId === productInStorage.productId
    );

    const handleAddProductToLocalStorage = () => {
        const quantity = 1;
        const {id} = product;

        isInStorage
            ? dispatch(removeProductFromLocalStorage(productId))
            : dispatch(
                  addProductToLocalStorage({
                      productId,
                      id,
                      quantity,
                      selectedProductParams: selectedParams,
                  })
              );
    };

    let colorElements: JSX.Element | null = null;
    let paramsElements: JSX.Element | null = null;

    if (product.params) {
        if (product.params.color) {
            let productValue = product.params.color.value;
            colorElements = (
                <ul className="product-card__color-list">
                    {productValue.map((color, index) => (
                        <li
                            key={index}
                            className={
                                color === selectedParams.color
                                    ? "product-card__color-list-item product-card__selected"
                                    : "product-card__color-list-item"
                            }
                            onClick={() =>
                                color === selectedParams.color
                                    ? setSelectedParams((prevState) => {
                                          let oldState = {...prevState};
                                          delete oldState.color;
                                          return oldState;
                                      })
                                    : setSelectedParams((oldParams) => ({
                                          ...oldParams,
                                          color: color,
                                      }))
                            }>
                            <span
                                className="product-card__color"
                                style={{backgroundColor: color}}></span>
                        </li>
                    ))}
                </ul>
            );
        }

        const productsParamsKeys = Object.keys(product.params).filter(
            (item) => item !== "color"
        );
        if (productsParamsKeys.length > 0) {
            productsParamsKeys.map((productsParamsKey) => {
                if (product.params) {
                    paramsElements = (
                        <ul className="product-card__prop-list">
                            {product.params[productsParamsKey].value.map(
                                (size, index) => (
                                    <li
                                        key={index}
                                        className={
                                            size ===
                                            selectedParams[
                                                product.params![
                                                    productsParamsKey
                                                ].paramsName
                                            ]
                                                ? "product-card__prop-list-item product-card__selected"
                                                : "product-card__prop-list-item"
                                        }
                                        onClick={() =>
                                            size ===
                                            selectedParams[
                                                product.params![
                                                    productsParamsKey
                                                ].paramsName
                                            ]
                                                ? setSelectedParams(
                                                      (prevState) => {
                                                          let oldState = {
                                                              ...prevState,
                                                          };
                                                          delete oldState[
                                                              product.params![
                                                                  productsParamsKey
                                                              ].paramsName
                                                          ];
                                                          return oldState;
                                                      }
                                                  )
                                                : setSelectedParams(
                                                      (oldParams) => ({
                                                          ...oldParams,
                                                          [product.params![
                                                              productsParamsKey
                                                          ].paramsName]: size,
                                                      })
                                                  )
                                        }>
                                        {size}
                                    </li>
                                )
                            )}
                        </ul>
                    );
                }
            });
        }
    }
    useEffect(() => {
        if (product.id === "6") console.log("render!");
    });

    const productNameCut = (name: string) => {
        const nameDivided = name.split(" ");
        let returnName = "";
        let maxLength = 33;
        let currentLength = 0;
        let i = 0;
        do {
            if (!nameDivided[i]) break;
            if ((returnName + " " + nameDivided[i]).length > maxLength) {
                return (returnName += "...");
            }
            returnName += " " + nameDivided[i];

            currentLength += nameDivided[i].length + 1;
            ++i;
        } while (currentLength < maxLength);
        return returnName;
    };

    const handleTitleMouseHover = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        console.log(e.type);
        if (nameRef.current && cardRef.current) {
            if (e.type === "mouseover") {
                nameRef.current.textContent = product.name;
                cardRef.current.style.height = `${
                    nameRef.current.getBoundingClientRect().height
                }px`;
            } else if (e.type === "mouseout") {
                cardRef.current.style.height = `${defaultHeight}px`;
                setTimeout(() => {
                    if (nameRef.current)
                        nameRef.current.textContent = productNameCut(
                            product.name
                        );
                }, 150);
            }
        }
    };

    return (
        <div
            className={clsx("product-card", `${cardType}-card`)}
            key={product.id}>
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
                        <Link to={`/${product.id}`}>
                            <div
                                onMouseOver={(e) => handleTitleMouseHover(e)}
                                onMouseOut={(e) => handleTitleMouseHover(e)}
                                ref={cardRef}
                                style={{height: `${defaultHeight}px`}}
                                className="product-card__title">
                                <p
                                    ref={nameRef}
                                    style={{lineHeight: `${defaultHeight}px`}}
                                    className="large-regular product-card__title-text">
                                    {productNameCut(product.name)}
                                </p>
                            </div>
                        </Link>
                        <Price
                            basePrice={product.basePrice}
                            cardType={cardType}
                            currentPrice={product.currentPrice}
                            discount={product.discount}
                        />
                    </div>
                    <div className="product-card__add-menu">
                        <div className="product-card__add-menu-container">
                            <div className="product-card__properties">
                                {paramsElements}
                                {colorElements}
                            </div>
                            <ButtonSolid
                                onClick={handleAddProductToLocalStorage}>
                                {!isInStorage
                                    ? "Add to cart"
                                    : "Remove from cart"}
                            </ButtonSolid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
