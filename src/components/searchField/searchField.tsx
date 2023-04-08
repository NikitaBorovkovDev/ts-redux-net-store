import "./searchField.scss";

const SearchField = () => {
    return (
        <input
            type="text"
            className="search-input"
            name="searchInput"
            placeholder="Search for products..."
        />
    );
};

export default SearchField;
