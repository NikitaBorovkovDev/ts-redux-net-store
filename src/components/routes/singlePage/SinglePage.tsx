import { useNavigate, useParams } from 'react-router-dom';
import './singlePage.scss';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import {
	selectProductsStatus,
	selectProductsValue,
} from 'components/app/productSlice';
import { useEffect, useState } from 'react';
import { CardType, IProduct, IStorageProduct } from 'interfaces';
import 'components/commonComponents/productCard/productCard.scss';
import ProductCard from 'components/commonComponents/productCard/ProductCard';
import ColorPicker from 'components/commonComponents/colorPicker/ColorPicker';
import Price from 'components/commonComponents/price/Price';
import {
	addProductToLocalStorage,
	removeProductFromLocalStorage,
	selectLocalStorageProductsValue,
} from 'components/app/cartSlice';
import ButtonSolid from 'components/commonComponents/buttonSolid/ButtonSolid';
import ProductsParams from 'components/commonComponents/productsParams/ProductsParams';

const SinglePage = () => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [showWarning, setShowWarning] = useState(false);
	const [selectedParams, setSelectedParams] = useState<{
		[key: string]: string;
	}>({});

	const params = useParams();
	const navigate = useNavigate();
	const id = params.id;

	const status = useAppSelector(selectProductsStatus);
	const products = useAppSelector(selectProductsValue);
	const productsLocalStorageData = useAppSelector(
		selectLocalStorageProductsValue
	);
	const dispatch = useAppDispatch();

	let isInStorage: boolean = false;

	let productId: string | undefined;

	let warningMessage: string | null = null;

	if (product) {
		const propsValues = selectedParams
			? Object.values(selectedParams)
			: null;

		const sortedValue = propsValues
			? propsValues.sort((a, b) =>
					a.toLowerCase().localeCompare(b.toLowerCase(), 'en')
			  )
			: null;

		productId = sortedValue
			? `${product.id}+${sortedValue.join('+')}`
			: product.id;

		isInStorage = !!productsLocalStorageData.find(
			(productInStorage) => productId === productInStorage.productId
		);

		const requiredParamsKeys = Object.keys(product.params).filter(
			(item) => !Object.keys(selectedParams).includes(item)
		);
		const lastParams = requiredParamsKeys.pop();

		warningMessage =
			'pick ' +
			requiredParamsKeys.join(', ') +
			(requiredParamsKeys.length ? ' and ' : '') +
			lastParams;
	}

	useEffect(() => {
		if (
			product &&
			Object.keys(product.params).length ===
				Object.keys(selectedParams).length &&
			showWarning === true
		) {
			setShowWarning(false);
		}
	}, [selectedParams]);

	const handleAddProductToLocalStorage = () => {
		const quantity = 1;
		if (product && productId) {
			const { id } = product;

			isInStorage
				? dispatch(removeProductFromLocalStorage(productId))
				: dispatch(
						addProductToLocalStorage({
							productId,
							id,
							quantity,
							selectedProductParams: selectedParams,
						})
				  );
		}
	};

	useEffect(() => {
		if (status === 'fulfilled') {
			const currentProduct = products.find(
				(product) => product.id === id
			);
			if (!currentProduct) {
				navigate('/shop/404-not-found');
			} else {
				setProduct(currentProduct);
			}
		}
	}, [status, id]);

	const handleClick = (
		e: React.MouseEvent<Element, MouseEvent> | undefined
	) => {
		if (product) {
			if (
				Object.keys(product.params).length !==
				Object.keys(selectedParams).length
			) {
				setShowWarning(true);
				const target = e!.currentTarget as HTMLButtonElement;
				console.log(target);
				target.animate(
					[
						{
							transform: 'translateX(5%)',
							offset: 0.15,
						},
						{
							transform: 'translateX(-5%)',
							offset: 0.3,
						},
						{
							transform: 'translateX(3%)',
							offset: 0.45,
						},
						{
							transform: 'translateX(-3%)',
							offset: 0.6,
						},
						{
							transform: 'translateX(1%)',
							offset: 0.75,
						},
						{
							transform: 'translateX(-1%)',
							offset: 0.85,
						},
						{
							transform: 'translateX(0)',
						},
					],
					{
						duration: 500,
						iterations: 1,
					}
				);
			} else {
				handleAddProductToLocalStorage();
			}
		}
	};

	return (
		<div>
			{product ? (
				<div className="product-page container">
					<div className="product-page__title-container">
						<h2 className="product-page__title">{product.name}</h2>
						<span className="product-page__art-text">
							{'Art. No.'}
							<span className="product-page__art-number">
								{product.id}
							</span>
						</span>
					</div>

					<div className="product-page__desc">
						<img
							width={600}
							height={600}
							src={product.imageAndVideo[0].url}
							alt="product image"
						/>
						<div className="product-page__props-container">
							<div className="product-page__props-container-left">
								<Price
									classNameContainer="product-page__price"
									basePrice={product.basePrice}
									cardType={CardType.LARGE}
									currentPrice={product.currentPrice}
									discount={product.discount}
								/>

								{product.params.color ? (
									<div>
										<h4 className="product-page__props-title">
											{product.params.color.paramsName}
										</h4>
										<div className="product-page__props-color-container">
											<ColorPicker
												product={product}
												selectedParams={selectedParams}
												setSelectedParams={
													setSelectedParams
												}
											/>
											<span className="product-page__props-selected-color-text">
												{selectedParams.color
													? selectedParams.color
													: null}
											</span>
										</div>
									</div>
								) : null}
								<ProductsParams
									addTitle={true}
									classNameTitle="product-page__props-title"
									product={product}
									selectedParams={selectedParams}
									setSelectedParams={setSelectedParams}
								/>
								{showWarning ? (
									<div className="product-card__error">
										{warningMessage}
									</div>
								) : null}
								<ButtonSolid onClick={handleClick}>
									{!isInStorage
										? 'Add to cart'
										: 'Remove from cart'}
								</ButtonSolid>
							</div>
							<div className="product-page__props-container-right">
								<div className="product-page__stars-rating">
									<div
										className="product-page__stars-rating-fill"
										style={{
											width: `${
												(+product.rating / 5) * 70
											}px`,
										}}></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default SinglePage;
