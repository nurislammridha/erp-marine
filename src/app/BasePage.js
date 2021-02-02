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
import getCertificateModuleRoutes from "../modules/certificates/routes";
import getDocumentationRoutes from "../modules/documentation/routes";
import getPartnersRoutes from "../modules/partners/routes";
import getItemsRoutes from "../modules/item/routes";
import getUtilityRoutes from "../modules/utility/routes";
import getRolePermissionManagementRoutes from "../modules/role-permission-management/routes";
import purchaseRoute from "../modules/Purchase/routes";
import purchaseOrderRoute from "../modules/Purchase/purhasesOrder/routes";
import purchaseOrderApproval from "../modules/Purchase/POApproval/routes";
import PurchaseApproval from "../modules/Purchase/PurchaseApproval/routes";
import getSupplierRoutes from "../modules/Purchase/SupplierCS/routes";
import getQuotationRoutes from "../modules/Purchase/Quotation/routes";

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

        {/* Certificate Issue Authority */}
        {getCertificateModuleRoutes()}
        {/* Certificate Types */}

        {/* Partners Information */}
        {getPartnersRoutes()}

        {/* Item Routes */}
        {getItemsRoutes()}

        {getDocumentationRoutes()}

        {getUtilityRoutes()}
        {getRolePermissionManagementRoutes()}
        {purchaseRoute()}
        {purchaseOrderRoute()}
        {purchaseOrderApproval()}
        {PurchaseApproval()}
        {getSupplierRoutes()}
        {getQuotationRoutes()}

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
};

export default BasePage;
