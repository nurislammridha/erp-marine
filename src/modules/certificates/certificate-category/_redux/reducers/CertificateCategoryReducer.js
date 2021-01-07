// import * as Types from "../types/Types";
import * as Types from "../types/Types"
const initiliazeState = {
  certificateCategoryList: [],
  certificateCategoryInput: {
      strCertificateCategoriName: '',
    //   intActionBy: '',
    //   dteLastActionDateTime: '',
    //   dteServerDateTime: '',
    //   isActive: ''
  },
};

function CertificateCategoryReducer(state = initiliazeState, action) {
  switch (action.type) {
      case Types.CERTIFICATE_CATEGORY_CREATE:
          const certificateCategoryInput = { ...state.certificateCategoryInput }
          certificateCategoryInput[action.payload.name] = action.payload.value
      return {
          ...state,
          certificateCategoryInput
      };
      break;

    default:
      break;
  }
  return state;
}

export default CertificateCategoryReducer;
