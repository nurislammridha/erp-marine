import * as Types from "../authTypes";

const initialState = {
  menuList: [],
};

const authMenuPermissionReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_MENU_LIST:
      return {
        ...state,
        menuList: action.payload,
      };

    default:
      break;
  }
  return newState;
};
export default authMenuPermissionReducer;
