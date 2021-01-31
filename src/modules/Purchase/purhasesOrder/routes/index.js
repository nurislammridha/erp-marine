import React from "react";
import { Route } from "react-router-dom";
import PurhasesOrderListContainer from "../views/PurhasesOrderListContainer";


const purchaseOrder = [
  {
    path: "/purchase/order/list",
    name: "Purchase Order List",
    component: PurhasesOrderListContainer,
    exact: true,
  },
//   {
//     path: "/purchase/request/create",
//     name: "Purchase Request Create",
//     component: PurchaseRequestCreateContainer,
//     exact: true,
//   },
  
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
