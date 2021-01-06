import React from "react";
import { Route } from "react-router-dom";
import issueAuthorityRoutes from "../issue-authority/routes";
import certificateTypeRoutes from "../certificate-types/routes";

const certificateModuleRoutes = [
  ...issueAuthorityRoutes,
  ...certificateTypeRoutes,
];

function getCertificateModuleRoutes() {
  {
    return certificateModuleRoutes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getCertificateModuleRoutes;
