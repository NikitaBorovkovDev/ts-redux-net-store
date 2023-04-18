import "./cartSideBar.scss";

const CartSideBar = () => {
    return (
        <div className="cart-side-bar">
            <div className="cart-side-bar__header">
                <h5 className="heading-5"></h5>
                <button>&times;</button>
            </div>

            <div className="cart-side-bar__footer">
                <span className="base-regular"></span>
                <span className="heading-5"></span>
            </div>
        </div>
    );
};

export default CartSideBar;
