/**
 * StripHTMLText
 * Strip HTML text to normal text
 *
 * @param {string} htmlText
 * @param {integer} totalPrint
 * @return string Converted String
 */
export const StripHTMLText = (htmlText, totalPrint = null) => {
  if (htmlText !== null && htmlText.length > 0) {
    let convertedString = htmlText.replace(/(<([^>]+)>)/gi, "");
    if (totalPrint !== null) {
      convertedString = convertedString.substr(0, totalPrint);
    }
    return convertedString;
  }
};

/**
 * GetExtensionFromUrl
 * 
 * @param {string} url 
 */
export const GetExtensionFromUrl = ( url, separatedCharacter="." ) => {
  return url.split(/[#?]/)[0].split(separatedCharacter).pop().trim();
}
