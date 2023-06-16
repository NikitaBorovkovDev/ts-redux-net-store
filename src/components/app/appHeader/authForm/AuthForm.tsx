import { useState } from 'react';
import './AuthForm.scss';
import 'style/style.scss';
import ButtonSolid from 'components/commonComponents/buttonSolid/ButtonSolid';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
	formType: 'login' | 'registration';
	handleClick: (email: string, password: string) => Promise<void>;
}

const AuthForm = (props: IProps) => {
	const { formType, handleClick } = props;

	const navigate = useNavigate();
	const location = useLocation();

	const navigateTo = (to: string) => {
		navigate(
			location.pathname === '/'
				? location.pathname + to
				: location.pathname + '/' + to
		);
	};

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	return (
		<div className="auth-form">
			<h2 className="auth-form__heading heading-3">
				{formType === 'login' ? 'Sign in' : 'Sign up'}
			</h2>
			<p className="auth-form__text small-regular">
				{formType === 'login'
					? 'Sign in to your account using email and password provided during registration.'
					: 'Registration takes less than a minute but gives you full control over your orders.'}
			</p>
			<label htmlFor="email" className="auth-form__label small-regular">
				Email
			</label>
			<input
				type="email"
				className="auth-form__email auth-form__input"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Your working email"
				name="email"
			/>
			<label
				htmlFor="password"
				className="auth-form__label small-regular">
				Password
			</label>
			<input
				type="password"
				className="auth-form__pass auth-form__input"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
				placeholder="Password"
				name="password"
			/>
			<ButtonSolid
				onClick={() => handleClick(email, pass)}
				addedClasses="auth-form__button">
				{formType === 'login' ? 'Sign in' : 'Sign up'}
			</ButtonSolid>
			<p className="auth-form__change-form-type">
				{formType === `login`
					? `Don't have an account? `
					: `Already have an account? `}
				<button
					onClick={() =>
						formType === 'login'
							? navigateTo('registration')
							: navigateTo('login')
					}
					className="auth-form__change-form-type-button">
					{formType === 'login' ? 'Sign in' : 'Sign up'}
				</button>
			</p>
		</div>
	);
};

export default AuthForm;
