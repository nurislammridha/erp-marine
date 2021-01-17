import React from "react";
import { Route } from "react-router-dom";
import AddressContainer from "../address/views/AddressContainer";
import BankInfoContainer from "../bank-information/views/BankInfoContainer";
import BasicInfoContainer from "../basic-information/views/BasicInfoContainer";
import OthersInfoContainer from "../others-information/views/OthersInfoContainer";


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


    {
        path: "/partners/bank-info",
        name: "bank informatiom",
        component: BankInfoContainer,
        exact: true,
    },

    {
        path: "/partners/others-info",
        name: "others informatiom",
        component: OthersInfoContainer,
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
