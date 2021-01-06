import React from "react";
import { Route } from "react-router-dom";
import UploadPurhcaseRequisitionContainer from "../views/purchase-requisition/UploadPurhcaseRequisitionContainer";

const routesProcurement = [
  {
    path: "/supply-chain/procurement/purchase-requisition",
    name: "Purchase Requisition",
    component: UploadPurhcaseRequisitionContainer,
    exact: true,
  }
];

function getProcurementRoutes() {
  {
    return routesProcurement.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getProcurementRoutes;
