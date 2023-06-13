import clsx from 'clsx';
import { CardType } from 'interfaces';
import './price.scss';
import { memo } from 'react';

interface IPrice {
	currentPrice: string;
	discount: string | undefined;
	basePrice: string;
	cardType: CardType;
	fontSize?: number;
	oldPriceMarginLeft?: number;
}

const Price = memo((props: IPrice) => {
	const currentPriceStyles: { fontSize?: string } = {};
	const oldPriceStyles: { fontSize?: string; marginLeft?: string } = {};
	if (props.fontSize) {
		currentPriceStyles.fontSize = `${props.fontSize}px`;
		oldPriceStyles.fontSize = `${
			props.fontSize - (props.fontSize > 14 ? 4 : 2)
		}px`;
	}
	if (props.oldPriceMarginLeft || props.oldPriceMarginLeft === 0)
		oldPriceStyles.marginLeft = `${props.oldPriceMarginLeft}px`;
	if (props.discount !== '0' && props.discount) {
		return (
			<div className="price-container">
				<div
					style={currentPriceStyles}
					className={clsx(
						'heading-5 text-danger',
						`price-container__current-${props.cardType}`
					)}>
					${props.currentPrice}
				</div>
				<div
					style={oldPriceStyles}
					className={clsx(
						'price-container__old',
						`price-container__old-${props.cardType}`
					)}>
					${props.basePrice}
				</div>
			</div>
		);
	} else {
		return (
			<div className="price-container">
				<div
					style={currentPriceStyles}
					className={clsx(
						'heading-5',
						`price-container__current-${props.cardType}`
					)}>
					${props.currentPrice}
				</div>
			</div>
		);
	}
});

export default Price;
