import { Query } from "../features/climateRender/climateSlice";

export default function getQueryString(query: Query ) {
    return "?" + new URLSearchParams(query).toString()
}
