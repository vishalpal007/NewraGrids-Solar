import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const contactApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/contact`,
        credentials: "include"
    }),
    tagTypes: ["contact"],
    endpoints: (builder) => {
        return {
            getAllContacts: builder.query({
                query: () => {
                    return {
                        url: "/get-contacts",
                        method: "GET"
                    }
                },
                providesTags: ["contact"]
            }),
            submitContact: builder.mutation({
                query: userData => {
                    return {
                        url: "/submit",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["contact"]
            }),

        }
    }
})

export const { useGetAllContactsQuery, useSubmitContactMutation } = contactApi
