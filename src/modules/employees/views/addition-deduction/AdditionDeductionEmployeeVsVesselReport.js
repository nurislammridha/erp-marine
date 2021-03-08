import React from "react";

const AdditionDeductionEmployeeVsVesselReport = () => {
    return (
        <>
            <div>
                {/* <iframe src="https://report.akij.net/ReportServer?/ASLL/NOON%20Report&rs:Embed=true&rc:LinkTarget=_self" height="800" width="1200" title="Iframe Example"></iframe> */}
                <iframe src="https://report.akij.net/ReportServer/Pages/ReportViewer.aspx?/ASLL/Employee%20vs%20Vessel%20Report&intVassalId=102&rs:Embed=true&rc:LinkTarget=_self" height="800" width="1000" title="Iframe Example"></iframe>
            </div>
        </>
    );
};

export default AdditionDeductionEmployeeVsVesselReport;
