import generateUniqueRandomNumbers from "./generateUniqueRandomNumbers";

export enum ProductFilter {
    ALL = "all",
    WITHOUTDISCOUNT = "withoutDiscount",
    WITHDISCOUNT = "withDiscount",
}

export interface IProduct {
    id: string;
    name: string;
    type: string;
    imageAndVideo: {url: string}[];
    basePrice: string;
    currentPrice: string;
    discount: string;
    size: string;
    color: string;
    rating: string;
}

// const Products: IProduct = {
//     id: "1",
//     name: "1",
//     type: "1",
//     imageAndVideo: [
//         {
//             url: "https://github.com/nickfluffybr/net_store/blob/master/fetch_img/product-image2.jpg?raw=true",
//         },
//         {
//             url: "https://github.com/nickfluffybr/net_store/blob/master/fetch_img/product-image.jpg?raw=true",
//         },
//     ],
//     basePrice: "31.00",
//     currentPrice: "15.50",
//     discount: "-50",
//     size: "36, 37, 38, 39, 40",
//     color: "pink, blue, yellow",
//     rating: "4.13",
// };

const fetchProducts = async (
    url: string,
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
    try {
        let response = await fetch(url);
        let productData: IProduct[] = await response.json();
        if (filter !== ProductFilter.ALL) {
            if (filter === ProductFilter.WITHDISCOUNT) {
                productData = productData.filter((item) => {
                    if (item.discount !== "0") {
                        return item;
                    }
                    return false;
                });
            } else if (filter === ProductFilter.WITHOUTDISCOUNT) {
                productData = productData.filter((item) => {
                    if (item.discount === "0") {
                        return item;
                    }
                    return false;
                });
            }
        }

        const randomProducts = generateUniqueRandomNumbers(
            quantity,
            productData.length - 1
        );
        if (!randomProducts) {
            throw new Error(
                `generateUniqueRandomNumbers error arg = (quantity = ${quantity}, productData.length - 1 = ${
                    productData.length - 1
                })`
            );
        }
        const productsArr = randomProducts.map((i) => {
            return productData[i];
        });
        return productsArr;
    } catch (error) {
        console.error("fetch error", error);
    }
};

export default fetchProducts;
