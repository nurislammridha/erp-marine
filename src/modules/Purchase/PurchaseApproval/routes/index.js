import React from "react";
import { Route } from "react-router-dom";
import PurchaseApprovalListContainer from "../views/PurchaseApprovalListContainer";


const purchaseApproval = [
  {
    path: "/purchase/approval/list",
    name: "Purchase approval List",
    component: PurchaseApprovalListContainer,
    exact: true,
  },

  
];

function PurchaseApproval() {
  {
    return purchaseApproval.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default PurchaseApproval;
