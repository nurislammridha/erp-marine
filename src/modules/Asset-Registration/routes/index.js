import React from "react";
import { Route } from "react-router-dom";
import AdminInformationContainer from "../information/views/AdminInformationContainer";
import BasicInformationContainer from "../information/views/BasicInformationContainer";
import AccountsInformationContainer from "../view/AccountsInformationContainer";



const routeAssetRegistration = [
  {
    path: "/basic-information/create",
    name: "basicinformation",
    component: BasicInformationContainer,
    exact: true,
  },
  {
    path: "/admin_information/create",
    name: "admininformation",
    component: AdminInformationContainer,
    exact: true,
  },
  {
    path: "/accounts-information/create",
    name: "accountsinformation",
    component: AccountsInformationContainer,
    exact: true,
  },

];

function getAssetRegistrationRoutes() {
  {
    return routeAssetRegistration.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getAssetRegistrationRoutes;
