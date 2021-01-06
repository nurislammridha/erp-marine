import React from "react";
import { Image } from "react-bootstrap";
import akijShip from "../../../images/akijShip.png";
import box from "../../../images/box.png";
import portSign from "../../../images/portSign.png";
import calender from "../../../images/calender.png";
import metroShip from "../../../images/metroShip.png";
import moment from "moment";

const VoyageShortHeader = ({ voyageData }) => {
  const {
    strVesselName,
    strCargoTypeName,
    intCargoQty,
    strFromPortName,
    strToPortName,
    intVoyageNo,
    created_at,
  } = voyageData !== null ? voyageData : {};

  return (
    <div className="card card-custom gutter-b">
      {voyageData !== null && (
        <div className="voyageActivityCreateMain card">
          <div className="row voyageActivityCreate">
            <div className="col-xl-2 col-lg-2 col-md-4  mb-3 col-5">
              <Image className="float-left ml-2 akijShip " src={akijShip} />
              <p className="float-left ml-2 akijNoor">{strVesselName}</p>
            </div>

            <div className="clearfix"></div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-7 border-left">
              <Image className="float-left mr-3   metroShip" src={box} />
              <p className="float-left">
                {strCargoTypeName} - {intCargoQty}
              </p>
            </div>
            <div className="clearfix"></div>
            <div className="col-xl-2 col-lg-2 col-md-4 col-6 mb-3">
              <Image className="float-left" src={portSign} />
              <p className="float-left akijNoor akijNoor2">
                {strFromPortName} - {strToPortName}
              </p>
            </div>
            <div className="clearfix"></div>
            <div className="col-lg-1 border-right"></div>

            <div className="col-xl-2 col-lg-2 col-md-4 col-6">
              <Image className="float-left   metroShip" src={metroShip} />
              <p className="float-left akijNoor ml-2">
                Voyage No #{intVoyageNo}
              </p>
            </div>
            <div className="clearfix"></div>

            <div className="col-xl-2 col-lg-2 col-md-4 col-6">
              <Image className="float-left   metroShip" src={calender} />
              <p className="float-left akijNoor ml-2">
                {moment(created_at).format("Do MMMM YYYY")}
              </p>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoyageShortHeader;
