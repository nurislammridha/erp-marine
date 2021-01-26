import React from "react";
import { Route } from "react-router-dom";
import VesselItemAddContainer from "../views/vesselItem/VesselItemAddContainer";
import VesselItemListContainer from "../views/vesselItem/VesselItemListContainer";
import VesselItemEditContainer from "../views/vesselItem/VesselItemEditContainer";

const routesVesselItem = [
  {
    path: "/vessel-items/list",
    name: "Vessel Item List",
    component: VesselItemListContainer,
    exact: true,
  },
  {
    path: "/vessel-items/add",
    name: "Vessel Item Add",
    component: VesselItemAddContainer,
    exact: true,
  },

  {
    path: "/vessel-items/edit",
    name: "Vessel Item Edit",
    component: VesselItemEditContainer,
    exact: true,
  },
];

function getVesselItemRoutes() {
  {
    return routesVesselItem.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getVesselItemRoutes;
