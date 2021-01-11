import * as Types from "../types/Type";

const initialState = {
  certificateMasterInput: {
    strCertificateName: "",
    strCertificateCategoriName: "",
    strVesselName: "",
    intCategoryID: "",
    intVesselID: null,
    intActionBy: "2",
    isActive: "1",
  },
  certificateMasterList: [],
  status: false,
};

const CertificateMasterReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_CERTIFICATE_MASTER_INPUT:
      console.log("action.payload.value", action.payload);
      const certificateMasterInputData = { ...state.certificateMasterInput };
      certificateMasterInputData[action.payload.name] = action.payload.value;
      return {
        ...state,
        certificateMasterInput: certificateMasterInputData,
      };
    case Types.CERTIFICATE_MASTER_SUBMIT:
      if (action.payload.status) {
        return {
          ...state,
          certificateMainInfo: initialState.certificateMainInfo,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }

    case Types.GET_CERTIFICATE_MASTER_LIST:
      console.log("action.payload,", action.payload);
      return {
        ...state,
        certificateMasterList: action.payload,
      };

    case Types.CREATE_CERTIFICATE_MASTER_LIST:
      console.log("action.payload,", action.payload);
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      break;
  }
  return newState;
};
export default CertificateMasterReducer;
