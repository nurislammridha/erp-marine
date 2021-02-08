import React from "react";
import { Route } from "react-router-dom";
import POListContainer from "../views/POListContainer";


const orderApproval = [
  {
    path: "/purchase/order/approval/list",
    name: "Purchase Order Approval List",
    component: POListContainer,
    exact: true,
  },

  
];

function purchaseOrderApproval() {
  {
    return orderApproval.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default purchaseOrderApproval;
