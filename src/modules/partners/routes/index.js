import React from "react";
import { Route } from "react-router-dom";
import SuppliersListContainer from "../suppliers-list/views/SuppliersListContainer";
import partnerInfoContainer from "../view/partnerInfoContainer";


const routePartners = [
    {
        path: "/suppliers/list",
        name: "partners info add",
        component: SuppliersListContainer,
        exact: true,
    },
    {
        path: "/partners/info",
        name: "partners info add",
        component: partnerInfoContainer,
        exact: true,
    }


];

function getPartnersRoutes() {
    {
        return routePartners.map((route, index) => (
            <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
            />
        ));
    }
}
export default getPartnersRoutes;
