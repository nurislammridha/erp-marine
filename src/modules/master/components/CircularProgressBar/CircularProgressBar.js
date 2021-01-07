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

           <div className="container">
               <div className="row">
                   <div className="col-lg-5">

                        <div className="action__needed">
                                <div className="action__head">
                                    <h4 className="float-left">Action Needed</h4>
                                      
                                </div>

                                <div className="action__body">

                                <CircularProgressbar
                                    
                                    className="progress__bar"
                                    value={percentage}
                                    text={`${percentage}%`}
                                    styles={buildStyles({
                                        textColor: "blue",
                                        pathColor: "turquoise",
                                        trailColor: "gold",

                                    })}
                                />
                                </div>


                        </div>

                   </div>
                   <div className="col-lg-6">

                   </div>
               </div>
           </div>
          
      </>
     );
}
 
export default CircularProgressBar;