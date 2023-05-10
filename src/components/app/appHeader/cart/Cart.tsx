import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useAppSelector} from "hooks/reduxHooks";
import "./cart.scss";
import {selectLocalStorageProductsValue} from "components/app/cartSlice";
import CartSideBar from "../cartSideBar/CartSideBar";

const Cart = () => {
    const cartRef = useRef<HTMLSpanElement>(null);
    const [length, setLength] = useState(0);
    const [showModalCart, setModalCart] = useState(false);
    const productsIsStorage = useAppSelector(selectLocalStorageProductsValue);

    useEffect(() => {
        setLength(productsIsStorage.length);
    }, [productsIsStorage]);

    useEffect(() => {
        if (showModalCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        return () => {
            document.body.style.overflow = "visible";
        };
    }, [showModalCart]);

    return (
        <>
            <span
                ref={cartRef}
                className="cart"
                onClick={() => setModalCart(true)}>
                <span className="cart__text">{length}</span>
            </span>
            {showModalCart &&
                createPortal(
                    <CartSideBar
                        onClose={() => setModalCart(false)}
                        parentRef={cartRef}
                    />,
                    document.body
                )}
        </>
    );
};

export default Cart;
