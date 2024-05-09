import {useEffect, useState} from "react";
import {currentRenderType, queryUpdate, syncTimeUpdate, update} from "./climateSlice";
// import {currentRenderType} from "./climateSlice";
import {useGetClimateQuery} from "../../services/climate";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import getQueryString from "../../utils/getQueryString.ts";
// import SvgChart from "./svgRender/SvgChart";
import {AgChartsReact} from 'ag-charts-react';
import {AgChartOptions} from 'ag-charts-community';

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

// function CurrentRenderType() {
//     const currentRenderType = useAppSelector((state) => state.climate.currentRenderType)
//     switch (currentRenderType) {
//         case "svg":
//             return <div>svg in work</div>
//         //     return <SvgChart/>
//         case "AgCharts":
//             return <AgChartsReact options={options}/>
//     }
//     return <></>
// }

export function Climate() {
    const dispatch = useAppDispatch()
    const query = useAppSelector((state) => state.climate.query)
    const syncTime = useAppSelector(state => state.climate.syncTime)
    const {data,isSuccess} = useGetClimateQuery(getQueryString(query))
    useEffect(() => {
        dispatch(update(data))
        dispatch(queryUpdate(query))
    }, [data, isSuccess,query, dispatch])
    const [options] = useState<AgChartOptions>({
        background: {
            fill: "transparent",
        },
        theme: 'ag-material-dark',
        //todo title переделать на стейт от запроса

        // title: {
        //     text: 'last 24 hour',
        // },

        // data:data,
        series: [
            {type: 'line', xKey: 'timestamp', yKey: 'temperature'},
            {type: 'line', xKey: 'timestamp', yKey: 'humidity'},
        ],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                keys: ['timestamp'],
                label: {
                    formatter: (params) => {
                        return new Date(params.value).toLocaleString('ru-RU', {dateStyle: 'short',timeStyle:'short'}).toString();
                    },
                },
            },
            {
                type: 'number',
                position: 'left',
                keys: ['temperature'],
                label: {
                    formatter: (params) => {
                        return params.value + '°C';
                    },
                },
            },
            {
                type: 'number',
                position: 'right',
                keys: ['humidity'],
                label: {
                    formatter: (params) => {
                        return params.value + '%';
                    },
                },
            },
        ],
    });
    options.data = data

    return (
        <div className={'climate'}>
            <SelectRender/>
            <form action=''>
                <div>
                    from&nbsp;
                    <label>
                        date:
                        <input id={"dateForm"} name={'dateFrom'} type="date"
                               value={query.dateFrom}
                               onChange={(e) => {
                                   dispatch(queryUpdate({dateFrom: e.target.value}))
                               }}/>
                    </label>
                    <label>
                        time:
                        <input type="time" value={query.timeFrom}
                               onChange={(e) => {
                                   dispatch(queryUpdate({timeFrom: e.target.value}))
                               }}/>
                    </label>
                </div>
                <div>
                    to&nbsp;
                    <label>
                        date:
                        <input type="date"
                               value={query.dateTo}
                               onChange={(e) => {
                                   dispatch(queryUpdate({dateTo: e.target.value}))
                               }}/>
                    </label>
                    <label>
                        time:
                        <input type="time" value={query.timeTo}
                               onChange={(e) => {
                                   dispatch(queryUpdate({timeTo: e.target.value}))
                               }}/>
                    </label>
                </div>
                <div>
                    <label>
                        sync time
                        <input type="checkbox"
                               checked={syncTime} onChange={(e) => {
                                   dispatch(syncTimeUpdate(e.target.checked))
                        }}
                        />
                    </label>
                </div>
            </form>
            <div>
                {isSuccess ? <AgChartsReact options={options}/> : 'loading'}
            </div>
        </div>
    )
}