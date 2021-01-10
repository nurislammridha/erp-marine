import React from "react";
import { Route } from "react-router-dom";
import CertificateMasterAddContainer from "../views/CertificateMasterAddContainer";
import CertificateMasterContainer from "../views/CertificateMasterContainer";
// import CertificateMasterEditContainer from "../views/CertificateMasterEditContainer";

const certificateMasterRoutes = [
  {
    path: "/certificate/configure/master-certificate",
    name: "Certificate Main List",
    component: CertificateMasterContainer,
    exact: true,
  },

  {
    path: "/certificates-main/create",
    name: "Certificate Create",
    component: CertificateMasterAddContainer,
    exact: true,
  },
  // {
  //   path: "/certificates-main/edit",
  //   name: "Certificate Create",
  //   component: CertificateMasterEditContainer,
  //   exact: true,
  // },
  
];

export default certificateMasterRoutes;
