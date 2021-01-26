import React from "react";
import CargoBookingUpdate from "../components/CargoBookingUpdate";



const CargoBookingUpdateContainer = (props) => {
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
            <CargoBookingUpdate props={props}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CargoBookingUpdateContainer;
