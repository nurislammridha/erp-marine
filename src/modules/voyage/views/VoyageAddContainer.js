import React from "react";
import VoyageAdd from "../components/voyage/create/VoyageAdd";

const VoyageAddContainer = () => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b card-top-border">
          <div className="card-header p-0">
            <div className="card-title">
              <h3 class="card-label">Voyage Entry</h3>
            </div>
          </div>
          <div className="card-body pt-0">
            <VoyageAdd />
          </div>
        </div>
      </div>
    </>
  );
};

export default VoyageAddContainer;
