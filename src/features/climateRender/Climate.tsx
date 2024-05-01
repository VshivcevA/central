import {useEffect} from "react";
import {currentRenderType, status, update} from "./climateSlice";
import {useGetClimateQuery} from "../../services/climate";
import {AgCharts} from "./AgCharts/AgCharts";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
// import SvgChart from "./svgRender/SvgChart";

function SelectRender() {
    // const renderTypeOptions = useAppSelector((state) => state.climate.renderTypeOptions)
    //todo подумать как убрать const options
    const dispatch = useAppDispatch()
    const options = ["AgCharts","svg"]
    return (
        <select name="currentRenderType" id="currentRenderType" onChange={(event) => {
            dispatch(currentRenderType(event.target.value))
        }}>
            {options.map((value, index) => {
                return <option key={index} value={value} >{value}</option>
            })}
        </select>
    )
}

function CurrentRenderType() {
    const currentRenderType = useAppSelector((state) => state.climate.currentRenderType)
    switch (currentRenderType) {
        case "svg":
            return <div>svg in work</div>
        //     return <SvgChart/>
        case "AgCharts":
            return <AgCharts/>
    }
    return <></>
}

export function Climate() {
    const dispatch = useAppDispatch()
    const {data, error, isLoading} = useGetClimateQuery("1")
    useEffect(() => {
        dispatch(update(data))
        dispatch(status(!isLoading))
    }, [data, isLoading, error, dispatch])

    return (
        <div className={'climate'}>
            <SelectRender/>
            <CurrentRenderType/>
        </div>
    )
}