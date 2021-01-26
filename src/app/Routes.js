/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useEffect } from "react";
import { Redirect, Switch, Route, withRouter, useLocation   } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export const Routes = () => {
  const location = useLocation();

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    // console.log('location.pathname', location.pathname);
    // console.log('userData', userData);

    if(location.pathname != '/auth/login'){
      if(typeof userData == 'undefined' ||  userData == null ){
        window.location.href = "/auth/login";
      }
    }
    
  }, []);

  return (
    <Switch>
      {/* {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
          <Redirect from="/auth" to="/auth/login" />
        )} */}
      <Route path="/auth/login" component={AuthPage} />
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {/* {!isAuthorized ? (
        <Redirect to="/auth/login" />
      ) : ( */}


        <Layout>
          <BasePage />
        </Layout>

       {/* )} */}
    </Switch>
  )
};