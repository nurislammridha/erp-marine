import React from "react";
import { Route } from "react-router-dom";

import QuotationDetailsContainer from "../views/QuotationDetailsContainer";




const routeQuotation = [
  {
    path: "/quotation/details",
    name: "quotationDetails",
    component:QuotationDetailsContainer,
    exact: true,
  },
  
];

function getQuotationRoutes() {
  {
    return routeQuotation.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getQuotationRoutes;
