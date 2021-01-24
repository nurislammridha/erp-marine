import React from "react";
import { Route } from "react-router-dom";
import VoyageActivityContainer from "../views/VoyageActivityContainer";
import VoyageActivityCreateContainer from "../views/VoyageActivityCreateContainer";
import VoyageActivityDetailContainer from "../views/VoyageActivityDetailContainer";
import VoyageDetailContainer from "../views/VoyageActivityDetailContainer";
import VoyageListContainer from "../views/VoyageListContainer";
import VoyageListDetailContainer from "../views/VoyageListDetailContainer";
import VoyageAddContainer from "../views/VoyageAddContainer";
import LaytimeContainer from "../laytime/views/LaytimeContainer";
import LaytimeInfoContainer from "../laytime/views/LaytimeInfoContainer";
import BookingEntryContainer from "../booking/views/BookingEntryContainer";
import BookingListContainer from "../booking/views/BookingListContainer";

const routeVoyage = [
  {
    path: "/voyage/list",
    name: "Voyage List",
    component: VoyageListContainer,
    exact: true,
  },
  {
    path: "/voyage/add",
    name: "Voyage Add",
    component: VoyageAddContainer,
    exact: true,
  },
  {
    path: "/voyage/list/:id",
    name: "Voyage List Detail",
    component: VoyageListDetailContainer,
    exact: true,
  },
  {
    path: "/voyage/voyage-activity",
    name: "Voyage Activity",
    component: VoyageActivityContainer,
    exact: true,
  },
  {
    path: "/voyage/voyage-activity/detail/:id",
    name: "Voyage Activity Detail",
    component: VoyageActivityDetailContainer,
    exact: true,
  },
  {
    path: "/voyage/voyage-activity/create/",
    name: "Voyage Activity Create",
    component: VoyageActivityCreateContainer,
    exact: true,
  },
  {
    path: "/voyage/voyage-activity/create",
    name: "Voyage Activity Create",
    component: VoyageActivityCreateContainer,
    exact: true,
  },

  {
    path: "/voyage/laytime/laytimelist",
    name: "Laytime List",
    component: LaytimeContainer,
    exact: true,
  },

  {
    path: "/voyage/laytime/laytimeinfo",
    name: "Laytime Info",
    component: LaytimeInfoContainer,
    exact: true,
  },

  {
    path: "/voyage/booking/bookinglist",
    name: "Booking List",
    component: BookingListContainer,
    exact: true,
  },

  {
    path: "/voyage/booking/bookingentry",
    name: "Booking Entry",
    component: BookingEntryContainer,
    exact: true,
  },
];

function getVoyageRoutes() {
  {
    return routeVoyage.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getVoyageRoutes;
