import {createBrowserRouter} from "react-router-dom";
import Hardware from "../features/hardware/Hardware.tsx";
import Layout from "../structure/Layout.tsx";
import {Climate} from "../features/climateRender/Climate.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: 'hardware',
                element: <Hardware/>
            },
            {
                path: 'climate',
                element: <Climate/>
            },
        ]
    },

]);
