import React from "react";
import { Route } from "react-router-dom";
import BasicInformationContainer from "../information/views/BasicInformationContainer";
import AccountsInformationContainer from "../view/AccountsInformationContainer";



const routeAssetRegistrationParking = [
  {
    path: "/asset-parking/basic-information/create",
    name: "basicinformation",
    component:BasicInformationContainer,
    exact: true,
  },
  {
    path: "/asset-parking/accounts-information/create",
    name: "accountsinformation",
    component:AccountsInformationContainer,
    exact: true,
  },
 
];

function getAssetRegistrationParkingRoutes() {
  {
    return routeAssetRegistrationParking.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default  getAssetRegistrationParkingRoutes;
