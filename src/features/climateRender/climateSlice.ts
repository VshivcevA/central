import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface climateValue {
    time: string
    temperature: number
    humidity: number
}
export interface ClimateSlice {
    value: climateValue[],
    status: boolean,
    currentRenderType: string,
    renderTypeOptions:string[]
}
const initialState: ClimateSlice = {
    value:[{
        "time": "04:20",
        "temperature": 12.4,
        "humidity": 56.7
    },{
        "time": "16:20",
        "temperature": 23.5,
        "humidity": 48.5
    },],
    status:false,
    currentRenderType:"AgCharts",
    renderTypeOptions:["AgCharts"]
}
export const climateSlice = createSlice({
    name: 'climate',
    initialState,
    reducers: {
        update: (state,action: PayloadAction<[]>) => {
            state.value = action.payload
        },
        status: (state,action: PayloadAction<boolean>) => {
            state.status = action.payload
        },
        currentRenderType: (state,action: PayloadAction<string>) => {
            state.currentRenderType = action.payload
        },
        renderTypeOptions: (state,action: PayloadAction<string>) => {
            if (action.payload!==initialState.currentRenderType) {
                state.renderTypeOptions.push(action.payload)
            }
        },

    }
})
export const {update,status,currentRenderType,renderTypeOptions} = climateSlice.actions
export default climateSlice.reducer
