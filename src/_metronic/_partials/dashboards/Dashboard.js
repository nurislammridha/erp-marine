import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../layout";
import { DashboardMain } from "./DashboardMain";
import CustomeDesign from "./CustomeDesign";

export function Dashboard() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      demo: objectPath.get(uiService.config, "demo"),
    };
  }, [uiService]);
  return (
    <>
      <DashboardMain />
      <CustomeDesign />
    </>
  );
}
