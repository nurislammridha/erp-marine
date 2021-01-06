import React from "react";
import { Route } from "react-router-dom";
import PartnerBasicInformationListContainer from "../views/basic-information/PartnerBasicInformationListContainer";

const routesPartners = [
  {
    path: "/procurement/partner-management/basic-information",
    name: "Basic Item Information Component",
    component: PartnerBasicInformationListContainer,
    exact: true,
  },
];

function getPartnerRoutes() {
  {
    return routesPartners.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getPartnerRoutes;
