import {useState, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {
    changeQuantity,
    removeProductFromLocalStorage,
    selectLocalStorageProductsValue,
} from "components/app/cartSlice";
import {
    selectProductsStatus,
    selectProductsValue,
} from "components/app/productSlice";
import InputNumber from "rc-input-number";
import "./cartSideBar.scss";
import "./inputStyle.scss";
import Price from "components/commonComponents/price/Price";
import {CardType} from "interfaces";
import ButtonSolid from "components/commonComponents/buttonSolid/ButtonSolid";

const CartSideBar = (props: {
    onClose: () => void;
    parentRef: React.RefObject<HTMLSpanElement>;
}) => {
    const bgRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const cartData = useAppSelector(selectLocalStorageProductsValue);
    const productsData = useAppSelector(selectProductsValue);
    const status = useAppSelector(selectProductsStatus);
    const dispatch = useAppDispatch();

    const [cartElements, setCartElements] = useState<(JSX.Element | null)[]>(
        []
    );
    const [total, setTotal] = useState(0);
    const upHandler = (
        <div className="input-number-handler-inner input-number-handler-inner-up"></div>
    );
    const downHandler = (
        <div className="input-number-handler-inner input-number-handler-inner-down"></div>
    );

    useEffect(() => {
        if (status === "fulfilled") {
            let priceTotal = 0;

            let cartElements = cartData.map((cartProduct) => {
                const product = productsData.find(
                    (item) => item.id === cartProduct.id
                );
                if (!product) {
                    dispatch(
                        removeProductFromLocalStorage(cartProduct.productId)
                    );
                    return null;
                }

                priceTotal += +product.currentPrice;

                const cartKeys = cartProduct.selectedProductParams
                    ? Object.keys(cartProduct.selectedProductParams)
                    : null;

                let paramsBlock: (JSX.Element | null)[] = [null];

                if (cartKeys && cartProduct.selectedProductParams) {
                    paramsBlock = cartKeys.map((key, index) => {
                        const selectedProductParam =
                            cartProduct.selectedProductParams;
                        if (selectedProductParam) {
                            return (
                                <div key={index}>
                                    <span className="cart-side-bar__prop-key extrasmall-regular">
                                        {key}:
                                        <span className="cart-side-bar__prop-value extrasmall-regular">
                                            {` ${selectedProductParam[key]}`}
                                        </span>
                                    </span>
                                </div>
                            );
                        }
                        return null;
                    });
                }

                return (
                    <li
                        className="cart-side-bar__cart-item"
                        key={cartProduct.productId}>
                        <img
                            src={product.imageAndVideo[0].url}
                            alt=""
                            className="cart-side-bar__image"
                        />
                        <div className="cart-side-bar__desc">
                            <div className="cart-side-bar__text-container">
                                <h5 className="cart-side-bar__name small-bold">
                                    {product.name}
                                </h5>
                                {paramsBlock}
                                <div className="cart-side-bar__info">
                                    <InputNumber
                                        prefixCls="input-number"
                                        style={{width: 100}}
                                        min={1}
                                        max={99}
                                        onChange={(e) =>
                                            dispatch(
                                                changeQuantity({
                                                    productId:
                                                        cartProduct.productId,
                                                    quantity: e ? e : 0,
                                                })
                                            )
                                        }
                                        value={cartProduct.quantity}
                                        upHandler={upHandler}
                                        downHandler={downHandler}
                                    />
                                    <span className="cart-side-bar__price">
                                        <Price
                                            basePrice={product.basePrice}
                                            cardType={CardType.SMALL}
                                            currentPrice={product.currentPrice}
                                            discount={product.discount}
                                            fontSize={16}
                                            oldPriceMarginLeft={4}
                                        />
                                    </span>
                                </div>
                            </div>
                            <button
                                className="cart-side-bar__remove"
                                onClick={() => {
                                    dispatch(
                                        removeProductFromLocalStorage(
                                            cartProduct.productId
                                        )
                                    );
                                }}></button>
                        </div>
                    </li>
                );
            });
            setCartElements(cartElements);
            setTotal(priceTotal);
        }
    }, [status, cartData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node) &&
                props.parentRef.current &&
                !props.parentRef.current.contains(event.target as Node)
            ) {
                if (wrapperRef.current)
                    wrapperRef.current.style.right = "-105%";
                if (bgRef.current) bgRef.current.style.opacity = "0";
                setTimeout(() => {
                    props.onClose();
                }, 200);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        setTimeout(() => {
            if (wrapperRef.current) wrapperRef.current.style.right = "0";
            if (bgRef.current) bgRef.current.style.opacity = "0.6";
        }, 0);
    }, []);

    return (
        <div className="cart-side-bar">
            <div className="cart-side-bar__background" ref={bgRef}></div>
            <div className="cart-side-bar__wrapper" ref={wrapperRef}>
                <div className="cart-side-bar__header">
                    <h4 className="heading-5">Your cart ({cartData.length})</h4>
                    <button
                        onClick={props.onClose}
                        className="cart-side-bar__close"></button>
                </div>
                <ul className="cart-side-bar__cart-list">{cartElements}</ul>
                <div className="cart-side-bar__footer">
                    <div className="cart-side-bar__total-container">
                        <span className="base-regular cart-side-bar__subtotal">
                            Subtotal:
                        </span>
                        <span className="heading-5">${total.toFixed(2)}</span>
                    </div>
                    <ButtonSolid>
                        <span className="cart-side-bar__button-content">
                            <span className="cart-side-bar__button-icon"></span>
                            Checkout
                        </span>
                    </ButtonSolid>
                </div>
            </div>
        </div>
    );
};

export default CartSideBar;
