import React from "react";
import { Route } from "react-router-dom";
import ItemListContainer from "../view/ItemListContainer";

const routeItems = [
  {
    path: "/items/list",
    name: "partners info add",
    component: ItemListContainer,
    exact: true,
  },
];

function getItemsRoutes() {
  {
    return routeItems.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getItemsRoutes;
