import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {IStorageProduct} from "../../interfaces";
import {RootState} from "./store";

interface InitialState {
    value: IStorageProduct[];
}

const initialState: InitialState = {
    value: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToLocalStorage: (
            state,
            action: PayloadAction<IStorageProduct>
        ) => {
            state.value.push(action.payload);
        },
        removeProductFromLocalStorage: (
            state,
            action: PayloadAction<string>
        ) => {
            state.value = state.value.filter(
                (item) => item.productId !== action.payload
                // {
                //     if (item.id !== action.payload.id) return true;

                //     if (
                //         !!action.payload.selectedProductParams ===
                //         !item.selectedProductParams
                //     ) {
                //         return true;
                //     }

                //     if (
                //         action.payload.selectedProductParams &&
                //         item.selectedProductParams
                //     ) {
                //         const payloadKeys = Object.keys(
                //             action.payload.selectedProductParams
                //         );
                //         const stateKeys = Object.keys(item.selectedProductParams);
                //         if (payloadKeys.length === 0 && stateKeys.length === 0)
                //             return false;
                //         if (payloadKeys.length !== stateKeys.length) return true;

                //         for (let i = 0; i < payloadKeys.length; i++) {
                //             let prop = payloadKeys[i];
                //             if (
                //                 item.selectedProductParams[prop] !==
                //                 action.payload.selectedProductParams[prop]
                //             ) {
                //                 console.log(123321);
                //                 return true;
                //             }
                //         }
                //     }

                //     return false;
                // }
            );
        },
    },
});

export const selectLocalStorageProductsValue = (state: RootState) =>
    state.cart.value;
export const {addProductToLocalStorage, removeProductFromLocalStorage} =
    cartSlice.actions;
export default cartSlice.reducer;
