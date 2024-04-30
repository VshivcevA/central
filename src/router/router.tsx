import {createBrowserRouter} from "react-router-dom";
import ServerInfo from "../features/serverInfo/ServerInfo.tsx";
import Layout from "../structure/Layout.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: 'serverInfo',
                element: <ServerInfo/>
            }
        ]
    },

]);
