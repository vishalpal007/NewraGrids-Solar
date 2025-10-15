import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin/auth`,
        credentials: "include"
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        loginAdmin: builder.mutation({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
            transformResponse: (response) => {
                if (response?.user) {
                    localStorage.setItem("admin", JSON.stringify(response.user));
                }
                return response;
            }
        }),


        logoutAdmin: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["auth"],
            transformResponse: (response) => {
                localStorage.removeItem("admin");
                return response;
            },
        })
    }),
});

export const {
    useLoginAdminMutation,
    useLogoutAdminMutation
} = authApi;