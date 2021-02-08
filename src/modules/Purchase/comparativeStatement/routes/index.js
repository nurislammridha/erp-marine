import React from "react";
import { Route } from "react-router-dom";

import ComparativeStatementListContainer from "../views/ComparativeStatementListContainer";

const routeComparativeStatement = [
  {
    path: "/comparativestatement/list",
    name: "comparativestatementlist",
    component:ComparativeStatementListContainer,
    exact: true,
  },
  
];

function getComparativeStatementRoutes() {
  {
    return routeComparativeStatement.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getComparativeStatementRoutes;
