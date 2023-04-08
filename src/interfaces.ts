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
    size: string;
    color: string;
    rating: string;
}
