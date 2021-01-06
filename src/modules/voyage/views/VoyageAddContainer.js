import React from "react";
import VoyageAdd from "../components/voyage/create/VoyageAdd";

const VoyageAddContainer = () => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Voyage Entry</h3>
            </div>
          </div>
          <div className="card-body">
            <VoyageAdd />
          </div>
        </div>
      </div>
    </>
  );
};

export default VoyageAddContainer;
