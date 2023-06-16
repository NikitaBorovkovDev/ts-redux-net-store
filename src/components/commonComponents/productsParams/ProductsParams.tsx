import { IProduct } from 'interfaces';
import Select from 'react-select';
import './productsParams.scss';
import clsx from 'clsx';

interface IProps {
	setSelectedParams: (
		value: React.SetStateAction<{ [key: string]: string }>
	) => void;
	selectedParams: { [key: string]: string };
	product: IProduct;
	classNameContainer?: string;
	addTitle?: boolean;
	classNameTitle?: string;
}

const ProductsParams = (props: IProps) => {
	const {
		setSelectedParams,
		selectedParams,
		product,
		classNameContainer = '',
		addTitle = false,
		classNameTitle = '',
	} = props;

	const productsParamsKeys = Object.keys(product.params).filter(
		(item) => item !== 'color'
	);

	if (!productsParamsKeys) {
		return null;
	}

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
		<div className={classNameContainer}>
			{productsParamsKeys.map((productsParamsKey, index) => {
				return (
					<div key={index}>
						{addTitle ? (
							<h4
								className={clsx(
									'small-regular',
									classNameTitle
								)}>
								{product.params[productsParamsKey].paramsName}
							</h4>
						) : null}
						<ul
							className={clsx(
								'product-card__prop-list',
								classNameContainer
							)}
							key={index}>
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
					</div>
				);
			})}
		</div>
	);
};

export default ProductsParams;
