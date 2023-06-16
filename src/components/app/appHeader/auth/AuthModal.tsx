import { useEffect, useRef } from 'react';
import './authModal.scss';

const AuthModal = (props: {
	onClose: () => void;
	parentRef: React.RefObject<HTMLElement>;
	children: JSX.Element;
}) => {
	const bgRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node) &&
				props.parentRef.current &&
				!props.parentRef.current.contains(event.target as Node)
			) {
				if (bgRef.current) bgRef.current.style.opacity = '0';
				setTimeout(() => {
					props.onClose();
				}, 200);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	useEffect(() => {
		setTimeout(() => {
			if (bgRef.current) bgRef.current.style.opacity = '1';
		}, 0);
	}, []);
	return (
		<div className="auth-modal" ref={bgRef}>
			<div className="auth-modal__background"></div>
			<div className="auth-modal__wrapper" ref={wrapperRef}>
				<button
					onClick={() => {
						if (bgRef.current) bgRef.current.style.opacity = '0';
						setTimeout(() => {
							props.onClose();
						}, 200);
					}}
					className="cart-side-bar__close auth-modal__close"></button>
				{props.children}
				{/* <div className="auth-modal__sign-in-btns-container">
                        <span className="auth-modal__sign-in-btns-text">Or sign in with</span>
                        <div className="auth-modal__sign-in-btns">

                        </div>
                    </div> */}
			</div>
		</div>
	);
};

export default AuthModal;
