import { IProduct } from 'interfaces';
import './ColorPicker.scss';
import { clsx } from 'clsx';
import { memo } from 'react';

interface IProps {
	setSelectedParams: (
		value: React.SetStateAction<{ [key: string]: string }>
	) => void;
	selectedParams: { [key: string]: string };
	product: IProduct;
	className?: string;
}

const ColorPicker = memo((props: IProps) => {
	const {
		product,
		selectedParams,
		setSelectedParams,
		className = '',
	} = props;

	let productValue = product.params.color.value;

	return (
		<ul className={clsx('product-card__color-list', className)}>
			{productValue.map((color, index) => (
				<li
					key={index}
					className={
						color === selectedParams.color
							? 'product-card__color-list-item product-card__selected'
							: 'product-card__color-list-item'
					}
					onClick={() =>
						color === selectedParams.color
							? setSelectedParams((prevState) => {
									let oldState = { ...prevState };
									delete oldState.color;
									return oldState;
							  })
							: setSelectedParams((oldParams) => ({
									...oldParams,
									color: color,
							  }))
					}>
					<span
						className="product-card__color"
						style={{ backgroundColor: color }}></span>
				</li>
			))}
		</ul>
	);
});

export default ColorPicker;
