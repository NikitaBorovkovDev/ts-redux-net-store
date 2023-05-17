import {useEffect, useRef, useState} from "react";
import "./searchField.scss";
import {useAppSelector} from "hooks/reduxHooks";
import {
    selectProductsStatus,
    selectProductsValue,
} from "components/app/productSlice";
import {Link, useNavigate} from "react-router-dom";
import Price from "components/commonComponents/price/Price";
import {CardType} from "interfaces";
import {IProduct} from "interfaces";

interface INewProduct extends IProduct {
    newName: JSX.Element;
}

const SearchField = () => {
    const [value, setValue] = useState("");
    const [foundElements, setFoundElements] = useState<JSX.Element[] | null>(
        null
    );
    const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const resultFieldRef = useRef<HTMLDivElement>(null);
    const searchFieldRef = useRef<HTMLDivElement>(null);

    const products = useAppSelector(selectProductsValue);
    const status = useAppSelector(selectProductsStatus);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        };
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".search-field")) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (value.length > 0) {
            if (status === "fulfilled") {
                const foundProducts: (INewProduct | null)[] = products.map(
                    (item) => {
                        const str = item.name;
                        const subString = value;

                        if (
                            str
                                .toLowerCase()
                                .indexOf(subString.toLowerCase()) !== -1
                        ) {
                            const regExp1 = new RegExp(`(${subString})`, "gi");
                            const parts = str.split(regExp1);
                            return {
                                ...item,
                                newName: (
                                    <span className="search-field__result-text">
                                        {parts.map((part, index) =>
                                            regExp1.test(part) ? (
                                                <span
                                                    key={index}
                                                    className="search-field__result-string">
                                                    {part}
                                                </span>
                                            ) : (
                                                part
                                            )
                                        )}
                                    </span>
                                ),
                            };
                        }
                        return null;
                    }
                );
                const foundProductsWithoutNull = foundProducts.filter(
                    (item): item is INewProduct => {
                        return item !== null;
                    }
                );
                setFoundElements(
                    foundProductsWithoutNull.map((item, index) => {
                        if (selectedElementIndex === index)
                            setSelectedUrl(`/${item.id}`);
                        return (
                            <Link
                                tabIndex={-1}
                                className="search-field__result-list-item"
                                relative="path"
                                key={item.id}
                                to={`/shop/${item.id}`}
                                style={
                                    selectedElementIndex === index
                                        ? {border: "1px solid #000"}
                                        : {}
                                }>
                                <img
                                    className="search-field__result-img"
                                    src={item.imageAndVideo[0].url}
                                    alt=""
                                />
                                <span className="search-field__result-text">
                                    {item.newName}
                                </span>

                                <Price
                                    basePrice={item.basePrice}
                                    cardType={CardType.SMALL}
                                    currentPrice={item.currentPrice}
                                    discount={item.discount}
                                    fontSize={14}
                                    oldPriceMarginLeft={0}
                                />
                            </Link>
                        );
                    })
                );
            }
        } else {
            setFoundElements(
                products.map((item, index) => {
                    if (selectedElementIndex === index)
                        setSelectedUrl(`/${item.id}`);
                    return (
                        <Link
                            tabIndex={-1}
                            className="search-field__result-list-item"
                            relative="path"
                            key={item.id}
                            to={`/shop/${item.id}`}
                            style={
                                selectedElementIndex === index
                                    ? {border: "1px solid #000"}
                                    : {}
                            }>
                            <img
                                className="search-field__result-img"
                                src={item.imageAndVideo[0].url}
                                alt=""
                            />
                            <span className="search-field__result-text">
                                {item.name}
                            </span>

                            <Price
                                basePrice={item.basePrice}
                                cardType={CardType.SMALL}
                                currentPrice={item.currentPrice}
                                discount={item.discount}
                                fontSize={14}
                                oldPriceMarginLeft={0}
                            />
                        </Link>
                    );
                })
            );
        }
    }, [status, value, selectedElementIndex]);

    return (
        <div className="search-field" ref={searchFieldRef}>
            <input
                type="text"
                className="search-field__input"
                name="searchInput"
                autoComplete="off"
                onKeyDown={(e) => {
                    switch (e.key) {
                        case "ArrowUp":
                            e.preventDefault();
                            if (selectedElementIndex !== -1 && foundElements)
                                setSelectedElementIndex(
                                    (prevIndex) => prevIndex - 1
                                );
                            break;
                        case "ArrowDown":
                            e.preventDefault();
                            if (
                                foundElements &&
                                foundElements.length - 1 > selectedElementIndex
                            ) {
                                console.log(foundElements.length - 1);
                                console.log(selectedElementIndex);
                                setSelectedElementIndex(
                                    (prevIndex) => prevIndex + 1
                                );
                            }
                            break;
                        case "Enter":
                            e.preventDefault();
                            console.log(selectedElementIndex);
                            console.log(selectedUrl);
                            if (selectedUrl && selectedElementIndex !== -1)
                                navigate(selectedUrl);
                            break;
                        default:
                            break;
                    }
                }}
                placeholder="Search for products..."
                onChange={(e) => {
                    setSelectedElementIndex(-1);
                    setSelectedUrl(null);
                    setValue(e.target.value);
                }}
                onFocus={() => setMenuOpen(true)}
                id="searchInput"
                value={value}
                onBlur={() => setMenuOpen(false)}
            />
            <div
                ref={resultFieldRef}
                onMouseDown={(e) => e.preventDefault()}
                style={menuOpen ? {display: "block"} : {display: "none"}}
                className="search-field__results-list">
                {foundElements}
            </div>
        </div>
    );
};

export default SearchField;
