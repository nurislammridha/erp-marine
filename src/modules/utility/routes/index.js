import React from "react";
import { Route } from "react-router-dom";

import LoadableCalculatorContainer from "../information/views/LoadableCalculatorContainer";

const routeUtility = [
  {
    path: "/utility/calculator",
    name: "loadable calculator",
    component: LoadableCalculatorContainer,
    exact: true,
  },
  // {
  //   path: "/items/add",
  //   name: "item add",
  //   component: ItemAddContainer,
  //   exact: true,
  // },
];

function getUtilityRoutes() {
  {
    return routeUtility.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getUtilityRoutes;
