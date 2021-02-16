import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetVoyageActivityList } from "../../../_redux/actions/VoyageActivityAction";
import Select from "react-select";
import { useEffect } from "react";
import { GetVoyageList } from "../../../_redux/actions/VoyageAction";
import { GetVesselList } from "../../../../../domains/Vessel/_redux/actions/VesselAction";

const VoyageActivityFilter = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [voyage, setVoyage] = useState("");
  const [vessel, setVessel] = useState("");
  const voyageIDList = useSelector((state) => state.voyageInfo.voyageIDList);
  const vesselListOptions = useSelector(
    (state) => state.vesselInfo.vesselListOptions
  );

  useEffect(() => {
    dispatch(GetVesselList());
  }, []);

  const changeVessel = (option) => {
    setVessel(option);
    setVoyage("");
    dispatch(GetVoyageActivityList(search, voyage.value, option.value));
    dispatch(GetVoyageList("", "", option.value));
  };

  return (
    <form className="form form-label-right" method="post">
      <div className="form-group row ml-2">
        <div className="col-lg-4 col-md-6 col-10 voyage-search">
          <Form.Label className="">Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search"
            className="formHeight"
            onChange={(e) => {
              setSearch(e.target.value);
              dispatch(
                GetVoyageActivityList(
                  e.target.value,
                  voyage.value,
                  vessel.value
                )
              );
            }}
          />
        </div>
        {/* <div className="col-lg-3 col-md-6 col-10">
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label>Vessel</Form.Label>
            <Col sm="9" className="mt-10">
              <Select
                options={vesselListOptions}
                value={vessel}
                onChange={(option) => changeVessel(option)} />
            </Col>
          </Form.Group>
        </div> */}

        <div className="col-lg-4 col-md-6 col-10 mt-5 voyage-activity-vessel">
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label className="voyage-vessel">Select Vessel</Form.Label>
            <Col sm="9">
              <Select
                options={vesselListOptions}
                value={vessel}
                onChange={(option) => changeVessel(option)}
              />
            </Col>
          </Form.Group>
        </div>

        <div className="col-lg-4 col-md-6 col-10">
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label className="ml-4">Select Voyage</Form.Label>
            <Col sm="9">
              <Select
                options={voyageIDList}
                value={voyage}
                onChange={(option) => {
                  setVoyage(option);
                  dispatch(
                    GetVoyageActivityList(search, option.value, vessel.value)
                  );
                }}
              />
            </Col>
          </Form.Group>
        </div>
      </div>
    
    </form>
  );
};

export default VoyageActivityFilter;
