import {useNavigate, useParams} from "react-router-dom";
import "./singlePage.scss";
import {useAppSelector} from "hooks/reduxHooks";
import {
    selectProductsStatus,
    selectProductsValue,
} from "components/app/productSlice";
import {useEffect, useState} from "react";
import {IProduct} from "interfaces";

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
    }, [status, id]);
    let renderContent = content ? (
        <div className="product-page container">
            <div className="product-page__title-container">
                <h2 className="product-page__title">{content.name}</h2>
                <span className="product-page__art-text">
                    {"Art. No."}
                    <span className="product-page__art-number">
                        {content.id}
                    </span>
                </span>
            </div>

            <div className="product-page__desc">
                <img
                    width={600}
                    height={600}
                    src={content.imageAndVideo[0].url}
                    alt="image"
                />
            </div>
        </div>
    ) : null;
    return <div>{renderContent}</div>;
};

export default SinglePage;
