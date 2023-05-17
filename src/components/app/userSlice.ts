import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface IUserState {
    email: string | null;
    id: string | null;
    status: "fulfilled" | "pending" | "rejected";
}

const initialState: IUserState = {
    email: null,
    id: null,
    status: "pending",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            const setCookie = (
                name: string,
                value: string,
                expires: number
            ) => {
                let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
                    value
                )}`;

                if (expires) {
                    const expirationDate = new Date(
                        Date.now() + expires * 1000
                    ).toUTCString();
                    cookie += `; expires=${expirationDate}`;
                }

                document.cookie = cookie;
            };

            // Пример использования
            const token: string = action.payload.token;
            setCookie("token", token, 3600);
        },
        removeUser: (state) => {
            state.email = null;
            state.id = null;
            const deleteCookie = (name: string) => {
                document.cookie = `${encodeURIComponent(
                    name
                )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            };

            // Пример использования
            deleteCookie("token"); // Удаляет куку с именем "token"
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
