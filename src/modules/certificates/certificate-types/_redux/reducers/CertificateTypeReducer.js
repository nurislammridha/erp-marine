import * as Types from "../types/Types";

const initialState = {
  certificateTypePaginatedData: null,
  certificateTypeInput: {
    strCertificateTypeName: "",
    intActionBy: "",
    isActive: "1",
  },
  certificateTypeList: [],
  status: false,
  isLoading: false,
  editStatus: false,
};

const CertificateTypeReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_CERTIFICATE_TYPE_INPUT:
      const certificateTypeInput = { ...state.certificateTypeInput };
      certificateTypeInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        certificateTypeInput,
      };

    case Types.GET_CERTIFICATE_TYPE_LIST:
      return {
        ...state,
        certificateTypeList: action.payload.certificateTypeList,
        certificateTypePaginatedData:
          action.payload.certificateTypePaginatedData,
        isLoading: action.payload.isLoading,
      };

    case Types.CREATE_CERTIFICATE_TYPE:
      return {
        ...state,
        status: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    case Types.EDIT_CERTIFICATE_TYPE_LIST:
      return {
        ...state,
        certificateTypeInput: action.payload.data,
      };
      break;

    case Types.UPDATE_CERTIFICATE_TYPE_LIST:
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

export default CertificateTypeReducer;
