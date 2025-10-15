import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import adminAuthSlice from "./slice/authSlice"
import { contactApi } from "./apis/contactApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        auth: adminAuthSlice,
    },
    middleware: def => [
        ...def(),
        authApi.middleware,
        contactApi.middleware,
    ]
})

export default reduxStore