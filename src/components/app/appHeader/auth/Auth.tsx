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

	const { isAuth, email } = useAuth();

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (params.auth === 'login' || params.auth === 'registration') {
			if (isAuth) {
				navigate(
					location.pathname.slice(
						0,
						location.pathname.lastIndexOf('/')
					)
				);
				setShowModal(false);
			} else {
				setShowModal(true);
			}
		} else {
			setShowModal(false);
		}
	}, [params.auth, isAuth]);

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
			{showModal &&
				(params.auth === 'login' || params.auth === 'registration') &&
				createPortal(
					<AuthModal
						parentRef={authRef}
						onClose={() =>
							navigate(
								location.pathname.slice(
									0,
									location.pathname.lastIndexOf('/')
								)
							)
						}>
						{params.auth === 'login' ? <Login /> : <Registration />}
					</AuthModal>,
					document.body
				)}
			<span className="auth__text">
				<button
					className="auth__login small-regular"
					onClick={() => navigate('login')}>
					Log in
				</button>{' '}
				/{' '}
				<button
					className="auth__register small-regular"
					onClick={() => navigate('registration')}>
					Register
				</button>
			</span>
		</div>
	);
};

export default Auth;
