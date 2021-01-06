import React from "react";
import { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { showToast } from "../../../../master/utils/ToastHelper";
import {
  bunkerSubmitAction,
  handleChangeVoyageActivityBunkerInput,
  hanldeMultipleBoilerInfo,
} from "../../../_redux/actions/VoyageActivitybBunkerAction";

const BunkerVLSFO = (props) => {
  const history = useHistory();
  const { id, activeKey, setActiveKey } = props;
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const voyageActivityBunkerInput = useSelector(
    (state) => state.VoyageActivityBunkerReducer.voyageActivityBunkerInput
  );
  const isLoading = useSelector(
    (state) => state.VoyageActivityBunkerReducer.isLoading
  );

  const voyageActivityCreateInput = useSelector(
    (state) => state.voyageActivityInfo.voyageActivityCreateInput
  );

  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeVoyageActivityBunkerInput(name, value));
  };

  //add boiler info in multiple list
  const onSubmit = () => {
    dispatch(
      bunkerSubmitAction(
        voyageActivityBunkerInput,
        voyageActivityCreateInput,
        id
      )
    );
    setActiveKey(2)

  };
  // const activeKeyFunction = (key) => {
  //   return key;
  // }
  // const checkActiveKey = (key) => {
  //   const checkKey = activeKeyFunction(setActiveKey("Aux. Engine 1"));
  //   return checkKey;
  // };
  return (
    <form
      className="form form-label-right voyageEngineerForm pb-5"
      method="post"
      // onSubmit={(key) => checkActiveKey(key)}
    >
      <div>
        <p className="text-uppercase text-bold mt-3">Time at sea</p>
      </div>
      <div className="border-top"></div>
      <div className="form-group row ">
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>CON</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decBunkerVlsfoCon}
              name="decBunkerVlsfoCon"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerVlsfoCon", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>RCVD/ADJ</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decBunkerVlsfoAdj}
              name="decBunkerVlsfoAdj"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerVlsfoAdj", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>ROB</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decBunkerVlsfoRob}
              name="decBunkerVlsfoRob"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerVlsfoRob", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div>
        <p className="text-uppercase text-bold ">BUNKER LSMGO</p>
      </div>
      <div className="border-top"></div>
      <div className="form-group row mt-1 ">
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>CON</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decBunkerLsmgoCon}
              name="decBunkerLsmgoCon"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerLsmgoCon", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>RCVD/ADJ</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decBunkerLsmgoAdj}
              name="decBunkerLsmgoAdj"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerLsmgoAdj", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>ROB</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decBunkerLsmgoRob}
              name="decBunkerLsmgoRob"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decBunkerLsmgoRob", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div>
        <p className="text-uppercase text-bold ">LUB OIL MECC</p>
      </div>
      <div className="border-top"></div>
      <div className="form-group row mt-1">
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>CON</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decLubMeccCon}
              name="decLubMeccCon"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decLubMeccCon", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>RCVD/ADJ</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decLubMeccAdj}
              name="decLubMeccAdj"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decLubMeccAdj", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>ROB</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decLubMeccRob}
              name="decLubMeccRob"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decLubMeccRob", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      <div>
        <p className="text-uppercase text-bold ">LUB OIL AECC</p>
      </div>
      <div className="border-top"></div>
      <div className="form-group row mt-1">
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>CON</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decLubMecylCon}
              name="decLubMecylCon"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decLubMecylCon", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>RCVD/ADJ</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decLubMecylAdj}
              name="decLubMecylAdj"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decLubMecylAdj", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="col-lg-4">
          <Form.Group>
            <Form.Label>ROB</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBunkerInput.decLubMecylRob}
              name="decLubMecylRob"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decLubMecylRob", e.target.value)
              }
            />
          </Form.Group>
        </div>
      </div>
      {isLoading ? (
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
    </form>
  );
};

export default BunkerVLSFO;
