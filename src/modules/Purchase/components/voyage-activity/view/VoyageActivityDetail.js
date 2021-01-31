import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BunkerVLSFO from "../view/partials/BunkerView";
import AuxEngine from "../view/partials/AuxEngineView";
import AuxEngine2 from "../view/partials/AuxEngine2View";
import AuxEngine3 from "../view/partials/AuxEngine3View";
import Boiler from "../view/partials/BoilerView";
import { GetVoyageActivityDetail } from "../../../_redux/actions/VoyageActivityAction";

const VoyageActivityDetail = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { id } = props;

  const voyageActivityDetail = useSelector(
    (state) => state.voyageActivityInfo.voyageActivityDetail
  );
  console.log("voyageActivityDetail :>> ", voyageActivityDetail);

  useEffect(() => {
    dispatch(GetVoyageActivityDetail(id));
  }, []);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <div className="card card-custom p-5">
        <div className="">
          <div className="">
            <h3 class="">Details</h3>
          </div>
        </div>
        {voyageActivityDetail !== null && (
          <>
            <div className="row mt-4 ">
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Voyage ID</p>
                <h6>{voyageActivityDetail.intVoyageID}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Date</p>
                <h6>{voyageActivityDetail.dteCreatedAt}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Condition</p>
                <h6>{voyageActivityDetail.intShipConditionTypeID}</h6>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-xl-4 col-lg-4 col-6">
                <p>R.P.M</p>
                <h6>{voyageActivityDetail.strRPM}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Engine Speed</p>
                <h6>{voyageActivityDetail.decEngineSpeed}</h6>
              </div>
              <div className="col-xl-4 col-lg-4 col-6">
                <p>Slip(%)</p>
                <h6>{voyageActivityDetail.decSlip}</h6>
              </div>
            </div>
          </>
        )}
        {voyageActivityDetail === null ? "Loading Detail Data..." : null}
      </div>

      <div className="card card-custom p-5 mt-5">
        <div className="noonReportTab">
          <div>
            <div className="bg-light voyage-tab">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor=""
                textColor=""
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab className="voyage-details-tab" label="Bunker VLSFO" />
                <Tab className="voyage-details-tab" label="Aux. Engine 1" />
                <Tab className="voyage-details-tab" label="Aux. Engine 2" />
                <Tab className="voyage-details-tab" label="Aux. Engine 3" />
                <Tab className="voyage-details-tab" label="Boiler" />

              </Tabs>
            </div>
            {value === 0 && <BunkerVLSFO />}
            {value === 1 && (
              <div className="pl-5">
                <AuxEngine />
              </div>
            )}
            {value === 2 && (
              <div className="pl-5">
                <AuxEngine2 />
              </div>
            )}
            {value === 3 && (
              <div className="pl-5">
                <AuxEngine3 />
              </div>
            )}
            {value === 4 && (
              <div className="pl-5">
                <Boiler />
              </div>
            )}
          </div>
          {/* <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              variant="pills"
              className="bg-light"
            > */}
          {/* <Tab eventKey="Bunker VLSFO" title="Bunker VLSFO"> */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="Main Engine " title="Main Engine"> */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="Exht. Engine 1" title="Exht. Engine 1"> */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="Exht. Engine 2" title="Exht. Engine 2"> */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="Exht. Engine 3" title="Exht. Engine 3"> */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="Boiler" title="Boiler"> */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* <Tab
                eventKey="Gas and Chemical's Consumption"
                title="Gas and Chemical's Consumption"
              > */}
          {/* <Sonnet /> */}
          {/* </Tab> */}
          {/* </Tabs> */}
        </div>
      </div>
    </>
  );
};

export default VoyageActivityDetail;
