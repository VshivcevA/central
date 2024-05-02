import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = import.meta.env.VITE_API_URL // prod
// const url = 'http://localhost:3000/api/' //dev

export const hardwareApi = createApi({
    reducerPath: 'hardwareApi',
    baseQuery: fetchBaseQuery({baseUrl: url+'hardware/'}),
    tagTypes: [],
    endpoints: (builder) => ({
        getHardware: builder.query({
            query: (value: string) => value
        })
    })
})

export const {useGetHardwareQuery} = hardwareApi
