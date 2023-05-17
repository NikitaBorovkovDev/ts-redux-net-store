import React, {StrictMode, Suspense} from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./style/style.scss";
import "./style/normalize.css";
import ErrorPage from "./components/routes/errorPage/ErrorPage";
import Spinner from "components/commonComponents/spinner/Spinner";
import {Provider} from "react-redux";
import store, {persistor} from "./components/app/store";
import {PersistGate} from "redux-persist/integration/react";
import SinglePage from "./components/routes/singlePage/SinglePage";
import "./firebase";
import AuthModal from "components/app/appHeader/auth/AuthModal";

const MainRootLazy = React.lazy(() => import("./components/routes/main/Main"));

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
            {
                path: ":auth",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <MainRootLazy />
                    </Suspense>
                ),
            },
            {
                path: "shop/:id",
                element: <SinglePage />,
            },
            {
                path: "shop/:id/:auth",
                element: <SinglePage />,
            },
            {
                path: "shop/404-not-found",
                element: <ErrorPage />,
            },
            {
                path: "shop/404-not-found/:auth",
                element: <ErrorPage />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
