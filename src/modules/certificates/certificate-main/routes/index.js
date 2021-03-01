import React from "react";
import { Route } from "react-router-dom";
import CertificateMainAddContainer from "../views/CertificateMainAddContainer";
import CertificateMainContainer from "../views/CertificateMainContainer";
import CertificateMainEditContainer from "../views/CertificateMainEditContainer";
import CertificateMainReportContainer from "../views/CertificateMainReportContainer";

const certificateMainRoutes = [
  {
    path: "/certificates-main/list",
    name: "Certificate Main List",
    component: CertificateMainContainer,
    exact: true,
  },
  {
    path: "/certificate_report/list",
    name: "Certificate Main Report List",
    component: CertificateMainReportContainer,
    exact: true,
  },

  {
    path: "/certificates-main/create",
    name: "Certificate Create",
    component: CertificateMainAddContainer,
    exact: true,
  },
  {
    path: "/certificates-main/edit/:id",
    name: "Certificate Create",
    component: CertificateMainEditContainer,
    exact: true,
  },
  
];

export default certificateMainRoutes;
