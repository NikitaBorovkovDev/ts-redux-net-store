import { useNavigate, useParams } from 'react-router-dom';
import './singlePage.scss';
import { useAppSelector } from 'hooks/reduxHooks';
import {
	selectProductsStatus,
	selectProductsValue,
} from 'components/app/productSlice';
import { useEffect, useState } from 'react';
import { CardType, IProduct } from 'interfaces';
import ProductCard from 'components/commonComponents/productCard/ProductCard';
import ColorPicker from 'components/commonComponents/colorPicker/ColorPicker';
import Price from 'components/commonComponents/price/Price';

const SinglePage = () => {
	const [content, setContent] = useState<IProduct | null>(null);
	const [selectedParams, setSelectedParams] = useState<{
		[key: string]: string;
	}>({});
	const params = useParams();
	const navigate = useNavigate();
	const id = params.id;
	const status = useAppSelector(selectProductsStatus);
	const products = useAppSelector(selectProductsValue);

	useEffect(() => {
		if (status === 'fulfilled') {
			const currentProduct = products.find(
				(product) => product.id === id
			);
			if (!currentProduct) {
				navigate('/shop/404-not-found');
			} else {
				setContent(currentProduct);
			}
		}
	}, [status, id]);
	return (
		<div>
			{content ? (
				<div className="product-page container">
					<div className="product-page__title-container">
						<h2 className="product-page__title">{content.name}</h2>
						<span className="product-page__art-text">
							{'Art. No.'}
							<span className="product-page__art-number">
								{content.id}
							</span>
						</span>
					</div>

					<div className="product-page__desc">
						<ColorPicker
							product={content}
							selectedParams={selectedParams}
							setSelectedParams={setSelectedParams}
						/>
						<Price
							basePrice={content.basePrice}
							cardType={CardType.LARGE}
							currentPrice={content.currentPrice}
							discount={content.discount}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default SinglePage;
