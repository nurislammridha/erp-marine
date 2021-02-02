import React from "react";
import { Route } from "react-router-dom";
import PurhasesOrderListContainer from "../views/PurhasesOrderListContainer";
import PurchasesOrderCreateContainer from "../views/PurhasesOrderCreateContainer.js"


const purchaseOrder = [
  {
    path: "/purchase/order/list",
    name: "Purchase Order List",
    component: PurhasesOrderListContainer,
    exact: true,
  },
  {
    path: "/purchase/order/create",
    name: "Purchase Request Create",
    component: PurchasesOrderCreateContainer,
    exact: true,
  },

];

function purchaseOrderRoute() {
  {
    return purchaseOrder.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default purchaseOrderRoute;
