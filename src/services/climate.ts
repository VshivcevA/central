import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = import.meta.env.VITE_API_URL // prod
// const url = 'http://localhost:3000/api/' //dev

export const climateApi = createApi({
    reducerPath: 'climateApi',
    baseQuery: fetchBaseQuery({baseUrl: url+'climate/1'}),
    tagTypes: [],
    endpoints: (builder) => ({
        getClimate: builder.query({
            query: (value: string) => value
        }),
    })
})

export const {useGetClimateQuery} = climateApi
