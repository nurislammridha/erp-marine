import React from "react";
import { Route } from "react-router-dom";
import CertificateCategoryContainer from "../views/CertificateCategoryContainer";
// import CertificateCategoryContainer from "../views/CertificateCategoryContainer";

const certificateCategoryRoutes = [
  {
    path: "/certificate/configure/categories",
    name: "Certificate Category List",
    component: CertificateCategoryContainer,
    exact: true,
  },
];

export default certificateCategoryRoutes;
