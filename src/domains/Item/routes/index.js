import React from "react";
import { Route, withRouter } from "react-router-dom";
import BasicItemInformationListContainer from "../views/basic-information/BasicItemInformationListContainer";

const routesItems = [
  {
    path: "/procurement/item-management/basic-information",
    name: "Basic Item Information Component",
    component: BasicItemInformationListContainer,
    exact: true,
  },
];

function getItemRoutes() {
  {
    return routesItems.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default (getItemRoutes);
