import React from "react";
import { Route } from "react-router-dom";
import AddressContainer from "../address/views/AddressContainer";
import BasicInfoContainer from "../basic-information/views/BasicInfoContainer";


const routePartners = [

    {
        path: "/partners/info",
        name: "partners info add",
        component: BasicInfoContainer,
        exact: true,
    },

    {
        path: "/partners/address",
        name: "partners Address",
        component: AddressContainer,
        exact: true,
    },


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
