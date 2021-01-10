import * as Types from "../types/Type";

const initialState = {
  certificates: [],
  certificateMasterInput: {
    strCertificateName: "",
    strCertificateCategoriName: "",
    strVesselName: "",
    intActionBy: "",
    isActive: "1",
  },
  certificateMasterList: [],
  status: false,
};

const CertificateMasterReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_CERTIFICATE_MASTER_INPUT:
      const certificateMasterInput = { ...state.certificateMasterInput };
      certificateMasterInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        certificateMasterInput,
      };

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
