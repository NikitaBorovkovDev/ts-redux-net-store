import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces";
import {RootState} from "./store";
import {URL_PRODUCTS} from "../../usedUrls";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/setProducts",
    async function (_, {rejectWithValue}) {
        try {
            const res = await axios.get(URL_PRODUCTS);
            if (!(res.status >= 200 && res.status < 300)) {
                throw new Error(`${res.status}`);
            }

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

interface InitialState {
    value: IProduct[];
    status: "fulfilled" | "pending" | "rejected";
    error: any;
}

const initialState: InitialState = {
    value: [],
    status: "pending",
    error: null,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<IProduct[]>) => {
                    state.status = "fulfilled";
                    state.error = null;
                    state.value = action.payload;
                }
            )
            .addCase(fetchProducts.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(
                fetchProducts.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = "rejected";
                    state.error = action.payload;
                }
            );
    },
});

export const selectProductsValue = (state: RootState) => state.products.value;
export const selectProductsStatus = (state: RootState) => state.products.status;

export default productSlice.reducer;
