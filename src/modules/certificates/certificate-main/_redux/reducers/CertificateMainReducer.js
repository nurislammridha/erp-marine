import * as Types from "../types/Types";

// Initial state
const initialState = {
    certificates: [],

    certificatesPaginatedData: null,
    certificatesCategoryOptionData:[],
    certificatesNameOptionData:[],
    certificatesTypeOptionData:[],
    certificatesIssueByOptionData:[],

    isLoading: false,
    productData: {
        id: 0,
        title: '',
        description: '',
        price: '',
        image: null,
        imagePreviewUrl: null
    },
    productEditData: null,
    productDetail: null,
    errors: [],
    addStatus: false,
    editStatus: false,
    editing: false,
    deleteStatus: false,
    deleting: false,

    addMessage: '',
    editMessage: '',
    deleteMessage: '',
};

const CertificateMainReducer = (state = initialState, action) => {
    const newState = {...state };

    switch (action.type) {
        case Types.CERTIFICATE_LIST_DASHBOARD:
            return {
                ...state,
                certificates: action.payload.certificates,
                certificatesPaginatedData: action.payload.certificatesPaginatedData,
                isLoading: action.payload.isLoading
            };
        case Types.GET_CERTIFICATE_CATEGORY:
            return {
                ...state,
                certificatesCategoryOptionData: getCertificateCategoryName(action.payload),
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
        case Types.GET_CERTIFICATE_ISSUE_BY:
            return {
                ...state,
                certificatesIssueByOptionData: getIssueName(action.payload),
            };

        case Types.CHANGE_CERTIFICATE_INPUT:
            const productData = {...state.productData };
            productData[action.payload.name] = action.payload.value;
            return {
                ...state,
                productData
            };

        case Types.CHANGE_CERTIFICATE_INPUT_UPDATE:
            const productEditData = {...state.productEditData };
            productEditData[action.payload.name] = action.payload.value;
            return {
                ...state,
                productEditData
            };

        case Types.CERTIFICATE_DETAIL:
            return {
                ...state,
                productDetail: action.payload.productDetail,
                isLoading: action.payload.isLoading,
            };

        case Types.EDIT_CERTIFICATE_INFO:
            return {
                ...state,
                productEditData: action.payload.productDetail,
                isLoading: action.payload.isLoading,
            };

        case Types.CREATE_CERTIFICATE:
            return {
                ...state,
                addMessage: action.payload.message,
                addStatus: action.payload.status,
                isLoading: action.payload.isLoading,
                errors: action.payload.errors,
            };

        case Types.UPDATE_CERTIFICATE:
            return {
                ...state,
                editMessage: action.payload.message,
                editStatus: action.payload.status,
                editing: action.payload.editing,
                isLoading: action.payload.isLoading,
                errors: action.payload.errors,
            };

        case Types.DELETE_CERTIFICATE:
            // Remove that product from this list
            const prodPaginatedData = {...state.certificatesPaginatedData };
            const updateProductData = prodPaginatedData.data.splice(prodPaginatedData.data.findIndex(function(i) {
                return i.id === action.payload.product.id;
            }), 1);
            prodPaginatedData.data = updateProductData;
            return {
                ...state,
                deleteMessage: action.payload.message,
                deleteStatus: action.payload.status,
                deleting: action.payload.deleting,
                isLoading: action.payload.isLoading,
                certificatesPaginatedData: prodPaginatedData
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
                    title: '',
                    description: '',
                    price: '',
                    image: null,
                    imagePreviewUrl: null
                }
            };

        default:
            break;
    }
    return newState;
};

const getCertificateCategoryName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intCategoryID,
                label: item.strCertificateCategoriName,
            };
            options.push(itemData);
        });
    }
    return options;
}
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
}
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
}
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
}

export default CertificateMainReducer;