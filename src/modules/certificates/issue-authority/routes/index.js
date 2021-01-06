import React from "react";
import { Route } from "react-router-dom";
import IssueAutorityContainer from "../views/IssueAuthorityContainer";

const issueAuthorityRoutes = [
  {
    path: "/certificates/issue-authority/list",
    name: "Issue Autority List",
    component: IssueAutorityContainer,
    exact: true,
  },
];

export default issueAuthorityRoutes;
