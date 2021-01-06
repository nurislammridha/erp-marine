import React from "react";
import { Route } from "react-router-dom";
import CertificateTypeContainer from "../views/CertificateTypeContainer";

const certificateTypeRoutes = [
  {
    path: "/certificates/types/list",
    name: "Certificate List",
    component: CertificateTypeContainer,
    exact: true,
  },
  // {
  //   path: "/certificates/types/add",
  //   name: "Voyage Add",
  //   component: VoyageAddContainer,
  //   exact: true,
  // },
  // {
  //   path: "/certificates/types/list/:id",
  //   name: "Voyage List Detail",
  //   component: VoyageListDetailContainer,
  //   exact: true,
  // },
  // {
  //   path: "/certificates/types/voyage-activity",
  //   name: "Voyage Activity",
  //   component: VoyageActivityContainer,
  //   exact: true,
  // },
  // {
  //   path: "/certificates/types/voyage-activity/detail/:id",
  //   name: "Voyage Activity Detail",
  //   component: VoyageActivityDetailContainer,
  //   exact: true,
  // },
  // {
  //   path: "/certificates/types/voyage-activity/create/",
  //   name: "Voyage Activity Create",
  //   component: VoyageActivityCreateContainer,
  //   exact: true,
  // },
  // {
  //   path: "/certificates/types/voyage-activity/create",
  //   name: "Voyage Activity Create",
  //   component: VoyageActivityCreateContainer,
  //   exact: true,
  // },
];

export default certificateTypeRoutes;
