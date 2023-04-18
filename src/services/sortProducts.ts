import generateUniqueRandomNumbers from "./generateUniqueRandomNumbers";
import {IProduct} from "../interfaces";

export enum ProductFilter {
    ALL = "all",
    WITHOUTDISCOUNT = "withoutDiscount",
    WITHDISCOUNT = "withDiscount",
}

const sortProducts = (
    products: IProduct[],
    quantity: number = 1,
    filter: ProductFilter = ProductFilter.ALL
) => {
    if (quantity < 1) {
        console.error(`quantity < 1 \n${quantity}`);
        quantity = 1;
    }
    if (
        filter !== ProductFilter.ALL &&
        filter !== ProductFilter.WITHOUTDISCOUNT &&
        filter !== ProductFilter.WITHDISCOUNT
    ) {
        console.warn(
            `fetchProducts wrong argument. filter should be equal to: 'all' - default value | 'withoutDiscount' | 'withDiscount') \n filter=${filter}`
        );
        filter = ProductFilter.ALL;
    }

    if (filter !== ProductFilter.ALL) {
        if (filter === ProductFilter.WITHDISCOUNT) {
            products = products.filter((item) => {
                if (item.discount !== "0") {
                    return item;
                }
                return false;
            });
        } else if (filter === ProductFilter.WITHOUTDISCOUNT) {
            products = products.filter((item) => {
                if (item.discount === "0") {
                    return item;
                }
                return false;
            });
        }
    }

    const randomProducts = generateUniqueRandomNumbers(
        quantity,
        products.length - 1
    );
    if (!randomProducts) {
        throw new Error(
            `generateUniqueRandomNumbers error arg = (quantity = ${quantity}, productData.length - 1 = ${
                products.length - 1
            })`
        );
    }
    const productsArr = randomProducts.map((i) => {
        return products[i];
    });
    return productsArr;
};

export default sortProducts;
