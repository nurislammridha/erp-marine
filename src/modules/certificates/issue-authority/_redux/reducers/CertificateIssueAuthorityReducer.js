import * as Types from "../types/Types";

const initialState = {
  issuingAuthorities: [],
  issuingAuthoritiesData: null,
  isLoading: false,
  CertificateIssueAuthirityInput: {
    strIssuingAuthorityName: "",
    isActive: "1",
    intActionBy: 1272,
  },
  editDefaultData: {},
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
        addStatus: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    case Types.SET_ISSUING_AUTHORITY_EDIT_DATA:
      return {
        ...state,
        CertificateIssueAuthirityInput: action.payload,
      };

    case Types.EDIT_ISSUING_AUTHORITY:
      return {
        ...state,
        editStatus: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    default:
      break;
  }
  return newState;
};

export default CertificateIssueAuthorityReducer;
