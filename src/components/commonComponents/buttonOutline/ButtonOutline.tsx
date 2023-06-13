import clsx from 'clsx';
import './buttonOutline.scss';
import { memo } from 'react';

type Props = {
	children: string | JSX.Element;
	onClick?: (e?: React.MouseEvent) => any;
	addedClasses?: string;
};

const ButtonOutline = memo((props: Props) => {
	const { children = 'button', addedClasses = '' } = props;
	return (
		<button
			className={clsx('btn btn-outline ', addedClasses)}
			onClick={props.onClick}>
			<span className="btn__text btn__text-outline">{children}</span>
		</button>
	);
});

export default ButtonOutline;
