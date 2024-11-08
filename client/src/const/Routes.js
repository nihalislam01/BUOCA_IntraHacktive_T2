import React from "react";
import Dashboard from "../component/Dashboard/Dashboard";
import Landing, { landingRoutes } from "../component/Landing/Landing/Landing";
import { Page } from "../component/Menu/Menu";

export const routes = [
    {
        path: "/",
        element: <Landing />,
        children: landingRoutes,
    },
    {
        path: "/event",
        element: <Dashboard currentPage={Page.event} />
    },
    {
        path: "/profile",
        element: <Dashboard currentPage={Page.profile} />
    },
];