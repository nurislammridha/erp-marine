import * as Types from "../types/Types";

const initialState = {
    certificatelistmain: [],
   
  };
  const CertificateListReducer = (state = initialState, action) => {
    const newState = { ...state };
  
    switch (action.type) {
  
      case Types.CERTIFICATE_LIST_MAIN:
        return {
          ...state,
          certificatelistmain:action.payload.data
        };
      
      default:
        break;
    }
    return newState;
  };
export default CertificateListReducer;