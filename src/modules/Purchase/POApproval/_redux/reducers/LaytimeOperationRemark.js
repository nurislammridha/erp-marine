import * as Types from "../types/Types";
const initiliazeState = {
    remarkList: [],
};

function LayTimeOperationRemarkReducer(state = initiliazeState, action) {
  switch (action.type) {
    case Types.GET_ROWTIME_REMARK_LIST:
      let remarkData = [];
      if (action.payload) {
        action.payload.forEach((item) => {
          let items = {
            value: item.intOperationRemarkID,
            label: item.strOperationRemark,
          };
          remarkData.push(items);
        });
      }
      return {
        ...state,
        remarkList: remarkData,
      };
    default:
      break;
  }
  return state;
}
export default LayTimeOperationRemarkReducer;
