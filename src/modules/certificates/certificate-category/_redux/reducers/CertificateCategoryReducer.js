import * as Types from "../types/Types";
const initiliazeState = {
  certificateCategoryList: [],
  certificatesPaginatedData: null,
  status: false,
  isLoading: false,
  certificateCategoryInput: {
    strCertificateCategoriName: "",
    intActionBy: "1",
    isActive: "1",
  },
};

function CertificateCategoryReducer(state = initiliazeState, action) {
  switch (action.type) {
    case Types.CERTIFICATE_CATEGORY_CREATE:
      const certificateCategoryInput = { ...state.certificateCategoryInput };
      certificateCategoryInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        certificateCategoryInput,
      };
    case Types.CERTIFICATE_CATEGORY_STORE:
      console.log("action.payload,", action.payload);
      return {
        ...state,
        status: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    case Types.GET_CERTIFICATE_CATEGORY_LIST:
      console.log("action.payload", action.payload);
      return {
        ...state,
        certificateCategoryList: action.payload,
        // certificatesPaginatedData: action.payload.certificatesPaginatedData,
        // isLoading: action.payload.isLoading,
      };

    default:
      break;
  }
  return state;
}

export default CertificateCategoryReducer;
