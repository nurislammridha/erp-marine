import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import VoyageActivityList from "../components/voyage-activity/list/VoyageActivityList";
import VoyageActivityFilter from "../components/voyage-activity/list/VoyageActivityFilter";
import VoyageShortHeader from "../components/voyage-activity/partials/VoyageShortHeader";
import { Link } from "react-router-dom";
import { getVesselId } from "../../../app/modules/Auth/_redux/authCrud";
import { GetLastVoyageByVesselId } from "../_redux/actions/VoyageAction";
import Pdf from "react-to-pdf";

const VoyageActivityContainer = (props) => {
  const dispatch = useDispatch();
  const [vesselId, setVesselId] = useState(null);

  const voyageData = useSelector((state) => state.voyageInfo.lastVoyageData);
  const ref = React.createRef();

  useEffect(() => {
    const vesselId = getVesselId();
    setVesselId(vesselId);

    if (vesselId !== null) {
      dispatch(GetLastVoyageByVesselId(vesselId));
    }
  }, []);

  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <div className="row pt-5 pl-4">
          <div className="col-xl-9 col-lg-9 col-md-9 col-5">
            <h3>Noon Report </h3>
            {/* <p className="pl-1 subHeader">Sub Header</p> */}
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-7 voyageActivityListBtn">
            {/* <Button className="  text-bold" variant="light text-primary ">
              Export
            </Button> */}
            <Dropdown className="d-inline mr-2">
              <Dropdown.Toggle
                className="text-bold "
                variant="light text-primary"
                id="dropdown-basic"
              >
                Export
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Pdf
                  targetRef={ref}
                  filename="code-example.pdf"
                  x={0.5}
                  y={0.5}
                  scale={0.93}
                >
                  {({ toPdf }) => (
                    <Dropdown.Item onClick={toPdf}>
                      <i class="far fa-file-pdf"></i>
                      <span className="ml-2">Pdf</span>
                    </Dropdown.Item>
                  )}
                </Pdf>

                <Dropdown.Item href="#/action-2">
                  <i class="far fa-file-excel"></i>
                  <span className="ml-2">Excel</span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <i class="far fa-file-word"></i>
                  <span className="ml-2">Word</span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1" onClick={window.print}>
                  <i class="fas fa-print"></i>
                  <span className="ml-2">Print</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link
              className="pl-3 pr-3 text-bold btn btn-primary text-white btn-sm "
              to="/voyage/voyage-activity/create"
            >
              <i className="fa fa-plus-circle"></i> Add New
            </Link>
          </div>
          <div className="clearfix"></div>
        </div>

        <div className="">
          {typeof voyageData !== "undefined" && voyageData !== null && (
            <VoyageShortHeader voyageData={voyageData} />
          )}
        </div>
        <VoyageActivityFilter />

        <div ref={ref}>
          <VoyageActivityList />
        </div>
      </div>
    </div>
  );
};

export default VoyageActivityContainer;
