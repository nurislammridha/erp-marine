import React from "react";
import { Route } from "react-router-dom";
import EditUserContainer from "../information/views/EditUserContainer";
import NewUserContainer from "../information/views/NewUserContainer";
import RolePermissionCreateContainer from "../information/views/RolePermissionCreateContainer";
import RolePermissionEditContainer from "../information/views/RolePermissionEditContainer";

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
    path: "/role-permission/create",
    name: "rolepermissionlist",
    component: RolePermissionCreateContainer,
    exact: true,
  },
  {
    path: "/role-permission/edit/:id",
    name: "rolepermissionlist",
    component: RolePermissionEditContainer,
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
  {
    path: "/user/edit/:id",
    name: "user edit",
    component: EditUserContainer,
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
