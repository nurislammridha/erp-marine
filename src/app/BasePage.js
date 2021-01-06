import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
// import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";

// Domain Wise Routers
import getItemRoutes from "../domains/Item/routes/index";
import getPartnerRoutes from "../domains/Partner/routes/index";
import getCCORoutes from "../domains/CCO/routes/index";
import getVesselRoutes from "../domains/Vessel/routes";
import getProcurementRoutes from "./modules/SupplyChain/Procurement/routes";
import getVoyageRoutes from "../modules/voyage/routes/";
import getVesselItemRoutes from "../domains/VesselItem/routes";
import getDemandSheetRoutes from "../modules/demand-sheet/routes";

const BasePage = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/auth/login" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        {/* <ContentRoute path="/my-page" component={MyPage} /> */}
        {/* <Route path="/procurement" component={procurementPages} /> */}

        {/* DDD Concept Route Initilization */}

        {/* DCO Start */}
        {/* DCO End */}

        {/* CCO Start */}
        {getCCORoutes()}
        {/* CCO End */}

        {/* Item Start */}
        {getItemRoutes()}
        {/* Item End */}

        {/* Partner Start */}
        {getPartnerRoutes()}
        {/* Partner End */}

        {/* Partner Start */}
        {getVesselRoutes()}

        {/**Voyage */}
        {getVoyageRoutes()}
        {/* Partner End */}

        {/* Procurement Start */}
        {getProcurementRoutes()}
        {getDemandSheetRoutes()}
        {/* Procurement End */}

        {/* Vessel Item Routes Start */}
        {getVesselItemRoutes()}
        {/* Vessel Item Routes End */}

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
};

export default BasePage;
