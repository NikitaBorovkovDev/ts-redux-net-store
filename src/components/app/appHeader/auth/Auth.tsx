import './auth.scss';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AuthModal from './AuthModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Login from 'components/app/appHeader/login/Login';
import Registration from 'components/app/appHeader/registration/Registration';
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/reduxHooks';
import { removeUser } from 'components/app/userSlice';

const Auth = () => {
	const authRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuth } = useAuth();

	const [pathUrl, setPathUrl] = useState(params.auth);

	const navigateToCurrentUrl = () => {
		navigate(
			location.pathname.slice(0, location.pathname.lastIndexOf('/'))
		);
		setPathUrl('');
	};
	const navigateTo = (to: string) => {
		navigate(
			location.pathname === '/'
				? location.pathname + to
				: location.pathname + '/' + to
		);
	};

	useEffect(() => {
		if (params.auth === 'login' || params.auth === 'registration') {
			setPathUrl(params.auth);
		} else if (params.auth) {
			navigateToCurrentUrl();
		}
	}, [location]);

	return isAuth ? (
		<div className="auth small-regular" ref={authRef}>
			<span className="auth__text">
				<button
					className="auth__login small-regular"
					onClick={() => dispatch(removeUser())}>
					Log out
				</button>
			</span>
		</div>
	) : (
		<div className="auth small-regular" ref={authRef}>
			{(pathUrl === 'login' || pathUrl === 'registration') &&
				createPortal(
					<AuthModal
						parentRef={authRef}
						onClose={navigateToCurrentUrl}>
						{pathUrl === 'login' ? <Login /> : <Registration />}
					</AuthModal>,
					document.body
				)}
			<span className="auth__text">
				<button
					className="auth__login small-regular"
					onClick={() => navigateTo('login')}>
					Log in
				</button>{' '}
				/{' '}
				<button
					className="auth__register small-regular"
					onClick={() => navigateTo('registration')}>
					Register
				</button>
			</span>
		</div>
	);
};

export default Auth;
