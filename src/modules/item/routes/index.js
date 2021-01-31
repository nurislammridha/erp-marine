import React from "react";
import { Route } from "react-router-dom";
import ItemListContainer from "../view/ItemListContainer";
import ItemAddContainer from "../view/ItemAddContainer";
import ItemEdit from "../information/components/ItemEdit";

const routeItems = [
  {
    path: "/items/list",
    name: "item list",
    component: ItemListContainer,
    exact: true,
  },
  {
    path: "/items/add",
    name: "item add",
    component: ItemAddContainer,
    exact: true,
  },
  {
    path: "/items/edit/:id",
    name: "item add",
    component: ItemEdit,
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
