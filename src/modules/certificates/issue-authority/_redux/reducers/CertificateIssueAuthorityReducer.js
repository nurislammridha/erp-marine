import * as Types from "../types/Types";

const initialState = {
  CertificateIssueAuthirityInput: {
    authorityName: "dfgdgf",
    isActiveStatus: "",
  },
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
      break;

    default:
      break;
  }
  return newState;
};

export default CertificateIssueAuthorityReducer;
