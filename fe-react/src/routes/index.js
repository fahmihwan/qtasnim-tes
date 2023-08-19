import React, { lazy } from "react";

const RouterElements = () => {
    const routes = [
        {
            path: "/",
            name: "home",
            element: lazy(() => import("../pages/home/Index")),
        },
        {
            path: "/transaction",
            name: "transaction-index",
            element: lazy(() => import("../pages/transaction/Index")),
        },
        {
            path: "/transaction/create",
            name: "transaction-create",
            element: lazy(() => import("../pages/transaction/Create")),
        },
        {
            path: "/transaction/:id/edit",
            name: "transaction-edit",
            element: lazy(() => import("../pages/transaction/Edit")),
        },
        {
            path: "/category",
            name: "category-index",
            element: lazy(() => import(`../pages/category/Index`)),
        },
        {
            path: "/category/create",
            name: "category-create",
            element: lazy(() => import(`../pages/category/Create`)),
        },
        {
            path: "/category/:id/edit",
            name: "category-create",
            element: lazy(() => import(`../pages/category/Edit`)),
        },
        {
            path: "/item",
            name: "item-index",
            element: lazy(() => import(`../pages/item/Index`)),
        },
        {
            path: "/item/create",
            name: "item-create",
            element: lazy(() => import(`../pages/item/Create`)),
        },
        {
            path: "/item/:id/edit",
            name: "item-edit",
            element: lazy(() => import(`../pages/item/Edit`)),
        },
    ];

    return routes;
};

export default RouterElements;
