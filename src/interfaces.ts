export interface IProps {
    children: React.ReactNode | string;
}
export interface IProduct {
    id: string;
    name: string;
    type: string;
    imageAndVideo: {url: string}[];
    basePrice: string;
    currentPrice: string;
    discount: string;
    params: IProductParams;
    rating: string;
}

export interface IChange {
    productId: string;
    quantity: number;
}
export enum CardType {
    SMALL = "small",
    LARGE = "large",
}
export enum BannerType {
    Default,
    SubscribeForm,
}
export interface IProductParams {
    [key: string]: {paramsName: string; value: string[]};
}

export interface IStorageProduct {
    productId: string;
    id: string;
    selectedProductParams?: {[key: string]: string};
    quantity: number;
}
