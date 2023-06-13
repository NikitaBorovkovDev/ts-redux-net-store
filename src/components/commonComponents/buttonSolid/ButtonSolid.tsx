import './buttonSolid.scss';
import clsx from 'clsx';
import { memo } from 'react';

type Props = {
	children: string | JSX.Element;
	onClick?: (e?: React.MouseEvent) => any;
	addedClasses?: string;
};

const ButtonSolid = memo((props: Props) => {
	const { children = 'button', addedClasses = '' } = props;
	return (
		<button
			className={clsx('btn btn-solid ', addedClasses)}
			onClick={props.onClick}>
			<span className="btn__text btn__text-solid">{children}</span>
		</button>
	);
});

export default ButtonSolid;
