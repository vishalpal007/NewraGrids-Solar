import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

const initialState = {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 LOGIN
            .addMatcher(authApi.endpoints.loginAdmin.matchPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(authApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.admin = payload;
            })
            .addMatcher(authApi.endpoints.loginAdmin.matchRejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error?.message || "Login failed";
            })

            // 🔹 LOGOUT
            .addMatcher(authApi.endpoints.logoutAdmin.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(authApi.endpoints.logoutAdmin.matchFulfilled, (state) => {
                state.isLoading = false;
                state.admin = null;
            })
            .addMatcher(authApi.endpoints.logoutAdmin.matchRejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error?.message || "Logout failed";
            });
    },
});

export default authSlice.reducer;
