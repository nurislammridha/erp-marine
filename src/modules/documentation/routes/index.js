import React from "react";
import { Route } from "react-router-dom";
import DesignContainer from "../views/DesignContainer";

const routeDocumentation = [
  {
    path: "/documentation/design",
    name: "Design Documentation",
    component: DesignContainer,
    exact: true,
  },
];

function getDocumentationRoutes() {
  {
    return routeDocumentation.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getDocumentationRoutes;
