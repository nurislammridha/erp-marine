import React from "react";
import { Route } from "react-router-dom";
import SupplierCsDetails from "../components/SupplierCsDetails";


import SupplierCsContainer from "../views/SupplierCsContainer";

const routeSupplier = [
  {
    path: "/supplier/info",
    name: "suppliercs",
    component:SupplierCsContainer,
    exact: true,
  },
  {
    path: "/supplier/details",
    name: "suppliercs",
    component:SupplierCsDetails,
    exact: true,
  },
];

function getSupplierRoutes() {
  {
    return routeSupplier.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getSupplierRoutes;
