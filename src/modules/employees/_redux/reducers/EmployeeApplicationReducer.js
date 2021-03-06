import * as Types from "../../types/Types";

const initialState = {
  vesselList: [],
  seafarerList: [],
  rankList: [],
  applications: [],
  applicationPaginatedData: null,
  employeeApplicationTypeList: [],
  employeeApplicationList: [],
  employeeApplicationInput: {
    intApplicationTypeId: 1,
    intEmployeeId: 0,
    intRankId: 0,
    intVesselId: 0,
    strReceiverName: "",
    dteFromDate: "",
    strPortName: "",
    strApplicationBody: "",
    strCommencementTenure: "",
    dteDateOfCompletion: "",
    dteExtensionRequested: "",
    dteRejoiningDate: "",
    strRemarks: "",
    strApplicationSubject: "",
  },
  addStatus: false,
  addData: 0,
  isLoading: false,
  ysnCRReport: "0",
  editStatus: false,
  editData: 0,
};

const EmployeeApplicationReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_EMPLOYEE_APPLICATION_INPUT:
      const employeeApplicationInput = {
        ...state.employeeApplicationInput,
      };
      employeeApplicationInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        employeeApplicationInput,
      };

    case Types.APPLICATION_PAGINATE_LIST:
      return {
        ...state,
        applications: action.payload.applications,
        applicationPaginatedData: action.payload.applicationPaginatedData,
        isLoading: action.payload.isLoading,
      };

    case Types.CHANGE_APPLICATION_TYPE_INPUT:
      const employeeApplicationTypeInput = {
        ...state.employeeApplicationInput,
      };

      let crReportValue = "0";

      employeeApplicationTypeInput["intApplicationTypeId"] =
        action.payload.value.value;

      if (action.payload.value.ysnCRReport === "1") {
        crReportValue = "1";
      }

      return {
        ...state,
        employeeApplicationInput: employeeApplicationTypeInput,
        ysnCRReport: crReportValue,
      };

    case Types.GET_VESSEL_LIST:
      let vesselData = [];
      if (action.payload.vesselList) {
        action.payload.vesselList.forEach((item) => {
          let items = {
            value: item.intID,
            label: item.strVesselName,
          };
          vesselData.push(items);
        });
      }
      return {
        ...state,
        vesselList: vesselData,
      };

    case Types.GET_SEAFARER_LIST:
      let seafarerData = [];
      if (action.payload.seafarerList) {
        action.payload.seafarerList.forEach((item) => {
          let items = {
            value: item.intID,
            label: item.strName,
          };
          seafarerData.push(items);
        });
      }
      return {
        ...state,
        seafarerList: seafarerData,
      };

    case Types.GET_RANK_LIST:
      let rankData = [];
      if (action.payload.rankList) {
        action.payload.rankList.forEach((item) => {
          let items = {
            value: item.intID,
            label: item.strRankName,
          };
          rankData.push(items);
        });
      }
      return {
        ...state,
        rankList: rankData,
      };

    case Types.GET_EMPLOYEE_APPLICATION_TYPE:
      let applicationTypeData = [];
      if (action.payload.applicationTypeList) {
        action.payload.applicationTypeList.forEach((item) => {
          let items = {
            value: item.intID,
            label: item.strTypeName,
            ysnCRReport: item.ysnCRReport,
          };
          applicationTypeData.push(items);
        });
      }
      return {
        ...state,
        employeeApplicationTypeList: applicationTypeData,
      };

    case Types.POST_EMPLOYEE_APPLICATION:
      return {
        ...state,
        addStatus: action.payload.status,
        addData: action.payload.data.data,
        isLoading: action.payload.isLoading,
      };

    case Types.GET_EMPLOYEE_APPLICATION:
      return {
        ...state,
        employeeApplicationList: action.payload.applicationList,
      };

    case Types.SET_EMPLOYEE_APPLICATION_EDIT_DATA:
      return {
        ...state,
        employeeApplicationInput: action.payload,
      };

    case Types.EDIT_EMPLOYEE_APPLICATION:
      return {
        ...state,
        editStatus: action.payload.status,
        editData: action.payload.data.data,
        isLoading: action.payload.isLoading,
      };

    default:
      break;
  }
  return newState;
};
export default EmployeeApplicationReducer;
