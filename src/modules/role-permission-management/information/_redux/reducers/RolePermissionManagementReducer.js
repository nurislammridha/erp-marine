import * as Types from "../types/Types";
import moment from "moment";

// Initial state
const initialState = {
    roleList: [],

    inputData: {
        id: '',
        roleName: '',
        groupList: []
    }

};

const RolePermissionManagementReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.GET_USER_ROLE_LIST:
            return {
                ...state,
                roleList: action.payload,
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

        case Types.USER_ROLE_CHECKED:
            const { indexparentRole, indexChild, checkboxStatus  } = action.payload;
            let roleList = state.roleList.slice();
            roleList[indexparentRole].permissions[indexChild].isChecked = checkboxStatus;
            roleList[indexparentRole].isChecked = checkAllPermissionIsChecked(roleList, indexparentRole);

            return {
                ...state,
                roleList: roleList,
            };

        case Types.USER_ROLE_CHECKED_GROUP:
            console.log(action.payload);

            const groupIndex = action.payload.index
            const isGroupChecked = action.payload.isGroupChecked
            const roles = state.roleList.slice();

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
                roleList: roles
            };


        case Types.USER_ROLE_ALL_CHECKED:
            let CheckroleList = state.roleList.slice();
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
                roleList: CheckroleList,
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

export default RolePermissionManagementReducer;
