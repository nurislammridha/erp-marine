import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  GetCargoList,
  getPortsAction,
  handleChangeVoyageInput,
  voyageSubmitAction,
} from "../../../_redux/actions/VoyageAction";
import { GetVesselList } from "../../../../../domains/Vessel/_redux/actions/VesselAction";

const VoyageAdd = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();

  const voyageInput = useSelector((state) => state.voyageInfo.voyageInput);
  const loading = useSelector((state) => state.voyageInfo.isLoading);
  const portsOptions = useSelector((state) => state.voyageInfo.portsOptions);
  
  const vesselListOptions = useSelector(
    (state) => state.vesselInfo.vesselListOptions
  );

  const cargoOptionList = useSelector(
    (state) => state.voyageInfo.cargoOptionList
  );

  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeVoyageInput(name, value));
  };

  //add boiler info in multiple list
  const onSubmit = (data) => {
    dispatch(voyageSubmitAction(voyageInput));
  };

  useEffect(() => {
    dispatch(GetVesselList());
    dispatch(getPortsAction());
    dispatch(GetCargoList());
  }, []);

  return (
    <>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div className="form-group row mt-5">
          <div className="col-lg-4">
            <label className="form-label">Select Vessel c</label>
            <RHFInput
              as={<Select options={vesselListOptions} />}
              rules={{ required: false }}
              name="intVesselID"
              register={register}
              value={voyageInput.intVesselID}
              onChange={(option) => {
                handleChangeTextInput("strVesselName", option.label);
                handleChangeTextInput("intVesselID", option.value);
              }}
              setValue={setValue}
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label">Voyage No.</label>
            <Form.Control
              type="number"
              className="formHeight"
              placeholder="Enter Voyage No"
              value={voyageInput.intVoyageNo}
              name="intVoyageNo"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intVoyageNo", e.target.value)
              }
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label">Cargo Type</label>
            <RHFInput
              as={<Select options={cargoOptionList} />}
              rules={{ required: false }}
              name="intCargoTypeID"
              register={register}
              value={voyageInput.intCargoTypeID}
              onChange={(option) => {
                handleChangeTextInput("strCargoTypeName", option.label);
                handleChangeTextInput("intCargoTypeID", option.value);
              }}
              setValue={setValue}
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label mt-2">Cargo Qty</label>
            <Form.Control
              type="number"
              placeholder="Enter Cargo Quantity"
              value={voyageInput.intCargoQty}
              name="intCargoQty"
              className="formHeight"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intCargoQty", e.target.value)
              }
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label mt-2">Voyage date</label>
            <Form.Control
              type="date"
              placeholder="Voyage date"
              value={voyageInput.dteVoyageDate}
              name="dteVoyageDate"
              className="formHeight"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dteVoyageDate", e.target.value)
              }
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label mt-2">Port From</label>
            <RHFInput
              as={<Select options={portsOptions} />}
              rules={{ required: false }}
              name="intFromPortID"
              register={register}
              value={voyageInput.intFromPortID}
              onChange={(option) => {
                handleChangeTextInput("strFromPortName", option.label);
                handleChangeTextInput("intFromPortID", option.value);
              }}
              setValue={setValue}
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label mt-2">Port To</label>
            <RHFInput
              as={<Select options={portsOptions} />}
              rules={{ required: false }}
              name="intToPortID"
              register={register}
              value={voyageInput.intToPortID}
              onChange={(option) => {
                handleChangeTextInput("strToPortName", option.label);
                handleChangeTextInput("intToPortID", option.value);
              }}
              setValue={setValue}
            />
          </div>

          <div className="col-lg-4">
            <label className="form-label mt-2">Voyage Commencement</label>
            <Form.Control
              type="text"
              name="strPlaceOfVoyageCommencement"
              placeholder="Voyage Commencement"
              value={voyageInput.strPlaceOfVoyageCommencement}
              className="formHeight"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput(
                  "strPlaceOfVoyageCommencement",
                  e.target.value
                )
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">
              Bunker Qty At Voyage Commencement
            </label>
            <Form.Control
              type="number"
              name="strEngineName"
              placeholder="Bunker Qty At Voyage Commencement"
              className="formHeight"
              value={voyageInput.decBunkerQty}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerQty", e.target.value)
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">Distance</label>
            <Form.Control
              type="number"
              name="decDistance"
              placeholder="Type Distance"
              className="formHeight"
              value={voyageInput.decDistance}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decDistance", e.target.value)
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">VlsfoRob</label>
            <Form.Control
              type="number"
              name="intVlsfoRob"
              placeholder="VlsfoRob"
              className="formHeight"
              value={voyageInput.intVlsfoRob}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intVlsfoRob", e.target.value)
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">LsmgRob</label>
            <Form.Control
              type="number"
              name="intLsmgRob"
              placeholder="LsmgRob"
              className="formHeight"
              value={voyageInput.intLsmgRob}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intLsmgRob", e.target.value)
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">LubOilRob</label>
            <Form.Control
              type="number"
              name="intLubOilRob"
              placeholder="Type LubOilRob"
              className="formHeight"
              value={voyageInput.intLubOilRob}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intLubOilRob", e.target.value)
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">MeccRob</label>
            <Form.Control
              type="number"
              name="intMeccRob"
              placeholder="Type MeccRob"
              className="formHeight"
              value={voyageInput.intMeccRob}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intMeccRob", e.target.value)
              }
            />
          </div>
          <div className="col-lg-4">
            <label className="form-label mt-2">AeccRob</label>
            <Form.Control
              type="number"
              name="intTotalCrew"
              placeholder="Type AeccRob"
              className="formHeight"
              value={voyageInput.intAeccRob}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("intAeccRob", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10"></div>
        </div>
        <Link to="/voyage/list">
          <button type="button" class="btn btn-secondary btn-sm mr-2">
            Back
          </button>
        </Link>

        {loading && (
          <button type="submit" class="btn btn-primary btn-sm" disabled={true}>
            <span>Submitting...</span>
            <span className="ml-3 spinner spinner-white"></span>
          </button>
        )}

        {!loading && (
          <button type="submit" class="btn btn-primary btn-sm">
            <span>Submit</span>
          </button>
        )}
      </form>
    </>
  );
};

export default VoyageAdd;
