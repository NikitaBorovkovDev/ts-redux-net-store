import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./style/style.scss";
import "./style/normalize.css";
import ErrorPage from "./components/errorPage/ErrorPage";
import Spinner from "./components/spinner/Spinner";
import {Provider} from "react-redux";
import store, {persistor} from "./components/app/store";
import {PersistGate} from "redux-persist/integration/react";

const MainRootLazy = React.lazy(() => import("./components/routes/Main"));

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <MainRootLazy />
                    </Suspense>
                ),
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
