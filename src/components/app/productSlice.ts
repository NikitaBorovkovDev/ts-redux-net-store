import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces";

export const fetchProducts: any = createAsyncThunk(
    "products/setProducts",
    async function (_, {rejectWithValue, dispatch, getState}) {
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            if (!res.ok) {
                console.log(res);
                throw new Error(`${res.status}`);
            }
            const data: IProduct[] = await res.json();

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

interface InitialState {
    value: IProduct[];
    status: string;
    error: any;
}

const initialState: InitialState = {
    value: [],
    status: "",
    error: null,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log("state=", state);
            console.log("action=", action);
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.error = null;
                state.value = action.payload;
            })
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
});

export const {setProducts} = productSlice.actions;

export default productSlice.reducer;
