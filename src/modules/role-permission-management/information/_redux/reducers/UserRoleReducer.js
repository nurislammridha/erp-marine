import * as Types from "../types/Types";
import moment from "moment";

// Initial state
const initialState = {
    isLoading: false,
    roleList: [], // For Insert/Edit Page
    rolesListPaginated: [],
    rolesListAll: [],
    userList:[],
    submitStatus:false,
    inputData: {
        business_id:1,
        first_name: "",
        surname:"",
        last_name:"",
        username:"",
        email:"",
        phone_no:"",
        password:"",
        language:"",
        name:'',
        roleId: ""

    },
    isRoleCreated: false,
    roleCreateMessage: '',
};

const UserRoleReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.GET_USER_ROLE_INPUT_DATA:
            const roleInputData = { ...state.inputData };
            roleInputData[action.payload.name] = action.payload.value;
            return { 
                ...state, 
                inputData: roleInputData,
                isLoading: action.payload.isLoading,
            };
        case Types.CREATE_MULTIPLE_ROLE:
            return { 
                ...state, 
                inputData: initialState.inputData,
                isLoading: action.payload.isLoading,
            };
        case Types.UPDATE_MULTIPLE_ROLE:
            return { 
                ...state, 
                inputData: initialState.inputData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_USER_CREATED:
            return { 
                ...state, 
                submitStatus: true,
            };

        default:
            break;
    }
    return newState;
};

/**
 * checkAllPermissionIsChecked
 * 
 * Check if total checked permission length in this group = total permissions in this group ? isChecked = true : isChecked = false
 * 
 * @param {array} roles Roles List
 * @param {permissionGroupIndex} permissionGroupIndex 
 */
const checkAllPermissionIsChecked = (roles, permissionGroupIndex) => {
    const getTotalPermissions = roles[permissionGroupIndex].permissions;
    const getTotalCheckedPermissions = getTotalPermissions.filter(x=> x.isChecked);
    return getTotalPermissions.length === getTotalCheckedPermissions.length ? true : false;
}

export default UserRoleReducer;
