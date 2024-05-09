import {useAppDispatch} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {useGetHardwareQuery} from "../../services/hardware.ts";
import {AgChartsReact} from "ag-charts-react";
import {AgChartOptions} from "ag-charts-community";

export default function Hardware() {
    const dispatch = useAppDispatch()
    const {data, error, isLoading} = useGetHardwareQuery("nanoble33battery")
    useEffect(() => {
        // dispatch(update(data))
        // dispatch(status(!isLoading))
    }, [data, isLoading, error, dispatch])

    const [options] = useState<AgChartOptions>({
        background: {
            fill: "transparent",
        },
        theme: 'ag-material-dark',
        //todo title переделать на стейт от запроса
        title: {
            text: 'last 24 hour',
        },
        // data:data,
        series: [
            {type: 'line', xKey: 'time', yKey: 'voltage'},
            // {type: 'line', xKey: 'time', yKey: 'humidity'},
        ],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                keys: ['time'],
            },
            {
                type: 'number',
                position: 'left',
                keys: ['voltage'],
                label: {
                    formatter: (params) => {
                        return params.value + ' V';
                    },
                },
            },
        ],
    });
    options.data = data

    return (
        <div className={'hardware'}>
            <AgChartsReact options={options}/>
        </div>
    )
}