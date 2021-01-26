import React from "react";
import CargoPendingDetails from "../components/CargoPendingDetails";



const CargoPendingContainer = (props) => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Cargo Pending Details</h3>
            </div>
          </div>
          <div className="card-body">
            <CargoPendingDetails props={props}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CargoPendingContainer;
