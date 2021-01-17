import React from "react";
import { Route } from "react-router-dom";
import partnerInfoContainer from "../view/partnerInfoContainer";


const routePartners = [

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
