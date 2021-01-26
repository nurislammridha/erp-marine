export const generateFormDataFromObject = (item) => {
  const formData = new FormData();
  buildFormData(formData, item);
  return formData;
};

const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
};

/**
 * check Attchment Validation
 *
 * @param {object} attachment file attachment as object
 * @param {integer} maxAllowedSize max allowed size in KB
 * @return {object} validated object with message
 */
export const checkAttchmentValidation = (
  attachment,
  maxAllowedSize = 800000
) => {
  let validated = {
    isValidated: false,
    message: null,
  };
  const { type, size } = attachment;

  const maxAllowedSizeinMB = maxAllowedSize / 10000;

  // Type Validation
  if (
    type !== "image/png" &&
    type !== "image/jpg" &&
    type !== "image/gif" &&
    type !== "image/jpeg" &&
    type !== "image/webp" &&
    type !== "application/pdf" &&
    type !== "application/msword" &&
    type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    validated.message = `Sorry, Given a ${type} attachment. Please give an attachment of png, jpg, gif, jpeg, webp, pdf, doc. `;
  } else {
    // Size validation
    if (size > maxAllowedSize) {
      validated.message += `Please give attachment maximum of ${maxAllowedSizeinMB} MB `;
    } else {
      validated.isValidated = true;
      validated.message = "File Validated Successfully !";
    }
  }
  return validated;
};
