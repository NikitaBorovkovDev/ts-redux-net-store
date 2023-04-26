import {redirect, useNavigate, useParams} from "react-router-dom";
import "./singlePage.scss";
import {useAppSelector} from "../../../hooks/reduxHooks";
import {
    selectProductsStatus,
    selectProductsValue,
} from "../../app/productSlice";
import {useEffect, useState} from "react";
import {IProduct} from "../../../interfaces";

const SinglePage = () => {
    const [content, setContent] = useState<IProduct | null>(null);
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const status = useAppSelector(selectProductsStatus);
    const products = useAppSelector(selectProductsValue);

    useEffect(() => {
        if (status === "fulfilled") {
            const currentProduct = products.find(
                (product) => product.id === id
            );
            console.log(currentProduct);
            if (!currentProduct) {
                navigate("/shop/404-not-found");
            } else {
                setContent(currentProduct);
            }
        }
    }, [status]);
    let renderContent = content ? (
        <>
            <div>
                <h1>{content.name}</h1>
                <span>{`Art. No. ${content.id}`}</span>
            </div>
            <div>
                <img src={content.imageAndVideo[0].url} alt="image" />
            </div>
        </>
    ) : null;
    return <div>{renderContent}</div>;
};

export default SinglePage;
