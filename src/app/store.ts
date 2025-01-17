import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import climateReducer from '../features/climateRender/climateSlice'
import {climateApi} from "../services/climate";
import {setupListeners} from "@reduxjs/toolkit/query";
import {hardwareApi} from "../services/hardware.ts";
import {systemInfoApi} from "../services/systemInfo.ts";
// import {buildGetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        climate: climateReducer,
        [climateApi.reducerPath]: climateApi.reducer,
        [hardwareApi.reducerPath]: hardwareApi.reducer,
        [systemInfoApi.reducerPath]: systemInfoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            climateApi.middleware,
            hardwareApi.middleware,
            systemInfoApi.middleware
        ),
})
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch