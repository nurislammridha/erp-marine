import * as Types from "../types/Types";
import moment from "moment";

// Initial state
const initialState = {
    isLoading: false,
    roleList: [], // For Insert/Edit Page
    rolesListPaginated: [],
    rolesListAll: [],
    userList:[],
    roleListOption:[],
    inputData: {
        id: '',
        role: '',
        groupList: []
    },
    isRoleCreated: false,
    roleCreateMessage: '',
};

const RolePermissionManagementReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.CHANGE_ROLE_INPUT:
            const roleInputData = { ...state.inputData };
            roleInputData[action.payload.name] = action.payload.value;
            return { 
                ...state, 
                inputData: roleInputData 
            };

        case Types.CREATE_ROLE:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                isRoleCreated: action.payload.status,
                roleCreateMessage: action.payload.message,
            };
        case Types.GET_PERMISSION_USER_LIST:
            console.log('action.payload', action.payload);
            return {
                ...state,
                userList:action.payload
            };

        case Types.GET_USER_ROLE_LIST_PAGINATED:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                rolesListPaginated: action.payload.rolesListPaginated,
                rolesListAll: action.payload.rolesList,
                roleListOption:getUserRoleDropdown(action.payload.rolesList)

            };

        case Types.GET_USER_PERMISSION_GROUPS:
            const updatedInputData = {
                ...state.inputData,
                groupList: action.payload
            }
            return {
                ...state,
                inputData: updatedInputData
            };

        case Types.GET_ROLE_DETAILS_DATA:
            const roleDetailsData = {
                ...state.inputData,
            }
            if(action.payload != null && typeof action.payload.role !== 'undefined'){
                roleDetailsData.id = action.payload.role.id;
                roleDetailsData.role = action.payload.role.name;
                roleDetailsData.groupList = action.payload.groups;
            }
            roleDetailsData.groupList.map((role, indexparentRole) => {
                roleDetailsData.groupList[indexparentRole].isChecked = checkAllPermissionIsChecked(roleDetailsData.groupList, indexparentRole);
            });

            return {
                ...state,
                inputData: roleDetailsData
            };

        case Types.EMPTY_ROLE_STATUS:
            return {
                ...state,
                isRoleCreated: false,
                isLoading: false,
                inputData: initialState.inputData
            };
        case Types.USER_ROLE_CHECKED:
            const { indexparentRole, indexChild, checkboxStatus  } = action.payload;
            let roleList = state.inputData.groupList.slice();
            roleList[indexparentRole].permissions[indexChild].isChecked = checkboxStatus;
            roleList[indexparentRole].isChecked = checkAllPermissionIsChecked(roleList, indexparentRole);
            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    roleList
                }
            };
        case Types.USER_ROLE_HANDLE_CHANGE:
            const { name, value  } = action.payload;
           
           
            return {
                ...state,
                rollname: value,
            };
        case Types.USER_ROLE_CHECKED_GROUP:
            const groupIndex = action.payload.index
            const isGroupChecked = action.payload.isGroupChecked
            const roles = state.inputData.groupList.slice();

            // get all the permissions in this group 
            // and make it checked or unchecked
            for (let i = 0; i < roles.length; i++) {
                if (i == groupIndex) {
                    roles[i].isChecked = isGroupChecked;
                    for (let j = 0; j < roles[i].permissions.length; j++) {
                        const permissionItem = roles[i].permissions[j];
                        permissionItem.isChecked = isGroupChecked;
                        roles[i].permissions[j] = permissionItem;
                    }
                }
            }
            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    roleList
                }
            };
        case Types.USER_ROLE_ALL_CHECKED:
            let CheckroleList = state.inputData.groupList.slice();
            for (let i = 0; i < CheckroleList.length; i++) {
                if (action.payload == true) {
                    CheckroleList[i].isChecked = true;
                } else {
                    CheckroleList[i].isChecked = false;
                }
                for (let c = 0; c < CheckroleList[i].permissions.length; c++) {
                    const element = CheckroleList[i].permissions[c];
                    if (action.payload == true) {
                        CheckroleList[i].permissions[c].isChecked = true;
                    } else {
                        CheckroleList[i].permissions[c].isChecked = false;
                    }
                }
            }

            return {
                ...state,
                inputData: {
                    ...state.inputData,
                    roleList
                }
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

const getUserRoleDropdown = (data) => {
    let options = [];
    if (data) {
      data.forEach((item) => {
        let itemData = {
          value: item.id,
          label: item.name,
        };
        options.push(itemData);
      });
    }
    return options;
  };

export default RolePermissionManagementReducer;
