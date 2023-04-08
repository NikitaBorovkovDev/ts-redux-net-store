import "./menuList.scss";
const MenuList = () => {
    return (
        <ul className="menu-list">
            <li className="menu-list__item">Women</li>
            <li className="menu-list__item">Men</li>
            <li className="menu-list__item">Girls</li>
            <li className="menu-list__item">Boys</li>
            <li className="menu-list__item danger-text">Sale</li>
        </ul>
    );
};

export default MenuList;
