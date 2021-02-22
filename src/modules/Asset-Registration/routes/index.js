import React from "react";
import { Route } from "react-router-dom";
import BasicInformationContainer from "../information/views/BasicInformationContainer";



const routeAssetRegistration = [
  {
    path: "/basic_information/create",
    name: "basicinformation",
    component:BasicInformationContainer,
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
export default  getAssetRegistrationRoutes;
