import React from "react";
import { Route } from "react-router-dom";
import PurchaseRequestList from "../purhasesRequest/components/PurchaseRequestList";

const routePurchase = [
  {
    path: "/purchase/request/list",
    name: "Purchase Request List",
    component: PurchaseRequestList,
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
