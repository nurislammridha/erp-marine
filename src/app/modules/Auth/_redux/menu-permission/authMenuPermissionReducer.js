import * as Types from "../authTypes";

const initialState = {
  menuList: [],
  isMenuLoading: false,
};

const authMenuPermissionReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_MENU_LIST:
      console.log('action.payload', action.payload);
      
      return {
        ...state,
        menuList: action.payload.menuList,
        isMenuLoading: action.payload.isMenuLoading,
      };

    default:
      break;
  }
  return newState;
};
export default authMenuPermissionReducer;
