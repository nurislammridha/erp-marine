import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TableCircularProgressBar = () => {
  const percentage = 20;
  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-lg-5"> */}
      <div className="circulerBar">
        <div className="">
          <CircularProgressbar
            className=""
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "#464E5F",
              pathColor: "#E5EAEE",
              trailColor: "#0BB783",
            })}
          />
        </div>
      </div>
      {/* </div>
          <div className="col-lg-6"></div>
        </div>
      </div> */}
    </>
  );
};

export default TableCircularProgressBar;
