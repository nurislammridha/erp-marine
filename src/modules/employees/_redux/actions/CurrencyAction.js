import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";

export const EmptyCurrencyConversionAddMessage = () => async (dispatch) => {
  dispatch({
    type: Types.EMPTY_CURRENCY_ADD_MESSAGE,
    payload: true,
  });
};

export const GetCurrencyData = () => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(`${process.env.REACT_APP_API_URL}asllhr/getCurrency`, {
      headers: headers,
    })
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_CURRENCY, payload: data });
    });
};

export const AddCurrencyConversion = (currencyInfo) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
    isLoading: false,
  };
  let postData = {
    intConvertedFromId: currencyInfo.convertedFromData.value,
    intConvertedToId: currencyInfo.convertedToData.value,
    decUSDAmount: currencyInfo.decUSDAmount,
    decBDTAmount: currencyInfo.decBDTAmount,
  };

  axios
    .post(
      `${process.env.REACT_APP_API_URL}asllhr/currencyConversionPost`, postData
    )
    .then(async (res) => {
      console.log("ResponseVessel", res);
      data = {
        status: true,
        message: res.data.message,
        isLoading: true,
      };
      dispatch({ type: Types.POST_CURRENCY, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.POST_CURRENCY, payload: data });
    });
};
