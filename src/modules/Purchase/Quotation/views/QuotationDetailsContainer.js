import React from "react";
import QuotationDetails from "../components/QuotationDetails";
import QuotationFilter from "../components/QuotationFilter";




const QuotationDetailsContainer = () => {
  return (
    <div className="container">
      {/* <div className="card card-custom gutter-b"> */}
      <QuotationFilter />
      <QuotationDetails />
      {/* </div> */}
    </div>
  );
};

export default QuotationDetailsContainer;
