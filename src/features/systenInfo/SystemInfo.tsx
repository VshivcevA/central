import {useGetSystemInfoQuery} from "../../services/systemInfo.ts";
function RecursChar(item: [string, object|string|number|unknown], index: number) {
    const char = item[1]
    const title = item[0]

    if (char) {
        if (typeof char =="string" || typeof char =="number") {
            return (
                <div key={index} className={'systemInfo__char'}>
                    <div>{title}</div>
                    <div>{char}</div>
                </div>
            )
        } else if (typeof char === 'object') {
            const arr = Object.entries(char)
            return (
                <div key={index} className={'systemInfo__char '}>
                    <div>{title}</div>
                    <div className={'systemInfo__partList'}>
                        {arr.map((item, index) => RecursChar(item, index))}
                    </div>
                </div>
            )
        }
    }

}

export default function SystemInfo() {
    const {data, isSuccess} = useGetSystemInfoQuery("systemInfo")
    if (isSuccess && data) {
        const arr = Object.entries(data)
        return (
            <div className={'systemInfo'}>
                {arr.map((item:[string,object|string|number|unknown], index) => RecursChar(item, index))}
            </div>
        )
    }

}
// <div key={i}>
//     <h5>{part}</h5>
//
//     <div className={'systemInfo__partList'}>
//
//         {char.map((item2, index2) => {
//             return (
//                 <div className={'systemInfo__char'} key={index2}>
//                     <div>
//                         {item2[0]}
//                     </div>
//                     <div>
//                         {item2[1] + ''}
//                         {RecursChar(item2[1])}
//                     </div>
//                 </div>
//             )
//
//         })}
//     </div>
// </div>