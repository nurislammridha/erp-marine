import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../layout";

import BarChart from "../../../modules/master/components/Chart/BarChart";
import DougHuntChart from "../../../modules/master/components/Chart/DougHuntChart";
import DashBoardCard from "../../../modules/dashboard/components/DashBoardCard";
import CircularProgressBar from "../../../modules/master/components/CircularProgressBar/CircularProgressBar";
import LineChart from "../../../modules/master/components/Chart/LineChart";
import TableCircularProgressBar from "../../../modules/master/components/CircularProgressBar/TableCircularProgressBar";
import PolarChart from "../../../modules/master/components/Chart/PolarChart";
import SalesPaymentTable from "../../../modules/master/components/DashboardTable/SalesPaymentTable";
import PurchasePaymentTable from "../../../modules/master/components/DashboardTable/PurchasePaymentTable";
import DashboardNavbar from "../../../modules/dashboard/components/DashboardNavbar";

export function Dashboard() {
  const uiService = useHtmlClassService();
  // const layoutProps = useMemo(() => {
  //   return {
  //     demo: objectPath.get(uiService.config, "demo"),
  //   };
  // }, [uiService]);
  return (
    <>
      {/* <DashboardMain /> */}

      {/* DashBoard design Starts 11:00   */}
      <DashboardNavbar/>
      <DashBoardCard />

      <div className="container  dashboard__pb ">
        <div className="row">
          <div className="col-lg-6  col-12">
            <DougHuntChart />
          </div>
          <div className="col-lg-6 col-12">
            <BarChart />
          </div>
        </div>
        <div className="row linechart">
          <div className="col-lg-6  col-12">
            <LineChart />
          </div>

          <div className="col-lg-6  col-12">
            {/* <CircularProgressBar /> */}
            {/* <TableCircularProgressBar /> */}
            <PolarChart />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6  col-12">
            <SalesPaymentTable />
          </div>

          <div className="col-lg-6  col-12 purchase-table ">
            <PurchasePaymentTable />
          </div>
         
        </div>
      
      </div>
    </>
  );
}
