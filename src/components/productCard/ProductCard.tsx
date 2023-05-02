import clsx from "clsx";
import ButtonSolid from "../buttonSolid/ButtonSolid";
import "./productCard.scss";
import {IProduct} from "../../interfaces";
import {
    addProductToLocalStorage,
    removeProductFromLocalStorage,
    selectLocalStorageProductsValue,
} from "../app/cartSlice";
import {useAppSelector, useAppDispatch} from "../../hooks/reduxHooks";
import {useState} from "react";

export enum CardType {
    SMALL = "small",
    LARGE = "large",
}

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

    const {product, cardType} = props;

    const handleAddProductToLocalStorage = (
        id: string,
        selectedProductParams: {[key: string]: string} | undefined
    ) => {
        const propsValues = selectedProductParams
            ? Object.values(selectedProductParams)
            : null;
        const sortedValue = propsValues
            ? propsValues.sort((a, b) =>
                  a.toLowerCase().localeCompare(b.toLowerCase(), "en")
              )
            : null;

        const productId = sortedValue ? `${id}+${sortedValue.join("+")}` : id;
        const isInStorage = productsLocalStorageData.find(
            (productInStorage) => productId === productInStorage.productId
        );
        isInStorage
            ? dispatch(removeProductFromLocalStorage(productId))
            : dispatch(
                  addProductToLocalStorage({
                      productId,
                      id,
                      selectedProductParams,
                  })
              );
    };

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

    let colorElements: JSX.Element | null = null;
    if (product.params?.color) {
        if (product.params.color.value.length === 1) {
            let productValue = product.params.color.value[0];
            if (selectedParams.color !== product.params.color.value[0]) {
                setSelectedParams((oldParams) => ({
                    ...oldParams,
                    color: productValue,
                }));
            }
            colorElements = (
                <ul className="product-card__color-list">
                    <li className="product-card__color-list-item product-card__selected">
                        <span
                            className="product-card__color"
                            style={{backgroundColor: productValue}}></span>
                    </li>
                </ul>
            );
        } else {
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
    }

    let paramsElements: JSX.Element | null = null;
    let productsParams = {...product.params};

    if (productsParams.color) {
        delete productsParams.color;
    }

    let productsParamsKeys = Object.keys(productsParams);
    if (productsParamsKeys.length > 0) {
        productsParamsKeys.map((productsParamsKey) => {
            if (productsParams[productsParamsKey].value.length === 1) {
                if (
                    selectedParams[
                        productsParams[productsParamsKey].paramsName
                    ] !== productsParams[productsParamsKey].value[0]
                ) {
                    setSelectedParams((oldParams) => ({
                        ...oldParams,
                        [productsParams[productsParamsKey].paramsName]:
                            productsParams[productsParamsKey].value[0],
                    }));
                }

                paramsElements = (
                    <ul className="product-card__size-list">
                        <li className="product-card__size-list-item product-card__selected">
                            {productsParams[productsParamsKey].value[0]}
                        </li>
                    </ul>
                );
            } else {
                paramsElements = (
                    <ul className="product-card__size-list">
                        {productsParams[productsParamsKey].value.map(
                            (size, index) => (
                                <li
                                    key={index}
                                    className={
                                        size ===
                                        selectedParams[
                                            productsParams[productsParamsKey]
                                                .paramsName
                                        ]
                                            ? "product-card__size-list-item product-card__selected"
                                            : "product-card__size-list-item"
                                    }
                                    onClick={() =>
                                        size ===
                                        selectedParams[
                                            productsParams[productsParamsKey]
                                                .paramsName
                                        ]
                                            ? setSelectedParams((prevState) => {
                                                  let oldState = {...prevState};
                                                  delete oldState[
                                                      productsParams[
                                                          productsParamsKey
                                                      ].paramsName
                                                  ];
                                                  return oldState;
                                              })
                                            : setSelectedParams(
                                                  (oldParams) => ({
                                                      ...oldParams,
                                                      [productsParams[
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
                        {colorElements}
                        {paramsElements}
                    </div>
                    <ButtonSolid
                        onClick={() =>
                            handleAddProductToLocalStorage(
                                product.id,
                                Object.keys(selectedParams).length === 0
                                    ? undefined
                                    : selectedParams
                            )
                        }>
                        Add to cart
                    </ButtonSolid>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
