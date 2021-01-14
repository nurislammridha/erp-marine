import * as Types from "../types/Types";
import moment from "moment";

// Initial state
const initialState = {
  certificates: [],
  certificatesPaginatedData: null,
  certificateMainEdit: [],
  certificatesCategoryOptionData: [],
  certificatesNameOptionData: [],
  certificatesTypeOptionData: [],
  certificatesIssueByOptionData: [],
  vesselTypeOptionData: [],
  certificateStatus: [],
  isLoading: false,
  //   productData: {
  //     id: 0,
  //     title: "",
  //     description: "",
  //     price: "",
  //     image: null,
  //     imagePreviewUrl: null,
  //   },
  certificateMainInfo: {
    intVesselID: null,
    intCertificateID: null,
    intCategoryID: null,
    intParentCategoryID: null,
    parentCategory: null,
    strCustomeCode: "",
    intIssuingAuthorityID: null,
    strShipFolderNo: "",
    strIssuedPlace: "",
    strLocation: "",
    intCertificateTypeID: null,
    intNotOnBoard: 0,
    dteCertificateIssueDate: "",
    dteCertificateExpiryDate: "",
    dteCertificateValidUntil: "",
    isExtendedUntil: false,
    dteExtendedUntil: "",
    isSurvey: false,
    dteLastSurvey: moment().format("YYYY-MM-DD"),
    dteNextSurvey: moment().format("YYYY-MM-DD"),
    dteLastEndorsementDate: "",
    strOfficeRemarks: "",
    // image: null,
    // imagePreviewUrl: null,
    certificateDates: [],
    strShipRemarks: "",
    intActionBy: null,
    dteLastActionDateTime: moment().format("YYYY-MM-DD"),
    dteServerDateTime: moment().format("YYYY-MM-DD"),
    dteFromSurvey: moment().format("YYYY-MM-DD"),
    dteToSurvey: moment().format("YYYY-MM-DD"),
    intCertificateStatusID: "",
    strCertificateStatusName: "",
    isActive: true,
    file: null,
    filePreviewUrl: null,
    multipleAttachments: [
      // {
      //   base64: null,
      //   name: '',
      //   size: 0,
      //   file: null,
      //   type: '',
      //   filePreviewUrl: null,
      // }
    ],
  },

  // update edit
  isEditLoaded: false,
  certificateEditInfo: null,
  productEditData: null,
  productDetail: null,
  errors: [],
  addStatus: false,
  editStatus: false,
  editing: false,
  deleteStatus: false,
  deleting: false,
  certificateSingleData: {},

  addMessage: "",
  editMessage: "",
  deleteMessage: "",
  certificateExpireDaysList: [],
};

const CertificateMainReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CERTIFICATE_LIST_DASHBOARD:
      return {
        ...state,
        certificates: action.payload.certificates,
        certificatesPaginatedData: action.payload.certificatesPaginatedData,
        isLoading: action.payload.isLoading,
        certificateExpireDaysList: getCertificateExpireDaysList()
      };
    case Types.GET_CERTIFICATE_CATEGORY:
      return {
        ...state,
        certificatesCategoryOptionData: getCertificateCategoryName(
          action.payload
        ),
      };

    case Types.ADD_MULTIPLE_DATA:
      const multipleDataset = { ...state.certificateMainInfo };
      multipleDataset.certificateDates = [action.payload, ...multipleDataset.certificateDates];
      return {
        ...state,
        certificateMainInfo: multipleDataset,
      };
      break;

    case Types.ADD_MULTIPLE_DATA_EDIT:
      const multipleDatasetEdit = { ...state.certificateEditInfo };
      multipleDatasetEdit.certificateDates = [action.payload, ...multipleDatasetEdit.certificateDates];
      return {
        ...state,
        certificateEditInfo: multipleDatasetEdit,
      };
      break;

    case Types.DELETE_SURVEY_MULTIPLE_DATA:
      const multiDataSetOld = { ...state.certificateMainInfo };
      multiDataSetOld.certificateDates.splice(action.payload, 1);
      return {
        ...state,
        certificateMainInfo: multiDataSetOld,
      };
      break;

    case Types.DELETE_SURVEY_MULTIPLE_DATA_EDIT:
      const multiDataSetOldEdit = { ...state.certificateEditInfo };
      multiDataSetOldEdit.certificateDates.splice(action.payload, 1);
      return {
        ...state,
        certificateEditInfo: multiDataSetOldEdit,
      };
      break;

    case Types.DELETE_SURVEY_MULTIPLE_ATTACHMENT:
      const multiDataSetAttachment = { ...state.certificateMainInfo };
      multiDataSetAttachment.multipleAttachments.splice(action.payload, 1);
      return {
        ...state,
        certificateMainInfo: multiDataSetAttachment,
      };
      break;

    case Types.DELETE_SURVEY_MULTIPLE_ATTACHMENT_EDIT:
      const multiDataSetAttachmentEdit = { ...state.certificateEditInfo };
      multiDataSetAttachmentEdit.multipleAttachments.splice(action.payload, 1);
      return {
        ...state,
        certificateEditInfo: multiDataSetAttachmentEdit,
      };
      break;

    case Types.GET_VESSEL_TYPE:
      return {
        ...state,
        vesselTypeOptionData: getvesselType(
          action.payload
        ),
      };
    case Types.GET_CERTIFICATE_NAME:
      return {
        ...state,
        certificatesNameOptionData: getCertificateName(action.payload),
      };
    case Types.GET_CERTIFICATE_TYPE:
      return {
        ...state,
        certificatesTypeOptionData: getCertificateTypeName(action.payload),
      };
    case Types.MAIN_CERTIFICATE_STATUS:
      return {
        ...state,
        certificateStatus: getCertificateStatusList(action.payload),
      };
    case Types.GET_CERTIFICATE_ISSUE_BY:
      return {
        ...state,
        certificatesIssueByOptionData: getIssueName(action.payload),
      };

    //SELFT
    case Types.CHANGE_CERTIFICATE_INPUT:
      const certificateMainInfo = { ...state.certificateMainInfo };
      certificateMainInfo[action.payload.name] = action.payload.value;

      return {
        ...state,
        certificateMainInfo,
      };
    case Types.CERTIFICATE_MAIN_SUBMIT:
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
    case Types.CERTIFICATE_MAIN_SUBMITTING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case Types.GET_MAIN_CERTIFICATE_SINGLE_DATA:
      return {
        ...state,
        certificateEditInfo: action.payload,
        isEditLoaded: true
      };

    case Types.CHANGE_CERTIFICATE_INPUT_UPDATE:
      const productEditData = { ...state.productEditData };
      productEditData[action.payload.name] = action.payload.value;
      return {
        ...state,
        productEditData,
      };
      
    case Types.MAIN_CERTIFICATE_UPDATE:
      if (action.payload.status) {
        return {
          ...state,
          certificateEditInfo: initialState.certificateEditInfo,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }

    // case Types.CERTIFICATE_DETAIL:
    //   return {
    //     ...state,
    //     productDetail: action.payload.productDetail,
    //     isLoading: action.payload.isLoading,
    //   };

    // case Types.EDIT_CERTIFICATE_INFO:
    //   return {
    //     ...state,
    //     productEditData: action.payload.productDetail,
    //     isLoading: action.payload.isLoading,
    //   };

    // case Types.CREATE_CERTIFICATE:
    //   return {
    //     ...state,
    //     addMessage: action.payload.message,
    //     addStatus: action.payload.status,
    //     isLoading: action.payload.isLoading,
    //     errors: action.payload.errors,
    //   };

    // case Types.UPDATE_CERTIFICATE:
    //   return {
    //     ...state,
    //     editMessage: action.payload.message,
    //     editStatus: action.payload.status,
    //     editing: action.payload.editing,
    //     isLoading: action.payload.isLoading,
    //     errors: action.payload.errors,
    //   };

    case Types.DELETE_CERTIFICATE:
      // Remove that product from this list
      const prodPaginatedData = { ...state.certificatesPaginatedData };
      const updateProductData = prodPaginatedData.data.splice(
        prodPaginatedData.data.findIndex(function (i) {
          return i.id === action.payload.product.id;
        }),
        1
      );
      prodPaginatedData.data = updateProductData;
      return {
        ...state,
        deleteMessage: action.payload.message,
        deleteStatus: action.payload.status,
        deleting: action.payload.deleting,
        isLoading: action.payload.isLoading,
        certificatesPaginatedData: prodPaginatedData,
      };

    case Types.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case Types.EDITING:
      return {
        ...state,
        editing: action.payload,
      };

    case Types.DELETING:
      return {
        ...state,
        deleting: action.payload,
      };

    case Types.EMPTY_CERTIFICATE_MESSAGE:
      return {
        ...state,
        addMessage: null,
        editMessage: null,
        deleteMessage: null,
        productData: {
          id: 0,
          title: "",
          description: "",
          price: "",
          image: null,
          //   imagePreviewUrl: null,
        },
      };

    default:
      break;
  }
  return newState;
};

const getCertificateExpireDaysList = () => {
  return [
    {
      label: 'Already Expired',
      value: 0
    },
    {
      label: '1 Month',
      value: 30
    },
    {
      label: '2 Months',
      value: 60
    },
    {
      label: '1 Year',
      value: 365
    },
    {
      label: '2 Year',
      value: 365 * 2
    },
    {
      label: 'Custom',
      value: -1
    }
  ]
}

const getCertificateCategoryName = (data) => {
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
const getCertificateName = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intCertificateID,
        label: item.strCertificateName,
      };
      options.push(itemData);
    });
  }
  return options;
};
const getCertificateTypeName = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intCertificateTypeID,
        label: item.strCertificateTypeName,
      };
      options.push(itemData);
    });
  }
  return options;
};
const getIssueName = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intIssuingAuthorityID,
        label: item.strIssuingAuthorityName,
      };
      options.push(itemData);
    });
  }
  return options;
};
const getvesselType = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intID,
        label: item.strName,
      };
      options.push(itemData);
    });
  }
  return options;
};

const getCertificateStatusList = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intCertificateStatusID,
        label: item.strStatus,
      };
      options.push(itemData);
    });
  }
  return options;
};

export default CertificateMainReducer;
