import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import getCurrentTime from "../../utils/getCurrentTime.ts";
import getCurrentDate from "../../utils/getCurrentDate.ts";
export interface climateValue {
    time: string
    temperature: number
    humidity: number
}
export interface Query {
    dateFrom:string,
    timeFrom:string,
    dateTo:string,
    timeTo:string,
}
export interface ClimateSlice {
    value: climateValue[],
    currentRenderType: string,
    renderTypeOptions:string[],
    query:Query,
    syncTime:boolean
}
const initialState: ClimateSlice = {
    value:[{
        time: getCurrentTime(),
        temperature: 12.4,
        humidity: 56.7
    }],
    currentRenderType:"AgCharts",
    renderTypeOptions:["AgCharts"],
    query:{
        dateFrom: getCurrentDate(-1),
        timeFrom: getCurrentTime(),
        dateTo: getCurrentDate(),
        timeTo: getCurrentTime()
    },
    syncTime:false
}
export const climateSlice = createSlice({
    name: 'climate',
    initialState,
    reducers: {
        update: (state,action: PayloadAction<[]>) => {
            state.value = action.payload
        },
        currentRenderType: (state,action: PayloadAction<string>) => {
            state.currentRenderType = action.payload
        },
        renderTypeOptions: (state,action: PayloadAction<string>) => {
            if (action.payload!==initialState.currentRenderType) {
                state.renderTypeOptions.push(action.payload)
            }
        },
        queryUpdate: (state,action: PayloadAction<object>) => {
            for (const stateKey in state.query){
                for (const actionKey in action.payload) {
                    if (stateKey.includes('time') && actionKey.includes('time') && state.syncTime) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        state.query[stateKey] = action.payload[actionKey]
                    } else if (stateKey === actionKey) {
                        // todo
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        state.query[stateKey] = action.payload[actionKey]
                    }
                }
            }
        },
        syncTimeUpdate: (state,action: PayloadAction<boolean>) => {
            state.syncTime = action.payload
        },

    }
})
export const {update,currentRenderType,renderTypeOptions,queryUpdate,syncTimeUpdate} = climateSlice.actions
export default climateSlice.reducer
