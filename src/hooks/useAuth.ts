import {selectUser} from "components/app/userSlice";
import {useAppSelector} from "./reduxHooks";

const useAuth = () => {
    const {id, email} = useAppSelector(selectUser);
    return {isAuth: !!email, id, email};
};

export default useAuth;
