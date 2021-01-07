import * as Types from "../types/Types";
import axios from "axios";

/*==Certificate issue Authority input change==*/
export const handleChangeCertificateIssueAuthorityInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  console.log("formData", formData);
  dispatch({
    type: Types.CHANGE_CERTIFICATE_ISSUE_AUTHORITY_INPUT,
    payload: formData,
  });
};
