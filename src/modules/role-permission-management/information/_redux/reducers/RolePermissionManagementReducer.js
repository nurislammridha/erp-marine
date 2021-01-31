import * as Types from "../types/Types";
import moment from "moment";

// Initial state
const initialState = {
  roleList:[],
  inputData:{
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
    case Types.USER_ROLE_CHECKED:
    let roleList = state.roleList.slice();
    let indexParentCriteria = action.payload.indexparentRole;
    let indexChild = action.payload.indexChild;
    let checkstatus= action.payload.checkboxStatus
    for (let i = 0; i < roleList.length; i++) {
        if (i == indexParentCriteria) {
            for (let c = 0; c < roleList[i].permissions.length; c++) {
                const element = roleList[i].permissions[c];
                
                // roleList[i].permissions[c].isChecked =

                // check already an entry for this parentCriteria.intID, if entry, then remove those data / or update that data
                if (indexChild == c) {
                    roleList[i].permissions[c].isChecked = !roleList[i].permissions[c].isChecked;

                }
            }
        }
        
    }
    case Types.USER_ROLE_ALL_CHECKED:
      if(action.payload ==true){

      }
        return {
          ...state,
        //   roleList: action.payload,
        };

     
    default:
      break;
  }
  return newState;
};





export default RolePermissionManagementReducer;
