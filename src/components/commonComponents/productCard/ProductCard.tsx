import clsx from 'clsx';
import ButtonSolid from '../buttonSolid/ButtonSolid';
import './productCard.scss';
import { CardType, IProduct } from 'interfaces';
import {
	addProductToLocalStorage,
	removeProductFromLocalStorage,
	selectLocalStorageProductsValue,
} from '../../app/cartSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { useEffect, useRef, useState } from 'react';
import Price from '../price/Price';
import { Link } from 'react-router-dom';
import ColorPicker from '../colorPicker/ColorPicker';
import ProductsParams from '../productsParams/ProductsParams';

interface IProductCard {
	product: IProduct;
	cardType: CardType;
}

const ProductCard = (props: IProductCard) => {
	const { product, cardType } = props;

	const productsLocalStorageData = useAppSelector(
		selectLocalStorageProductsValue
	);
	const dispatch = useAppDispatch();

	const [selectedParams, setSelectedParams] = useState<{
		[key: string]: string;
	}>({});
	const [showWarning, setShowWarning] = useState(false);
	const [hovered, setHovered] = useState(false);

	const nameRef = useRef<HTMLParagraphElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const defaultHeight = 27;
	let maxNameLength = 32;

	const propsValues = selectedParams ? Object.values(selectedParams) : null;
	const sortedValue = propsValues
		? propsValues.sort((a, b) =>
				a.toLowerCase().localeCompare(b.toLowerCase(), 'en')
		  )
		: null;

	const productId = sortedValue
		? `${product.id}+${sortedValue.join('+')}`
		: product.id;

	const isInStorage = productsLocalStorageData.find(
		(productInStorage) => productId === productInStorage.productId
	);

	useEffect(() => {
		if (
			Object.keys(product.params).length ===
				Object.keys(selectedParams).length &&
			showWarning === true
		) {
			setShowWarning(false);
		}
	}, [selectedParams]);

	const handleAddProductToLocalStorage = () => {
		const quantity = 1;
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
	};

	let paramsElements: JSX.Element | null = null;

	const productNameCut = (name: string) => {
		const nameDivided = name.split(' ');
		let returnName = '';
		let currentLength = 0;
		let i = 0;
		do {
			if (!nameDivided[i]) break;
			if (
				(returnName + ' ' + nameDivided[i]).length + 3 >
				maxNameLength
			) {
				return (returnName += '...');
			}
			returnName += ' ' + nameDivided[i];

			currentLength += nameDivided[i].length + 1;
			++i;
		} while (currentLength < maxNameLength);
		return returnName;
	};

	const handleTitleMouseHover = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		console.log(e.type);
		if (nameRef.current && cardRef.current) {
			if (e.type === 'mouseover') {
				setHovered(true);
				nameRef.current.textContent = product.name;
				cardRef.current.style.height = `${
					nameRef.current.getBoundingClientRect().height
				}px`;
			} else if (e.type === 'mouseout') {
				cardRef.current.style.height = `${defaultHeight}px`;
				setHovered(false);
			}
		}
	};

	const requiredParamsKeys = Object.keys(product.params).filter(
		(item) => !Object.keys(selectedParams).includes(item)
	);
	const lastParams = requiredParamsKeys.pop();
	const warningMessage =
		'pick ' +
		requiredParamsKeys.join(', ') +
		(requiredParamsKeys.length ? ' and ' : '') +
		lastParams;

	return (
		<div
			className={clsx('product-card', `${cardType}-card`)}
			key={product.id}>
			<div>
				<img
					loading="lazy"
					className={clsx(
						'product-card__img',
						`product-card__img-${cardType}`
					)}
					src={product.imageAndVideo[0].url}
					alt=""
				/>
				<div className="product-card__stars-rating">
					<div
						className="product-card__stars-rating-fill"
						style={{
							width: `${(+product.rating / 5) * 70}px`,
						}}></div>
				</div>
			</div>

			<div className="product-card__description-container">
				<div className="product-card__description-idle">
					<div className="product-card__text">
						{cardType === CardType.LARGE ? (
							''
						) : (
							<Link to={`/shop/${product.id}`}>
								<div
									onMouseOver={(e) =>
										handleTitleMouseHover(e)
									}
									onMouseOut={(e) => handleTitleMouseHover(e)}
									ref={cardRef}
									style={{ height: `${defaultHeight}px` }}
									className="product-card__title">
									<p
										ref={nameRef}
										style={{
											lineHeight: `${defaultHeight}px`,
										}}
										className="large-regular product-card__title-text">
										{product.name.length > maxNameLength
											? hovered
												? product.name
												: productNameCut(product.name)
											: product.name}
									</p>
								</div>
							</Link>
						)}

						<Price
							basePrice={product.basePrice}
							cardType={cardType}
							currentPrice={product.currentPrice}
							discount={product.discount}
						/>
					</div>
					<div className="product-card__add-menu">
						<div
							className={
								cardType === CardType.LARGE
									? ''
									: 'product-card__add-menu-container'
							}>
							<div className="product-card__properties">
								{product.params ? (
									<ProductsParams
										product={product}
										selectedParams={selectedParams}
										setSelectedParams={setSelectedParams}
									/>
								) : null}
								{product.params?.color ? (
									<ColorPicker
										product={product}
										selectedParams={selectedParams}
										setSelectedParams={setSelectedParams}
									/>
								) : null}
							</div>
							{showWarning ? (
								<div className="product-card__error">
									{warningMessage}
								</div>
							) : null}
							<ButtonSolid
								onClick={
									Object.keys(product.params).length !==
									Object.keys(selectedParams).length
										? (e) => {
												setShowWarning(true);
												const target = e!
													.currentTarget as HTMLButtonElement;
												console.log(target);
												target.animate(
													[
														{
															transform:
																'translateX(5%)',
															offset: 0.15,
														},
														{
															transform:
																'translateX(-5%)',
															offset: 0.3,
														},
														{
															transform:
																'translateX(3%)',
															offset: 0.45,
														},
														{
															transform:
																'translateX(-3%)',
															offset: 0.6,
														},
														{
															transform:
																'translateX(1%)',
															offset: 0.75,
														},
														{
															transform:
																'translateX(-1%)',
															offset: 0.85,
														},
														{
															transform:
																'translateX(0)',
														},
													],
													{
														duration: 500,
														iterations: 1,
													}
												);
										  }
										: handleAddProductToLocalStorage
								}>
								{!isInStorage
									? 'Add to cart'
									: 'Remove from cart'}
							</ButtonSolid>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
