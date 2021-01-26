import React from "react";

import TopSheet from "../components/TopSheet";

const TopSheetContainer = () => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Top Sheet</h3>
            </div>
          </div>
          <div className="card-body">
            <TopSheet />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSheetContainer;
