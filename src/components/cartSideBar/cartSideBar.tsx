import {useState, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {
    removeProductFromLocalStorage,
    selectLocalStorageProductsValue,
} from "../app/cartSlice";
import {selectProductsStatus, selectProductsValue} from "../app/productSlice";
import "./cartSideBar.scss";

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

    useEffect(() => {
        if (status === "fulfilled") {
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
                                    <span className="cart-side-bar__prop-key extraextrasmall-regular">
                                        {key}:
                                        <span className="cart-side-bar__prop-value extraextrasmall-regular">
                                            {selectedProductParam[key]}
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
                            </div>
                            <button className="cart-side-bar__remove">
                                &times;
                            </button>
                        </div>
                    </li>
                );
            });
            setCartElements(cartElements);
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
                    <button onClick={props.onClose}>&times;</button>
                </div>
                <ul className="cart-side-bar__cart-list">{cartElements}</ul>
                <div className="cart-side-bar__footer">
                    <span className="base-regular"></span>
                    <span className="heading-5"></span>
                </div>
            </div>
        </div>
    );
};

export default CartSideBar;
