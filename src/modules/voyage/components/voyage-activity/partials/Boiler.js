import React from "react";
import { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  boilerSubmitAction,
  deleteBoilerMultipleDataByIndexAction,
  handleChangeVoyageActivityBoilerInput,
  hanldeMultipleBoilerInfo,
} from "../../../_redux/actions/VoyageActivitybBoilerAction";
const Boiler = (props) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const { id } = props;

  const voyageActivityBoilerInput = useSelector(
    (state) => state.VoyageActivityBoilerReducer.voyageActivityBoilerInput
  );
  const isLoading = useSelector(
    (state) => state.VoyageActivityBoilerReducer.isLoading
  );
  const voyageActivityCreateInput = useSelector(
    (state) => state.voyageActivityInfo.voyageActivityCreateInput
  );
  const handleChangeTextInput = (name, value, voyageActivityCreateInput) => {
    dispatch(handleChangeVoyageActivityBoilerInput(name, value));
  };

  //add boiler info in multiple list
  const onSubmit = (data) => {
    dispatch(boilerSubmitAction(voyageActivityBoilerInput, voyageActivityCreateInput, id));
  };

  return (
    <div>
      <form
        className="form form-label-right voyageEngineerForm pb-5"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div>
          <p className="text-uppercase text-bold mt-3">BOILER</p>
        </div>
        <div className="border-bottom"></div>
        <div className="col-lg-6 mt-2">
          <Form.Group>
            <Form.Label>Working Pressure (BAR)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type"
              value={voyageActivityBoilerInput.decWorkingPressure}
              name="decWorkingPressure"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("decWorkingPressure", e.target.value)
              }
            />
          </Form.Group>
        </div>
        <div className="boilerTypeBg pt-5 pb-5 mt-2 ml-2">
          <div className="form-group row  p-5">
            <div className="col-xl-3 col-lg-3 col-md-6">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dteCreatedAt"
                  value={voyageActivityBoilerInput.dteCreatedAt}
                  ref={register({
                    required: false,
                    maxLength: 100,
                  })}
                  onChange={(e) =>
                    handleChangeTextInput("dteCreatedAt", e.target.value)
                  }
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <Form.Group>
                <Form.Label>PH Value</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type"
                  name="decPhValue"
                  value={voyageActivityBoilerInput.decPhValue}
                  ref={register({
                    required: false,
                    maxLength: 100,
                  })}
                  onChange={(e) =>
                    handleChangeTextInput("decPhValue", e.target.value)
                  }
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <Form.Group>
                <Form.Label>Chloride</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type"
                  name="decChloride"
                  value={voyageActivityBoilerInput.decChloride}
                  ref={register({
                    required: false,
                    maxLength: 100,
                  })}
                  onChange={(e) =>
                    handleChangeTextInput("decChloride", e.target.value)
                  }
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <Form.Group>
                <Form.Label>Alkalinity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type"
                  name="decAlkalinity"
                  value={voyageActivityBoilerInput.decAlkalinity}
                  ref={register({
                    required: false,
                    maxLength: 100,
                  })}
                  onChange={(e) =>
                    handleChangeTextInput("decAlkalinity", e.target.value)
                  }
                />
              </Form.Group>
            </div>
          </div>
          <Button
            type="button"
            className=" float-right mr-4"
            variant="primary"
            onClick={() =>
              dispatch(
                hanldeMultipleBoilerInfo(
                  voyageActivityBoilerInput,
                  voyageActivityCreateInput
                )
              )
            }
          >
            <i class="fas fa-plus-circle"></i>
          </Button>
          <div className="clearfix"></div>
        </div>

        <div className="col-7">
          <div className="border-top mt-5"></div>
          <Table className="boilerTable text-center" striped hover>
            <thead>
              <tr>
                <th>Sl</th>
                <th>Date</th>
                <th>Working Pressure</th>
                <th>PH</th>
                <th>Chlo</th>
                <th>Alka</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { voyageActivityBoilerInput.boilerlists && voyageActivityBoilerInput.boilerlists.map((boiler, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{boiler.dteCreatedAt}</td>
                  <td>{boiler.decWorkingPressure}</td>
                  <td>{boiler.decPhValue}</td>
                  <td>{boiler.decChloride}</td>
                  <td>{boiler.decAlkalinity}</td>
                  <td>
                    <i
                      className="far fa-trash-alt"
                      onClick={() =>
                        dispatch(deleteBoilerMultipleDataByIndexAction(index))
                      }
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className=" mt-5 pb-5">
          <Button
            className="col-xl-2 col-lg-2 col-4 ml-5 float-left text-white AuxEngineBackBtn"
            variant="secondary"
          >
            Back
          </Button>
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
              type="submit"
              className="col-xl-2 col-lg-2 col-4 ml-5  float-right"
              variant="primary"
            >
              Save
            </Button>
          )}
        </div>
      </form>
      <div className="clearfix"></div>
    </div>
  );
};

export default Boiler;
