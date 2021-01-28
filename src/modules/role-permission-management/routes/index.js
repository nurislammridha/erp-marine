import React from "react";
import { Route } from "react-router-dom";
import NewUserContainer from "../information/views/NewUserContainer";

import RolePermissionListContainer from "../information/views/RolePermissionListContainer";
import UserListContainer from "../information/views/UserListContainer";

const routeRolePermissionManagement = [
  {
    path: "/role-permission/list",
    name: "rolepermissionlist",
    component: RolePermissionListContainer,
    exact: true,
  },
  {
    path: "/user/list",
    name: "userlist",
    component: UserListContainer,
    exact: true,
  },
  {
    path: "/user/new user",
    name: "newuser",
    component: NewUserContainer,
    exact: true,
  },
];

function getRolePermissionManagementRoutes() {
  {
    return routeRolePermissionManagement.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getRolePermissionManagementRoutes;
