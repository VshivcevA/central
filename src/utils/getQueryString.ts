import { Query } from "../features/climateRender/climateSlice";

export default function getQueryString(query: string | string[][] | Record<string, string> | URLSearchParams | Query ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return "?" + new URLSearchParams(query).toString()
}
