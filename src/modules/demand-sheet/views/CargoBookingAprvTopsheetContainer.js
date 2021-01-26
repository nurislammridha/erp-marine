import React from "react";
import CargoBookingAprvTopsheet from "../components/CargoBookingAprvTopsheet";



const CargoBookingAprvTopsheetContainer = () => {
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">CargoBookingAprvTopsheet</h3>
            </div>
          </div>
          <div className="card-body">
            <CargoBookingAprvTopsheet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CargoBookingAprvTopsheetContainer;