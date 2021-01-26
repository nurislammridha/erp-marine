import * as Types from "../../types/Types";
import axios from "axios";

export const UploadAdditionDeduction = (purchaseRequisitionData) => async (
  dispatch
) => {
  // let userData = await getEmployeData();
  // let intInsertBy = userData.intEmployeeId;
  let data = {
    status: false,
    message: "",
    isLoading: false,
    data: "",
  };
  let postData = {
    uploadFile: purchaseRequisitionData.file,
    intMonthId: purchaseRequisitionData.monthData.value,
    intYear: purchaseRequisitionData.yearData.label,
  };
  var bodyFormData = new FormData();
  bodyFormData.append("uploadFile", postData.uploadFile);
  bodyFormData.append("intMonthId", postData.intMonthId);
  bodyFormData.append("intYear", postData.intYear);

  const options = {
    headers: {
      "Content-type":
        "multipart/form-data; charset=utf-8; boundary=" +
        Math.random()
          .toString()
          .substr(2),
    },
  };
  axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/asllhr/fileInput`,
      bodyFormData,
      options
    )
    .then(async (res) => {
      console.log('ResponseBulk', res);
      data = {
        status: true,
        message: res.data.message,
        isLoading: true,
        data: res.data.data,
      };
      dispatch({ type: Types.UPLOAD_ADDITION_DEDUCTION, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.UPLOAD_ADDITION_DEDUCTION, payload: data });
    });
};
