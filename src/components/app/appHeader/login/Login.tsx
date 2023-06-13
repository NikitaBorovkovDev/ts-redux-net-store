import { useState } from 'react';
import { useAppDispatch } from 'hooks/reduxHooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'components/app/userSlice';
import AuthForm from '../authForm/AuthForm';

const Login = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const handleClick = async (email: string, password: string) => {
		try {
			const auth = getAuth();
			const data: any = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(data.user);
			dispatch(
				setUser({
					email: data.user.email,
					id: data.user.uid,
					token: data.user.accessToken,
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	return <AuthForm formType="login" handleClick={handleClick} />;
};

export default Login;
