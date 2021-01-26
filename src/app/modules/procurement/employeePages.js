import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { PurchasePages } from "./purchase/purchasePages";
import { defaultComponentPage } from "./default-component/defaultComponentPage";
import { employesInfoPage } from "./user-role/employee-information/employesInfoPage";

export function ProcurementPages() {
  return (
    <Switch>

      <Redirect
        exact={true}
        from="/procurement"
        to="/procurement/purchase/"
      />

      <ContentRoute
        path="/procurement/purchase"
        component={PurchasePages}
      />


      <ContentRoute
        path="/procurement/default-component"
        component={defaultComponentPage}
      />

      <ContentRoute
        path="/procurement/user-role/employee-information"
        component={employesInfoPage}
      />


    </Switch>
  );
}

export default ProcurementPages;
