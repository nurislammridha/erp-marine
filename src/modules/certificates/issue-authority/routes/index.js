import React from "react";
import { Route } from "react-router-dom";
import IssueAutorityListContainer from "../views/IssueAuthorityListContainer";

const issueAuthorityRoutes = [
  {
    path: "/certificates/issue-authority/list",
    name: "Issue Autority List",
    component: IssueAutorityListContainer,
    exact: true,
  },
];

export default issueAuthorityRoutes;
