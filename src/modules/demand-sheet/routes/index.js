import React from "react";
import { Route } from "react-router-dom";
import CargoPendingContainer from "../views/CargoPendingContainer";
import DemandEntryContainer from "../views/DemandEntryContainer";
import TopSheetContainer from "../views/TopSheetContainer";
import CargoBookingAprvTopsheetContainer from "../views/CargoBookingAprvTopsheetContainer";
import CargoBookingUpdateContainer from "../views/CargoBookingUpdateContainer";

const routeDemands = [
  {
    path: "/supply-chain/procurement/demand-entry",
    name: "Cargo Booking",
    component: DemandEntryContainer,
    exact: true,
  },
  {
    path: "/supply-chain/procurement/top-sheet",
    name: "Top Sheet",
    component: TopSheetContainer,
    exact: true,
  },
  {
    path: "/supply-chain/procurement/cargo-pending-details/:id",
    name: "Cargo Pending Details",
    component:CargoPendingContainer ,
    exact: true,
  },
  {
    path: "/supply-chain/procurement/aprv-top-sheet",
    name: "Aprv Top Sheet",
    component: CargoBookingAprvTopsheetContainer,
    exact: true,
  },
  {
    path: "/supply-chain/procurement/booking-update-details/:id",
    name: "Booking Update Detaills",
    component:CargoBookingUpdateContainer ,
    exact: true,
  },

  
];

function getDemandSheetRoutes() {
  {
    return routeDemands.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getDemandSheetRoutes;
