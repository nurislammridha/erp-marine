import React from "react";
import DesignComponent from "../components/DesignComponent";

const DesignContainer = () => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Documentation - Design Part</h3>
            </div>
          </div>
          <div className="card-body">
            <DesignComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignContainer;
