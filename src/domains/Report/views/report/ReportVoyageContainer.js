import React from "react";
import VesselAdd from "../../components/vessel/VesselAdd";

const ReportVoyageContainer = () => {
  return (
    <>
      <div>
        <iframe src="https://report.akij.net/ReportServer?/ASLL/NOON%20Report&rs:Embed=true&rc:LinkTarget=_self" height="800" width="1200" title="Iframe Example"></iframe>
      </div>
    </>
  );
};

export default ReportVoyageContainer;
