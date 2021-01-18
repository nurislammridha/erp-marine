import React, { useState } from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCargoList,
  GetVoyageList,
} from "../../../_redux/actions/VoyageAction";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { GetVesselList } from "../../../../../domains/Vessel/_redux/actions/VesselAction";
import { useEffect } from "react";

const VoyageFilter = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  //select vessel
  const voyageInput = useSelector((state) => state.voyageInfo.voyageInput);
  const loading = useSelector((state) => state.voyageInfo.isLoading);
  const vesselListOptions = useSelector(
    (state) => state.vesselInfo.vesselListOptions
  );
  //cargo type
  const cargoOptionList = useSelector(
    (state) => state.voyageInfo.cargoOptionList
  );
  const handleChangeTextInput = (name, value) => {
    // dispatch(GetVoyageList(value, type));
  };
  const changeSearch = (value) => {
    setSearch(value);
    dispatch(GetVoyageList(value, type));
    console.log(value);
  };

  // const changeType = (value) => {
  //   setSearch(value);
  //   dispatch(GetVoyageList(search, value));
  // };
  useEffect(() => {
    dispatch(GetVesselList());
    dispatch(GetCargoList());
  }, []);

  return (
    <form className="form form-label-right" method="post">
      <div className="form-group row ml-2">
        <div className="col-lg-3 col-md-6 col-10">
          <Form.Control
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            className="formHeight"
          />
        </div>
        <div className="col-lg-3 col-md-6 col-10">
          <Form.Group
            className="noonReportInput"
            as={Row}
            controlId="formPlaintextPassword"
          >
            <Form.Label className="mt-2 voyagelist-formlabel">Type</Form.Label>
            <Col sm="9">
              <RHFInput
                as={<Select options={cargoOptionList} />}
                rules={{ required: false }}
                name="intCargoTypeID"
                register={register}
                value={voyageInput.intCargoTypeID}
                onChange={(option) => {
                  handleChangeTextInput("strCargoTypeName", option.label);
                  handleChangeTextInput("intCargoTypeID", option.value);
                  dispatch(GetVoyageList(search, option.value));
                }}
                setValue={setValue}
              />
            </Col>
          </Form.Group>
        </div>

        <div className="col-lg-3 col-md-6 col-10">
          <Form.Group
            className="noonReportInput"
            as={Row}
            onChange={(e) => changeSearch(e.target.value)}
            controlId="formPlaintextPassword"
          >
            <Form.Label className="mt-2 voyagelist-formlabel">
              Vessel
            </Form.Label>
            <Col sm="10">
              <RHFInput
                as={<Select options={vesselListOptions} />}
                rules={{ required: false }}
                name="intVesselID"
                register={register}
                value={voyageInput.intVesselID}
                onChange={(option) => {
                  handleChangeTextInput("strVesselName", option.label);
                  handleChangeTextInput("intVesselID", option.value);
                  dispatch(
                    GetVoyageList(
                      search,
                      voyageInput.intCargoTypeID,
                      option.value
                    )
                  );
                }}
                setValue={setValue}
              />
            </Col>
          </Form.Group>
        </div>
      </div>
    </form>
  );
};

export default VoyageFilter;
