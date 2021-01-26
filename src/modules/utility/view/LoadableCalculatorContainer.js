import React from "react";
import LoadableCalculator from "../information/components/LoadableCalculator";

const LoadableCalculatorContainer = () => {
  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <LoadableCalculator />
      </div>
    </div>
  );
};

export default LoadableCalculatorContainer;
