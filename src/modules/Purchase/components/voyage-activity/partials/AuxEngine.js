import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  AuxEngnSubmitAction,
  handleChangeVoyageActivityAuxEngnInput,
} from "../../../_redux/actions/VoyageActivityAuxEngnAction";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const AuxEngine = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const { id } = props;

  const voyageActivityAuxEngnInput = useSelector(
    (state) => state.voyageAux1.voyageActivityAuxEngnInput
  );
  console.log('voyageActivityAuxEngnInput', voyageActivityAuxEngnInput)
  const loading = useSelector((state) => state.voyageAux1.isLoading);
  const voyageActivityCreateInput = useSelector(
    (state) => state.voyageActivityInfo.voyageActivityCreateInput
  );

  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeVoyageActivityAuxEngnInput(name, value));
  };

  //add boiler info in multiple list
  const onSubmit = (data) => {
    dispatch(
      AuxEngnSubmitAction(
        voyageActivityAuxEngnInput,
        voyageActivityCreateInput,
        id
      )
    );
  };

  return (
    <form
      className="form form-label-right voyageEngineerForm"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <div>
        <p className="text-uppercase text-bold mt-3">Aux.Engine 1</p>
      </div>
      <div className="border-bottom"></div>
      <div className="form-group row">
        <div className="col-lg-5">
          <div>
            <p className="text-uppercase text-bold mt-3">
              Main Engine (Temperature)
            </p>
          </div>
          <div className="border-top mb-3"></div>

          <Form.Group as={Row}>
            <Form.Label column sm="5">
              T/C RPM
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
                name="dceMainEngineFuelRPM"
                placeholder="Type"
                value={voyageActivityAuxEngnInput.dceMainEngineFuelRPM}
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
                onChange={(e) =>
                  handleChangeTextInput("dceMainEngineFuelRPM", e.target.value)
                }
              />
            </Col>
          </Form.Group>
        </div>
      </div>

      <div className="form-group row mt-2">
        <div className="col-xl-3 col-lg-3 col-6">
          <Form.Group>
            <Form.Label>R/H</Form.Label>
            <Form.Control
              type="text"
              name="dceRH"
              placeholder="Type"
              value={voyageActivityAuxEngnInput.dceRH}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) => handleChangeTextInput("dceRH", e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-xl-3 col-lg-3 col-6">
          <Form.Group>
            <Form.Label>Load (KW)</Form.Label>
            <Form.Control
              type="text"
              name="dceLoad"
              placeholder="Type"
              value={voyageActivityAuxEngnInput.dceLoad}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) => handleChangeTextInput("dceLoad", e.target.value)}
            />
          </Form.Group>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-3">
          <p className="mt-3">Aux Temp.</p>
        </div>
        <div className="col-lg-3">
          <div className="minInput">
            <Form.Group>
              <Form.Control
                type="text"
                name="dceExhtTemp1"
                placeholder="Type"
                value={voyageActivityAuxEngnInput.dceExhtTemp1}
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
                onChange={(e) =>
                  handleChangeTextInput("dceExhtTemp1", e.target.value)
                }
              />
              {/* <Form.Control
                type="number"
                name="dceExhtTemp1"
                placeholder="MIN"
                value={voyageActivityAuxEngnInput.dceExhtTemp1}
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
                onChange={(e) =>
                  handleChangeTextInput("dceExhtTemp1", e.target.value)
                }
              /> */}
            </Form.Group>
          </div>
          <div className="maxInput">
            <Form.Group>
              <Form.Control
                type="number"
                name="dceExhtTemp2"
                placeholder="MAX"
                value={voyageActivityAuxEngnInput.dceExhtTemp2}
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
                onChange={(e) =>
                  handleChangeTextInput("dceExhtTemp2", e.target.value)
                }
              />
            </Form.Group>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-2">
          <p className="mt-3">Aux Temp.</p>
        </div>

        <div className="col-lg-2">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceExhtTemp3"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceExhtTemp3}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceExhtTemp3", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-3">
          <p className="mt-3">Jacket Temp</p>
        </div>

        <div className="col-lg-3">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceJacketTemp"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceJacketTemp}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceJacketTemp", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-1"></div>
        <div className="col-lg-2">
          <p className="mt-3">Jacket Pressure.</p>
        </div>

        <div className="col-lg-2">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceJacketPressure"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceJacketPressure}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceJacketPressure", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-3">
          <p className="mt-3">SCAV</p>
        </div>

        <div className="col-lg-3">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceScavTemp"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceScavTemp}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceScavTemp", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-1"></div>
        <div className="col-lg-2">
          <p className="mt-3">SCAV Pressure</p>
        </div>

        <div className="col-lg-2">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceScavPressure"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceScavPressure}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceScavPressure", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div className="row mt-1 ">
        <div className="col-lg-3">
          <p className="mt-3">Lub Oil Temp</p>
        </div>

        <div className="col-lg-3">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceLubOilTemp"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceLubOilTemp}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceLubOilTemp", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-1"></div>
        <div className="col-lg-2">
          <p className="mt-3">Lub Oil Pressure</p>
        </div>

        <div className="col-lg-2">
          <Form.Group>
            <Form.Control
              type="number"
              name="dceLubOilPressure"
              placeholder="0"
              value={voyageActivityAuxEngnInput.dceLubOilPressure}
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("dceLubOilPressure", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div className=" mt-5">
        <Button
          className="col-xl-2 col-lg-2 col-4  ml-5 float-left text-white AuxEngineBackBtn"
          variant="secondary"
        >
          Back
        </Button>

        {loading ? (
          <Button
            className="col-xl-2 col-lg-2 col-4 float-right"
            variant="primary"
            disabled={true}
          >
            Saving...
            <span className="ml-3 spinner spinner-white"></span>
          </Button>
        ) : (
            <Button
              className="col-xl-2 col-lg-2 col-4 float-right"
              variant="primary"
              onClick={() => onSubmit()}
            >
              Next
            </Button>
          )}
      </div>
      <div className="clearfix"></div>
    </form>
  );
};

export default AuxEngine;
