import * as Types from "../types/Types";
const initiliazeState = {
  certificateCategoryList: [],
  certificateParentCategoryList: [],
  certificateChildCategoryList: [],
  status: false,
  isLoading: false,
  certificatesCategoryPaginatedData: null,
  certificateCategoryInput: {
    strCertificateCategoryName: "",
    intActionBy: "1",
    isActive: "1",
  },
  editStatus: false,
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
      return {
        ...state,
        status: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    case Types.GET_CERTIFICATE_CATEGORY_LIST:
      return {
        ...state,
        certificateCategoryList: action.payload.certificates,
        certificatesCategoryPaginatedData:
          action.payload.certificatesPaginatedData,
        isLoading: action.payload.isLoading,
      };

      case Types.GET_CERTIFICATE_PARENT_CATEGORY_LIST:
      return {
        ...state,
        certificateParentCategoryList: getCertificateCategoryList(action.payload),
      };

      case Types.GET_CERTIFICATE_CHILD_CATEGORY_LIST:
      return {
        ...state,
        certificateChildCategoryList: getCertificateCategoryList(action.payload),
      };

    case Types.SET_CERTIFICATE_CATEGORY_EDIT_DATA:
      return {
        ...state,
        certificateCategoryInput: action.payload,
      };

    case Types.EDIT_CERTIFICATE_CATEGORY:
      return {
        ...state,
        editStatus: action.payload.status,
        isLoading: action.payload.isLoading,
      };

    default:
      break;
  }
  return state;
}

const getCertificateCategoryList = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intCategoryID,
        label: item.strCertificateCategoryName,
      };
      options.push(itemData);
    });
  }
  return options;
};

export default CertificateCategoryReducer;
