import React from "react";
import DemandEntry from "../components/DemandEntry";

const DemandEntryContainer = () => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Cargo Booking</h3>
            </div>
          </div>
          <div className="card-body">
            <DemandEntry />
          </div>
        </div>
      </div>
    </>
  );
};

export default DemandEntryContainer;
