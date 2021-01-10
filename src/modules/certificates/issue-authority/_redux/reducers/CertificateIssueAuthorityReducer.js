import * as Types from "../types/Types";

const initialState = {
  issuingAuthorities: [],
  issuingAuthoritiesData: null,
  isLoading: false,
  CertificateIssueAuthirityInput: {
    strIssuingAuthorityName: "New issuing authority",
    isActive: "1",
    intActionBy: 1272,
  },
  errors: [],
  addStatus: false,
  editStatus: false,
  editing: false,
  deleteStatus: false,
  deleting: false,

  addMessage: "",
  editMessage: "",
  deleteMessage: "",
};

const CertificateIssueAuthorityReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_CERTIFICATE_ISSUE_AUTHORITY_INPUT:
      const CertificateIssueAuthirityInput = {
        ...state.CertificateIssueAuthirityInput,
      };
      CertificateIssueAuthirityInput[action.payload.name] =
        action.payload.value;
      return {
        ...state,
        CertificateIssueAuthirityInput,
      };

    case Types.GET_ISSUING_AUTHORITY_LIST:
      return {
        ...state,
        issuingAuthorities: action.payload.issuingAuthorities,
        // productsPaginatedData: action.payload.productsPaginatedData,
        // isLoading: action.payload.isLoading,
      };

    case Types.POST_ISSUING_AUTHORITY:
      return {
        ...state,
        status: action.payload.status,
      };

    // case Types.LOADING:
    //   return {
    //     ...state,
    //     isLoading: action.payload,
    //   };

    // case Types.EDITING:
    //   return {
    //     ...state,
    //     editing: action.payload,
    //   };

    // case Types.DELETING:
    //   return {
    //     ...state,
    //     deleting: action.payload,
    //   };

    // case Types.EMPTY_PRODUCT_MESSAGE:
    //   return {
    //     ...state,
    //     addMessage: null,
    //     editMessage: null,
    //     deleteMessage: null,
    //     productData: {
    //       id: 0,
    //       title: "",
    //       description: "",
    //       price: "",
    //       image: null,
    //       imagePreviewUrl: null,
    //     },
    //   };
    // break;

    default:
      break;
  }
  return newState;
};

export default CertificateIssueAuthorityReducer;
