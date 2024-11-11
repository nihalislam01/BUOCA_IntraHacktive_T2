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
        path: "/register",
        element: <Dashboard currentPage={Page.register}/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard currentPage={Page.dashboard} />
    },
    {
        path: "/event",
        element: <Dashboard currentPage={Page.event} />
    },
    {
        path: "/profile",
        element: <Dashboard currentPage={Page.profile} />
    },
    {
        path: "/event-request",
        element: <Dashboard currentPage={Page.eventRequest} />
    },
    {
        path: "/budget",
        element: <Dashboard currentPage={Page.budget} />
    },
    {
        path: "/budget-request",
        element: <Dashboard currentPage={Page.budgetRequest} />
    },
    {
        path: "/oom",
        element: <Dashboard currentPage={Page.room} />
    },
    {
        path: "/room",
        element: <Dashboard currentPage={Page.room} />
    },
    {
        path: "/available-room",
        element: <Dashboard currentPage={Page.availableRoom} />
    },
    {
        path: "/room-request",
        element: <Dashboard currentPage={Page.roomRequest} />
    },
];