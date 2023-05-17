import {useState} from "react";
import {useAppDispatch} from "./../../../hooks/reduxHooks";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "components/app/userSlice";

const Login = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

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

    return (
        <div className="login">
            <input
                type="email"
                className="login__email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                className="login__pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <button onClick={() => handleClick(email, pass)}>Sign in</button>
        </div>
    );
};

export default Login;
