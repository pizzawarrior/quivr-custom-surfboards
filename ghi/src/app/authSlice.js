import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
Auth section includes:
-getToken
-signUp
-login
-logout
*/

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            transformResponse: (response) => response?.account || null,
            providesTags: ['Account'],
        }),

        signup: builder.mutation({
            query: (body) => ({
                url: '/accounts',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Account'],
        }),

        login: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('username', data.username);
                formData.append('password', data.password);
                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                };
            },
            invalidatesTags: ['Account'],
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Account'],
        }),
        getAllAccounts: builder.query({
            query: () => '/accounts',
        }),
        getAccountsByUsername: builder.query({
            query: (username) => `/accounts/username/${username}`,
        }),
        getAccountsByRole: builder.query({
            query: (role) => `/accounts/${role}`,
        }),
    }),
});

export const {
    useGetTokenQuery,
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetAllAccountsQuery,
    useGetAccountsByUsernameQuery,
    useGetAccountsByRoleQuery,
} = authApi;
