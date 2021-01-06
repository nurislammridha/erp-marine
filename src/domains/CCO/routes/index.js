import React from "react";
import { Route } from "react-router-dom";
import ControllingUnitListContainer from "../views/controlling-unit/ControllingUnitListContainer";
import EmployeeListContainer from "../views/employee/EmployeeListContainer";
import EmployeeAddContainer from "../views/employee/EmployeeAddContainer";
import EmployeeEducationAddContainer from "../views/employee/EmployeeEducationAddContainer";
import EmployeeRecordListContainer from "../views/employee/EmployeeRecordListContainer";
import AdditionDedutionListContainer from "../views/addition-deduction/AdditionDedutionListContainer";
import EmployeeDetailsContainer from "../views/employee/EmployeeDetailsContainer";
import ReportVoyageContainer from "../../Report/views/report/ReportVoyageContainer";
import EmployeeSigningListContainer from "../views/employee/EmployeeSigningListContainer";
import EmployeeSigningAddContainer from "../views/employee/EmployeeSigningAddContainer";
import EmployeeEditContainer from "../views/employee/EmployeeEditContainer";
import EmployeeDocumentListContainer from "../views/employee/EmployeeDocumentListContainer";
import EmployeeCertificateListContainer from "../views/employee/EmployeeCertificateListContainer";
import EmployeeBankDetailsListContainer from "../views/employee/EmployeeBankDetailsListContainer";
import EmployeeReferenceListContainer from "../views/employee/EmployeeReferenceListContainer";
import SalaryReportContainer from "../../Report/views/report/SalaryReportContainer";
import AdditionDeductionBulkUpload from "../views/addition-deduction/AdditionDeductionBulkUpload";
import EmployeeSigningEditContainer from "../views/employee/EmployeeSigningEditContainer";
import AdditionDeductionBulkUploadForm from "../views/addition-deduction/AdditionDeductionBulkUploadForm";
import AdditionDeductionEmployeeVsVesselReport from "../views/addition-deduction/AdditionDeductionEmployeeVsVesselReport";
import BEFTNReport from "../../Report/views/report/BEFTNReportContainer";
import SalaryReportCheckContainer from "../../Report/views/report/SalaryReportCheckContainer";
import FCBEFTNReportContainer from "../../Report/views/report/FCBEFTNReportContainer";
import SalaryGenerateContainer from "../../Report/views/report/SalaryGenerateContainer";
import EmployeeCrReportContainer from "../views/employee/EmployeeCrReportContainer";
import CertificateReportContainer from "../../Report/views/report/CertificateReportContainer";
import CertificateDayRerportContainer from "../../Report/views/report/CertificateDayRerportContainer";
import CurrencyConversionContainer from "../views/currency-conversion/CurrencyConversionContainer";

const routesCCO = [
  {
    path: "/financial-management/cost-controlling/controlling-unit",
    name: "Controlling Unit",
    component: ControllingUnitListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-list",
    name: "Hr",
    component: EmployeeListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-add",
    name: "Hr",
    component: EmployeeAddContainer,
    exact: true,
  },

  {
    path: "/employee/employee-edit/:intEmployeeId",
    name: "Hr",
    component: EmployeeEditContainer,
    exact: true,
  },

  {
    path: "/employee/employee-education-add/:intEmployeeId",
    name: "Hr",
    component: EmployeeEducationAddContainer,
    exact: true,
  },

  {
    path: "/employee/employee-education-edit/:intEmployeeId",
    name: "Hr",
    component: EmployeeEducationAddContainer,
    exact: true,
  },

  {
    path: "/employee/employee-record-add/:intEmployeeId",
    name: "Hr",
    component: EmployeeRecordListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-record-list/:intEmployeeId",
    name: "Hr",
    component: EmployeeRecordListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-documents-add/:intEmployeeId",
    name: "Hr",
    component: EmployeeDocumentListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-documents-list/:intEmployeeId",
    name: "Hr",
    component: EmployeeDocumentListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-certificates-add/:intEmployeeId",
    name: "Hr",
    component: EmployeeCertificateListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-certificates-list/:intEmployeeId",
    name: "Hr",
    component: EmployeeCertificateListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-bank-details-add/:intEmployeeId",
    name: "Hr",
    component: EmployeeBankDetailsListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-bank-details-edit/:intEmployeeId",
    name: "Hr",
    component: EmployeeBankDetailsListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-reference-add/:intEmployeeId",
    name: "Hr",
    component: EmployeeReferenceListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-reference-edit/:intEmployeeId",
    name: "Hr",
    component: EmployeeReferenceListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-signing-list",
    name: "Hr",
    component: EmployeeSigningListContainer,
    exact: true,
  },

  {
    path: "/employee/employee-cr-report",
    name: "Hr",
    component: EmployeeCrReportContainer,
    exact: true,
  },

  {
    path: "/employee/employee-signing-edit/:intID",
    name: "Hr",
    component: EmployeeSigningEditContainer,
    exact: true,
  },

  {
    path: "/employee/employee-signing-add",
    name: "Hr",
    component: EmployeeSigningAddContainer,
    exact: true,
  },

  {
    path: "/addition-deduction",
    name: "AdditionDeduction",
    component: AdditionDedutionListContainer,
    exact: true,
  },

  {
    path: "/addition-deduction/bulk",
    name: "AdditionDeduction",
    component: AdditionDeductionBulkUpload,
    exact: true,
  },
  {
    path: "/currency-conversion",
    name: "Currency Conversion",
    component: CurrencyConversionContainer,
    exact: true,
  },

  {
    path: "/addition-deduction/report",
    name: "AdditionDeduction",
    component: AdditionDeductionEmployeeVsVesselReport,
    exact: true,
  },
  {
    path: "/employee/employee-details/:intEmployeeId",
    name: "Vessel",
    component: EmployeeDetailsContainer,
    exact: true,
  },

  {
    path: "/report/noon-report",
    name: "ReportMenu",
    component: ReportVoyageContainer,
    exact: true,
  },

  {
    path: "/report/all-report",
    name: "ReportMenu",
    component: CertificateReportContainer,
    exact: true,
  },

  {
    path: "/report/day-report",
    name: "ReportMenu",
    component: CertificateDayRerportContainer,
    exact: true,
  },

  {
    path: "/report/salary-report",
    name: "ReportMenu",
    component: SalaryReportContainer,
    exact: true,
  },

  {
    path: "/report/salary-report-check",
    name: "ReportMenu",
    component: SalaryReportCheckContainer,
    exact: true,
  },
  {
    path: "/report/salary-report-form",
    name: "ReportForm",
    component: AdditionDeductionBulkUploadForm,
    exact: true,
  },

  {
    path: "/report/salary-generate",
    name: "ReportForm",
    component: SalaryGenerateContainer,
    exact: true,
  },

  {
    path: "/report/beftn-report",
    name: "ReportForm",
    component: BEFTNReport,
    exact: true,
  },
  {
    path: "/report/beftn-report-fc",
    name: "ReportForm",
    component: FCBEFTNReportContainer,
    exact: true,
  },
];

function getCCORoutes() {
  {
    return routesCCO.map((route, index) => (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
  }
}
export default getCCORoutes;
