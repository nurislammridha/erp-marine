import React from "react";
import { Route } from "react-router-dom";
import PurchaseRequestCreateContainer from "../purhasesRequest/views/PurchaseRequestCreateContainer";
import PurchaseRequestListContainer from "../purhasesRequest/views/PurchaseRequestListContainer";

const routePurchase = [
  {
    path: "/purchase/request/list",
    name: "Purchase Request List",
    component: PurchaseRequestListContainer,
    exact: true,
  },
  {
    path: "/purchase/request/create",
    name: "Purchase Request Create",
    component: PurchaseRequestCreateContainer,
    exact: true,
  },
  
];

function purchaseRoute() {
  {
    return routePurchase.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default purchaseRoute;
