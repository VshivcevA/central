import {useEffect, useState} from 'react';
import {AgChartsReact} from 'ag-charts-react';
import {AgChartOptions} from 'ag-charts-community';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {renderTypeOptions} from "../climateSlice";

export const AgCharts = () => {
    const data = useAppSelector((state) => state.climate.value)
    const dispatch= useAppDispatch()
    useEffect(()=>{
        dispatch(renderTypeOptions("AgCharts"))
    },[])
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
            {type: 'line', xKey: 'time', yKey: 'temperature'},
            {type: 'line', xKey: 'time', yKey: 'humidity'},
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

    return <AgChartsReact options={options}/>;

};

