import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import PurchaseForm from "./purchase-form";

export function PurchasePages() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/procurement/purchase"
        to="/procurement/purchase/"
      />

      <ContentRoute
        from="/procurement/purchase/purchase-form"
        component={PurchaseForm}
      />
    </Switch>
  );
}
