import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

export const handleChangeLaytimeMultiple = (name, value) => (dispatch) => {
    const multipleData = {
      name: name,
      value: value,
    };
    dispatch({ type: Types.LAYTIME_MULTIPLE_DATA, payload: multipleData });
  };
