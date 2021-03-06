import { getFormattedCurrentDate } from "../../../master/utils/DateHelper";
import * as Types from "../../types/Types";
import { checkObjectInArray } from "../../utils/Helper";

const initialState = {
  textBoxShow: false,
  isLoading: false,
  submitStatus: false,
  crReportListStatus: false,
  crReportDetailsLoadingStatus: false,
  inputData: {
    intEmployeeId: null,
    intRankId: null,
    intVesselId: null,
    dteFromDate: "",
    dteToDate:getFormattedCurrentDate(),
    status: {},
    strReasonOfAppraisal: "Crew sign off",
    strOverallPerformance: "Outstanding",
    ysnPromotionRecomanded: "No",
    ysnFurtherRecomanded: "No",
    strPromotionRecomandedDate:getFormattedCurrentDate(),
    strFurtherRecomandedDate:getFormattedCurrentDate(),
    strMasterSign: "Crew sign off",
    strCESign: "Crew sign off",
  },
  criteriaList: [],
  appraisalList: [],
  crReportList: [],
  crReportDetails: [],
  crReports: [],
  crReportPaginatedData: null,
  crReportDetailsById: [],
  crReportDetailsByIdLoadingStatus: false,
};

const EmployeeCrReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_EMPLOYEE_CRITERIA:
      return {
        ...state,
        criteriaList: action.payload.data,
        isLoading: action.payload.isLoading,
      };
    case Types.EMPLOYEE_REASON_OF_APPRAISAL:
      return {
        ...state,
        appraisalList: action.payload,
      };
    case Types.EMPLOYEE_CR_REPORT_SUBMIT:
      return {
        ...state,
        submitStatus: action.payload.isLoading,
        // inputData:resetSubmitData,
      };
    case Types.GET_EMPLOYEE_DETAILS_BY_ID:
      let cloneEmployee = { ...state.inputData };
      cloneEmployee.intEmployeeId = parseInt(action.payload.intID);
      cloneEmployee.intRankId = parseInt(action.payload.intRankId);
      cloneEmployee.intVesselId = parseInt(action.payload.intVesselID);
      cloneEmployee.dteFromDate = action.payload.status.dteActionDate;
      cloneEmployee.strRank = action.payload.strRank;
      cloneEmployee.dteToDate = getFormattedCurrentDate();
      cloneEmployee.strVesselName = action.payload.strVesselName;
      return {
        ...state,
        inputData: cloneEmployee,
      };
    case Types.SELECT_REASON_OF_APPRAISAL:
      let cloneInput = { ...state.inputData };
      cloneInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        textBoxShow: action.payload.value == "Other" ? true : false,
        inputData: cloneInput,
      };
    case Types.GET_EMPLOYEE_CR_REPORT_LIST:
      return {
        ...state,
        crReportList: action.payload.data,
        crReportListStatus: action.payload.isLoading,
      };
    case Types.GET_EMPLOYEE_CR_REPORT_DETAILS:
      return {
        ...state,
        crReportDetails: action.payload.data,
        crReportDetailsLoadingStatus: action.payload.isLoading,
      };
    case Types.GET_EMPLOYEE_CRITERIA_SELECT:
      let cloneSelectCriteria = { ...state.inputData };
      let newCriteria = { ...state.inputData };

      let newCriteriaObj = {
        intOptionMainId: 1,
        strOptionValue: "Hello",
        ysnIsChecked: 1,
      };

      let indexParentCriteria = action.payload.indexParentCriteria;

      newCriteriaObj.intOptionMainId = action.payload.parentCriteria.intID;
      let indexChild = action.payload.indexChild;
      let cloneObj = state.criteriaList.slice();
      let j = 0;
      for (let i = 0; i < cloneObj.length; i++) {
        if (i == indexParentCriteria) {
          for (let c = 0; c < cloneObj[i].options.length; c++) {
            const element = cloneObj[i].options[c];

            cloneObj[i].options[c].ysnChecked = 0;

            // check already an entry for this parentCriteria.intID, if entry, then remove those data / or update that data
            if (indexChild == c) {
              cloneObj[i].options[c].ysnChecked = !cloneObj[i].options[c]
                .ysnChecked;
            }
          }
        }
      }

      return {
        ...state,
        criteriaList: cloneObj,
      };

    case Types.GET_CR_REPORT_PAGINATE_LIST:
      return {
        ...state,
        crReports: action.payload.crReportList,
        crReportPaginatedData: action.payload.crReportPaginatedData,
        isLoading: action.payload.isLoading,
      };

    case Types.GET_CR_REPORT_DETAILS:
      return {
        ...state,
        crReportDetailsById: action.payload.data,
        crReportDetailsByIdLoadingStatus: action.payload.isLoading,
      };

    default:
      break;
  }
  return newState;
};
export default EmployeeCrReducer;
