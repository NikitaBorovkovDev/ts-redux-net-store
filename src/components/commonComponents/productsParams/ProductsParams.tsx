import { IProduct } from 'interfaces';
import './productsParams.scss';

interface IProps {
	setSelectedParams: (
		value: React.SetStateAction<{ [key: string]: string }>
	) => void;
	selectedParams: { [key: string]: string };
	product: IProduct;
	className?: string;
	styleType?: 'select';
}

const ProductsParams = (props: IProps) => {
	const {
		setSelectedParams,
		selectedParams,
		product,
		className = '',
		styleType = '',
	} = props;

	const productsParamsKeys = Object.keys(product.params).filter(
		(item) => item !== 'color'
	);

	const listItemStyle = (size: string, productsParamsKey: string) => {
		return size ===
			selectedParams[product.params![productsParamsKey].paramsName]
			? 'product-card__prop-list-item product-card__selected'
			: 'product-card__prop-list-item';
	};

	const handleClick = (size: string, productsParamsKey: string) => {
		if (
			size ===
			selectedParams[product.params[productsParamsKey].paramsName]
		) {
			setSelectedParams((prevState) => {
				let oldState = {
					...prevState,
				};
				delete oldState[product.params![productsParamsKey].paramsName];
				return oldState;
			});
		} else {
			setSelectedParams((oldParams) => ({
				...oldParams,
				[product.params![productsParamsKey].paramsName]: size,
			}));
		}
	};

	return (
		<>
			{productsParamsKeys.map((productsParamsKey, index) => {
				return (
					<ul className="product-card__prop-list" key={index}>
						{product.params[productsParamsKey].value.map(
							(size, index) => (
								<li
									key={index}
									className={listItemStyle(
										size,
										productsParamsKey
									)}
									onClick={() =>
										handleClick(size, productsParamsKey)
									}>
									{size}
								</li>
							)
						)}
					</ul>
				);
			})}
		</>
	);
};

export default ProductsParams;
