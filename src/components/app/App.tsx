import {Outlet} from "react-router-dom";
import Header from "./appHeader/Header";
import {useEffect} from "react";
import {fetchProducts} from "./productSlice";
import {useAppDispatch} from "hooks/reduxHooks";

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <>
            <Header></Header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default App;
