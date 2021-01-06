import React from "react";

const SalaryReportContainer = () => {
    return (
        <>
            <div>
                {/* <iframe src="https://report.akij.net/ReportServer?/ASLL/NOON%20Report&rs:Embed=true&rc:LinkTarget=_self" height="800" width="1200" title="Iframe Example"></iframe> */}
                <iframe src="https://report.akij.net/reports/report/ASLL/ASLL_Payroll?rs:Embed=true" height="800" width="1000" title="Iframe Example"></iframe>
            </div>
        </>
    );
};

export default SalaryReportContainer;
