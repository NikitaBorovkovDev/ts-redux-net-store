import {Outlet} from "react-router-dom";
import Header from "../appHeader/header";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./store";
import {setProducts, fetchProducts} from "./productSlice";

// export async function loader() {
//     let res = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(<MainRoot />);
//         }, 5500);
//     });
//     return res;
// }

const App = () => {
    const dispatch = useDispatch();
    // const data = {123: 123};

    // const myData = useSelector((state: RootState) => state.products.value);
    // console.log(myData);
    useEffect(() => {
        dispatch(fetchProducts());
        // dispatch(setProducts(data));
    }, [dispatch]);
    const a = useSelector((state: RootState) => state.products);
    console.log(a);
    // const content = useLoaderData();
    // console.log(!content);
    // let mainw = content ? content : <div>123</div>;
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
