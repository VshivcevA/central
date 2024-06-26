import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = import.meta.env.VITE_API_URL // prod

export const systemInfoApi = createApi({
    reducerPath: 'systemInfoApi',
    baseQuery: fetchBaseQuery({baseUrl: url+'hardware/'}),
    tagTypes: [],
    endpoints: (builder) => ({
        getSystemInfo: builder.query({
            query: (value: string) => value
        })
    })
})

export const {useGetSystemInfoQuery} = systemInfoApi
