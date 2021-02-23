import React from "react";
import BasicInformation from "../information/components/BasicInformation";


const BasicInformationContainer = () => {
  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <BasicInformation />
      </div>
    </div>
  );
};

export default BasicInformationContainer;
