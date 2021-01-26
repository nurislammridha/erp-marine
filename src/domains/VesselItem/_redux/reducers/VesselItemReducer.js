import * as Types from "../../types/Types";

const initialState = {
  vesselItemList: [],
  vesselTypeList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const VesselItemReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_VESSEL_ITEM:
      return {
        ...state,
        vesselItemList: action.payload.data,
      };

    case Types.GET_VESSEL_TYPE:
      return {
        ...state,
        vesselTypeList: action.payload,
      };

    case Types.GET_COUNTRY:
      return {
        ...state,
        countryList: action.payload,
      };


    case Types.POST_VESSEL_ITEM:
      console.log('action.payload.message',action.payload.message);
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
      };

    case Types.EDIT_VESSEL:
      return {
        ...state,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
      };

    case Types.EMPTY_VESSEL_ADD_MESSAGE:
      return {
        ...state,
        addMessage: "",
      };

    case Types.EMPTY_VESSEL_EDIT_MESSAGE:
      return {
        ...state,
        editMessage: "",
      };

    case Types.DELETE_VESSEL_ITEM:
      let DeletevesselList = state.vesselItemList.filter(function (el) {
        return el.intID !== action.payload.data.intID;
      });
      return {
        ...state,
        vesselItemList: DeletevesselList,
        deleteStatus: action.payload.status,
        deleteMessage: action.payload.message,

      };

    case Types.EMPTY_VESSEL_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: "",
      };

    default:
      break;
  }
  return newState;
};
export default VesselItemReducer;
