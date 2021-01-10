import React from 'react'

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



const CircularProgressBar = () => {

    const percentage = 20;
    return (
        <>

            {/* <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="action__needed">
                            <div className="action__head">
                                <h4 className="float-left">Action Needed</h4>
                                <h4 className="float-right three__dot">  <i class="fas fa-ellipsis-h"></i></h4>
                            </div>

                            <div className="action__body">

                                <CircularProgressbar

                                    className="progress__bar"
                                    value={percentage}
                                    text={`${percentage}%`}
                                    styles={buildStyles({
                                        textColor: "black",
                                        // fontWeight: {900},
                                        pathColor: "rgba(201, 247, 245, 0.85)",
                                        trailColor: "rgba(27, 197, 189, 0.85)",

                                    })}

                                    strokeWidth={13}
                                />
                            </div>
                          
                           <div className="action__footer">
                                <p className="text_center"> Notes: Current sprint requires stakeholders
                                  to approve newly amended policies</p>

                                <a href="" target="_blank">generate Report</a>
                           </div>

                        </div>

                    </div>
                    <div className="col-lg-6">

                    </div>
                </div>
            </div> */}
           

        </>
    );
}

export default CircularProgressBar;