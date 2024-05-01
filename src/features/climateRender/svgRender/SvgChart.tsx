// import {useAppSelector} from "../../../app/hooks";
// import React from "react";
// import styles from './SvgChart.module.scss';
// // import classNames from "classnames";
// import {climateValue} from "../climateSlice";
//
//
// export default function SvgChart() {
//     const ratio = -50
//     const padding = 100 * 2
//     //todo убрать волшебные числа
//     const climateState = useAppSelector((state) => state.climate)
//     // const temperatureGraphCircles: React.JSX.Element[] = []
//     // const temperatureGraphLines: React.JSX.Element[] = []
//     const timeGraphText: React.JSX.Element[] = []
//     const clientWidth = window.innerWidth
//
//     const graphArray: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.JSX.Element[][] | null | undefined = []
//     const currentGraphCircles: React.JSX.Element[] = []
//     const currentGraphLines: React.JSX.Element[] = []
//     const temperature = {
//         max: 0,
//         min: 0,
//         avg: 0
//     }
//     const coordinates = {
//         previous: {
//             x: 0,
//             y: 0
//         },
//         current: {
//             x: 0,
//             y: 0
//         }
//     }
//
//     interface timeObjectInterface {
//         x: number,
//         y: number,
//         value: string
//     }
//
//     const timeArray: timeObjectInterface[] = []
//     let viewBox = ""
//
//
//
//
//     function getGraph(data: climateValue[], graphs: string[]) {
//         graphs.map((currentGraphName) => {
//             for (const key in data[0]) {
//                 if (currentGraphName===key) {
//                     // const cx = classNames.bind(styles);
//
//                     // const className = cx({
//                         // [styles.temperature]: currentGraphName === 'temperature',
//                         // [styles.humidity]: currentGraphName === 'humidity',
//                         // Добавьте условия для других графов
//                     // });
//                     climateState.value.map((value, index, array) => {
//                         // @ts-ignore
//                         const currentValue = value[currentGraphName]
//
//                         if (currentGraphName==="temperature") {
//                             if (value.temperature > temperature.max) temperature.max = currentValue
//                             if (value.temperature < temperature.min) temperature.min = currentValue
//                             temperature.avg += value.temperature
//                         }
//
//                         coordinates.current.x = (clientWidth - padding) / (array.length - 1) * index
//                         coordinates.current.y = currentValue * ratio
//
//                         if (currentGraphName==="humidity") {
//                             coordinates.current.y = currentValue * -20
//                         }
//
//                         if (index === 0) {
//                             coordinates.previous.x = coordinates.current.x
//                             coordinates.previous.y = coordinates.current.y
//                         }
//                         currentGraphCircles.push(
//                             <g className={currentGraphName} key={currentGraphName+index}>
//                                 <circle className={classNames(styles.circle, styles['circle__'+currentGraphName])}
//                                         cx={coordinates.current.x} cy={coordinates.current.y}
//                                         r={3}/>
//                                 <text className={classNames(styles.text, styles.text__value, styles['text__value--'+currentGraphName])} x={coordinates.current.x}
//                                       y={coordinates.current.y - 20}>{currentValue}</text>
//                             </g>
//                         )
//                         currentGraphLines.push(
//                             <line key={currentGraphName+index} className={classNames(styles.line, styles['line__'+currentGraphName])}
//                                   x1={coordinates.previous.x} y1={coordinates.previous.y}
//                                   x2={coordinates.current.x} y2={coordinates.current.y}/>
//                         )
//                         if (value.time.split(":")[1] === "00") {
//                             timeArray.push({
//                                 x: coordinates.current.x,
//                                 y: 0,
//                                 value: value.time
//                             })
//                         }
//
//                         coordinates.previous.x = coordinates.current.x
//                         coordinates.previous.y = coordinates.current.y
//                         if (index === array.length - 1) temperature.avg = temperature.avg / array.length
//                     })
//                 }
//                 // @ts-ignore
//                 graphArray.push(currentGraphCircles,currentGraphLines)
//
//             }
//
//         })
//
//     }
//
//     if (climateState.status) {
//         // console.log(climateState.value[0])
//         temperature.max = climateState.value[0].temperature
//         temperature.min = climateState.value[0].temperature
//
//         //
//         getGraph(climateState.value, ["temperature"])
//         // getGraph(climateState.value, ["humidity","temperature"])
//
//         // climateState.value.map((value, index, array) => {
//         //     if (value.temperature > temperature.max) temperature.max = value.temperature
//         //     if (value.temperature < temperature.min) temperature.min = value.temperature
//         //     temperature.avg += value.temperature
//         //     currentCoordinate.x = (clientWidth - padding) / (array.length - 1) * index
//         //     currentCoordinate.y = value.temperature * ratio
//         //     if (index === 0) {
//         //         previousCoordinate.x = currentCoordinate.x
//         //         previousCoordinate.y = currentCoordinate.y
//         //     }
//         //     temperatureGraphCircles.push(
//         //         <g key={currentGraphName+index}>
//         //             <circle className={classNames(styles.circle,styles.circle__temp)} cx={currentCoordinate.x} cy={currentCoordinate.y}
//         //                     r={3}/>
//         //             <text className={classNames(styles.text,styles.text__temp)} x={currentCoordinate.x} y={currentCoordinate.y-20}>{value.temperature}</text>
//         //         </g>
//         //     )
//         //     temperatureGraphLines.push(
//         //         <line key={currentGraphName+index} className={classNames(styles.line, styles.line__temp)} x1={previousCoordinate.x} y1={previousCoordinate.y}
//         //               x2={currentCoordinate.x} y2={currentCoordinate.y}/>
//         //     )
//         //     if (value.time.split(":")[1] === "00") {
//         //         timeArray.push({
//         //             x: currentCoordinate.x,
//         //             y: 0,
//         //             value: value.time
//         //         })
//         //     }
//         //
//         //     previousCoordinate.x = currentCoordinate.x
//         //     previousCoordinate.y = currentCoordinate.y
//         //     if (index === array.length - 1) temperature.avg = temperature.avg / array.length
//         // })
//         timeArray.map((value, index) => {
//             timeGraphText.push(
//                 <tspan className={styles.tspan} key={index} x={value.x}
//                        y={temperature.min * ratio + 20}>{value.value}</tspan>
//             )
//         })
//     }
//     viewBox = "0 " + ((temperature.max * ratio)+20) + " " + (clientWidth - padding) + " " + (((temperature.max - temperature.min) * -ratio) + 40)
//
//     return (
//         <div className={styles.container}>
//             <svg className={styles.svg} viewBox={viewBox}>
//                 {graphArray}
//                 <g>
//                     {/*{temperatureGraphLines}*/}
//
//                 </g>
//                 <g>
//                     {/*{temperatureGraphCircles}*/}
//
//                 </g>
//                 <text className={styles.text}>
//                     {timeGraphText}
//                 </text>
//                 <g>
//                     <line className={classNames(styles.line, styles.line__max)} x1={0} y1={temperature.max * ratio}
//                           x2={100 + "%"}
//                           y2={temperature.max * ratio}/>
//                     <text className={styles.text} x={-75} y={temperature.max * ratio + 5}>max: {temperature.max}</text>
//
//                     <line className={classNames(styles.line, styles.line__min)} x1={0} y1={temperature.min * ratio}
//                           x2={100 + "%"}
//                           y2={temperature.min * ratio}/>
//                     <text className={styles.text} x={-75} y={temperature.min * ratio + 5}>min: {temperature.min}</text>
//
//                     <line className={classNames(styles.line, styles.line__avg)} x1={0} y1={temperature.avg * ratio}
//                           x2={100 + "%"}
//                           y2={temperature.avg * ratio}/>
//                     <text className={styles.text} x={-75}
//                           y={temperature.avg * ratio + 5}>avg: {Math.round(temperature.avg * 10) / 10}</text>
//                 </g>
//             </svg>
//
//         </div>
//
//     )
// }