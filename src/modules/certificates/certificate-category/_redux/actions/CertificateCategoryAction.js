// import * as Types from "../types/Types";
import * as Types from "../types/Types"
export const handleCertificateCategoryInput = (name, value) => (dispatch) => {
  const categoryData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CERTIFICATE_CATEGORY_CREATE, payload: categoryData });
};
