import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import defaultComponentForm from "./default-component-form";
 

export function defaultComponentPage() {
  
  return (
    <Switch>

      <Redirect
        exact={true}
        from="/procurement/default-component"
        to="/procurement/default-component/"
      />

      <ContentRoute
        from="/procurement/default-component/default-component-form"
        component={defaultComponentForm}
      />
 

      
    </Switch>
  );
}
