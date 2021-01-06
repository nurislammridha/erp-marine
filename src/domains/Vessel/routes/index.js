import React from "react";
import { Route } from "react-router-dom";
import VesselAddContainer from "../views/vessel/VesselAddContainer";
import VesselListContainer from "../views/vessel/VesselListContainer";
import VesselEditContainer from "../views/vessel/VesselEditContainer";
import VesselAccountContainer from "../views/vessel/VesselAccountContainer";

const routesVessel = [
  {
    path: "/vessels/list",
    name: "Vessel List",
    component: VesselListContainer,
    exact: true,
  },
  {
    path: "/vessels/add",
    name: "Vessel Add",
    component: VesselAddContainer,
    exact: true,
  },

  {
    path: "/vessels/edit",
    name: "Vessel Edit",
    component: VesselEditContainer,
    exact: true,
  },
  {
    path: "/vessels/vessel-account",
    name: "Vessel Account",
    component: VesselAccountContainer,
    exact: true,
  },
];

function getVesselRoutes() {
  {
    return routesVessel.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getVesselRoutes;
