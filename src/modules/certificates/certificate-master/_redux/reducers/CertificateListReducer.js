import * as Types from "../types/Type";

const initialState = {
  certificateMasterPaginatedData: null,
  isLoading: false,
  addStatus: false,
  certificateMasterInput: {
    strCertificateName: "",
    strCertificateCategoryName: "",
    intActionBy: "1",
    isActive: "1",
  },
  certificateMasterList: [],
  status: false,
};

const CertificateMasterReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_CERTIFICATE_MASTER_INPUT:
      const CertificateMasterInputData = { ...state.certificateMasterInput };
      CertificateMasterInputData[action.payload.name] = action.payload.value;
      return {
        ...state,
        certificateMasterInput: CertificateMasterInputData,
      };

    case Types.CERTIFICATE_MASTER_SUBMIT:
      return {
        ...state,
        status: action.payload.status,
        addStatus: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    case Types.GET_CERTIFICATE_MASTER_LIST:
      return {
        ...state,
        certificateMasterList: action.payload.certificateMasterList,
        certificateMasterPaginatedData:
          action.payload.certificateMasterPaginatedData,
        isLoading: action.payload.isLoading,
      };

    case Types.CREATE_CERTIFICATE_MASTER_LIST:
      return {
        ...state,
        status: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    case Types.SET_CERTIFICATE_MASTER_EDIT_DATA:
      return {
        ...state,
        certificateMasterInput: action.payload,
      };

    case Types.EDIT_CERTIFICATE_MASTER:
      return {
        ...state,
        editStatus: action.payload.status,
      };

    default:
      break;
  }
  return newState;
};
export default CertificateMasterReducer;
