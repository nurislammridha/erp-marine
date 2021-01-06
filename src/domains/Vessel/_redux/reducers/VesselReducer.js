import * as Types from "../../types/Types";

const initialState = {
  vesselList: [],
  vesselListOptions: [],
  vesselTypeList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const VesselReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_VESSEL:
      return {
        ...state,
        vesselList: action.payload.data,
        vesselListOptions: getSelectVesselList(action.payload.data),
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

    case Types.POST_VESSEL:
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

    case Types.DELETE_VESSEL:
      let DeletevesselList = state.vesselList.filter(function(el) {
        return el.intID !== action.payload.data.intID;
      });
      return {
        ...state,
        vesselList: DeletevesselList,
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

const getSelectVesselList = (data) => {
  let selectData = [];
  if (data.length > 0) {
    data.forEach((item) => {
      const itemData = {
        label: item.strVesselName,
        value: item.intID,
      };
      selectData.push(itemData);
    });
  }
  return selectData;
};
export default VesselReducer;
