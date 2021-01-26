import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import employeInfoForm from "./employee-information-form";

export function employesInfoPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/procurement/user-role/employee-information"
        to="/procurement/user-role/employee-information/employee-information-form"
      />

      <ContentRoute
        from="/procurement/user-role/employee-information/employee-information-form"
        component={employeInfoForm}
      />
    </Switch>
  );
}
