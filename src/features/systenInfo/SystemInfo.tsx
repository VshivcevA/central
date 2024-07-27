import {useGetSystemInfoQuery} from "../../services/systemInfo.ts";

function RecursChar(item: [string, object | string | number | boolean | unknown], index: number) {
    const char = item[1]
    const title = item[0]
    if (char && typeof char === 'object') {
        const arr = Object.entries(char)
        return (
            <div key={index} className={'systemInfo__char'}>
                <div>{title}</div>
                <div className={'systemInfo__partList'}>
                    {arr.map((item, index) => RecursChar(item, index))}
                </div>
            </div>
        )
    } else if (char || typeof char === 'boolean') {
        return (
            <div key={index} className={'systemInfo__char'}>
                <div>{title}</div>
                <div>{String(char)}</div>
            </div>
        )
    }
}

export default function SystemInfo() {
    const {data, isSuccess} = useGetSystemInfoQuery("systemInfo")
    if (isSuccess && data) {
        const arr = Object.entries(data)
        return (
            <div className={'systemInfo'}>
                {arr.map((item: [string, object | string | number | unknown], index) => RecursChar(item, index))}
            </div>
        )
    }

}