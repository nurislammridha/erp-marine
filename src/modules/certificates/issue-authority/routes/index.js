import React from "react";
import { Route } from "react-router-dom";
import IssueAutorityListContainer from "../views/IssueAuthorityListContainer";

const issueAuthorityRoutes = [
  {
    path: "/certificate/configure/issuing-authority",
    name: "Issuing Autority List",
    component: IssueAutorityListContainer,
    exact: true,
  },
];

export default issueAuthorityRoutes;
