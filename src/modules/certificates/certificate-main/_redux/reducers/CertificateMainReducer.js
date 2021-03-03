import * as Types from "../types/Types";
import moment from "moment";

// Initial state
const initialState = {
  certificateDetails: null,
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
    intShipID: null,
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
    intNotOnBoard: "0",
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
    dteFromSurvey: "",
    dteToSurvey: "",
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
  submitStatus: false,

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
  certificateBackgroundColor: {
    due_30_days_label: "DUE BETWEEN 30 DAYS",
    due_30_days_code: "",
    due_60_days_label: "DUE BETWEEN 60 DAYS",
    due_60_days_code: "",
    due_more_60_days_label: "DUE MORE THAN 60 DAYS",
    due_more_60_days_code: "",
    expired: "EXPIRED",
    expired_code: "",
  },
  bottomStatus: [
    {
      minDate: '0',
      maxDate: '0',
      colorCode: '#ea673e',
      inputName: 'expired_code',
      bottomLabel: 'EXPIRED',
      statusLabel: 'EXPIRED',
    },
    {
      minDate: '1',
      maxDate: '30',
      colorCode: '#8ec7ff',
      inputName: 'due_30_days_code',
      bottomLabel: 'DUE BETWEEN 30 DAYS',
      statusLabel: 'Due',
    },
    {
      minDate: '31',
      maxDate: '60',
      colorCode: '#678db2',
      inputName: 'due_60_days_code',
      bottomLabel: 'DUE BETWEEN 60 DAYS',
      statusLabel: 'Due',
    },
    {
      minDate: '61',
      maxDate: '200',
      colorCode: '#8af2c0',
      inputName: 'due_more_60_days_code',
      bottomLabel: 'DUE MORE THAN 60 DAYS',
      statusLabel: 'Due',
    },
  ],
  reportList: [],
  reportPaginationList: [],
  CertificateFilterInputChange: {
    searchText: '',
    isPublic: 1,
    category: '',
    fromDate: '',
    toDate: '',
    diffDays: '',
    currentPage: ''
  }
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
    case Types.GET_CERTIFICATE_REPORT_LIST:
      return {
        ...state,
        reportList: action.payload.reportList,
        reportPaginationList: action.payload.reportPaginationList,
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
          submitStatus: action.payload.status
        };
      } else {
        return {
          ...state,
          isLoading: false,
          submitStatus: false,
        };
      }
    case Types.EMPTY_STATUS:
      return {
        ...state,
        submitStatus: action.payload,
      };
    case Types.CERTIFICATE_MAIN_SUBMITTING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case Types.GET_MAIN_CERTIFICATE_SINGLE_DATA:
      return {
        ...state,
        certificateEditInfo: action.payload,
        certificateDetails: action.payload,
        isEditLoaded: true
      };

    case Types.CHANGE_CERTIFICATE_INPUT_UPDATE:
      const certificateEditInfoData = { ...state.certificateEditInfo };
      certificateEditInfoData[action.payload.name] = action.payload.value;
      return {
        ...state,
        certificateEditInfo: certificateEditInfoData,
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

    //get cirtificate background colorCode
    case Types.CHANGE_STATUS_BACKGROUD:
      const certificateBackgroundColor = { ...state.certificateBackgroundColor }
      certificateBackgroundColor[action.payload.name] = action.payload.value;
      let bottomLabel = state.bottomStatus.slice();
      for (let i = 0; i < bottomLabel.length; i++) {
        if (i === action.payload.index) {
          bottomLabel[i].colorCode = action.payload.value
        }
      }
      return {
        ...state,
        certificateBackgroundColor,
        bottomStatus: bottomLabel,
      }
    case Types.BOTTOM_STATUS_LIST:
      const bottomStatus = { ...state.bottomStatus }
      return {
        ...state,
        bottomStatus: bottomStatus,
      }
    //CERTIFICATE FILTER INPUT HANDLE  INPUT
    case Types.CHANGE_CERTIFICATE_FILTER_INPUT:
      const CertificateFilterInputChange = { ...state.CertificateFilterInputChange };
      CertificateFilterInputChange[action.payload.name] = action.payload.value;
      return {
        ...state,
        CertificateFilterInputChange,
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
const getCertificateColorCode = () => {
  let bottomStatus = [
    { bottomLevel: 'DUE BETWEEN 30 DAYS', colorCode: '#8ec7ff' },
    { bottomLevel: 'DUE BETWEEN 60 DAYS', colorCode: '#678db2' },
    { bottomLevel: 'DUE MORE THAN 60 DAYS', colorCode: '#8af2c0' },
    { bottomLevel: 'EXPIRED', colorCode: '#ea673e' }
  ]

  // let options = [];
  // if (bottomStatus) {
  //   bottomStatus.forEach((item) => {
  //     let itemData = {
  //       value: item.bottomLevel,
  //       label: item.colorCode,
  //     };
  //     options.push(itemData);
  //   });
  // }
  return bottomStatus;
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
