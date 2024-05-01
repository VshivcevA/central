import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const url = 'http://vshivtsev.ddns.net:3000/' //legacy
const url = 'http://vshivtsev.ddns.net/api/' // prod
// const url = 'http://localhost:3000/api/' //dev


export const climateApi = createApi({
    reducerPath: 'climateApi',
    baseQuery: fetchBaseQuery({baseUrl: url}),
    tagTypes: [],
    endpoints: (builder) => ({
        getClimate: builder.query({
                query: (value: string) => `climate/${value}`
            })
    })
})

export const {useGetClimateQuery} = climateApi
