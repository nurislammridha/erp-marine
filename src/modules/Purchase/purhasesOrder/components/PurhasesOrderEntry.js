import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../_metronic/_assets/css/default-style.css";
import "../../../../styles/global-style.css";
import { Form, Card, Button, Col, InputGroup } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { getCharterList } from "../../../master/DropDownData/Charter/_redux/CharterAction/CharterAction";
import PurchaseOrderMultiple from "./PurchaseOrderMultiple";

const PurhasesOrderEntry = () => {
  const { register, setValue } = useForm();

  const shipList = [
    {
      value: 1,
      label: "Akij"
    },
    {
      value: 2,
      label: "Akij Noor"
    },
  ]
  return (
    <>
      <div className="row">
        <div className="col-md-9 col-12 mr-0 pr-0">
          <Card className="mr-0 pr-0">
            <Card.Body className="pt-5 mt-0">
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="text-bold">PURCHASE ORDER</h6>
                </div>
                <div className="col-lg-9">
                  <hr className="hr-margin"></hr>
                </div>
              </div>

              <form
                className="form form-label-right voyageEngineerForm" autoComplete="off" >
                <div className="form-group row mb-1">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Supplier Name</label>
                    <RHFInput
                      as={<Select options={shipList} />}
                      rules={{ required: false }}
                      name="intShipId"
                      register={register}
                      value={""}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Supplier Address</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="numVesselDWT"
                        type="text"
                        value={""}
                        placeholder="Enter Address"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Order Date</label>
                    <DatePicker
                      className="date-picker"
                      name="dteCPDate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="select C/P date"
                      selected={""}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Currency</label>
                    <RHFInput
                      as={<Select options={shipList} />}
                      rules={{ required: false }}
                      name="intShipId"
                      register={register}
                      value={""}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Payment Terms</label>
                    <RHFInput
                      as={<Select options={shipList} />}
                      rules={{ required: false }}
                      name="intShipId"
                      register={register}
                      value={""}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">cash/Advance</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="numVesselDWT"
                        type="text"
                        value={""}
                        placeholder="Enter Address"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Pay Days</label>
                    <DatePicker
                      className="date-picker"
                      name="dteCPDate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="select C/P date"
                      selected={""}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>
          <Card className="ml-0 pl-0">
            <Card.Body className="pt-5 mt-0">

              <PurchaseOrderMultiple />

            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-12 ml-0 pl-0">
          <Card className="ml-0 pl-0">
            <Card.Body className="pt-5 mt-0">
              <form
                className="form form-label-right voyageEngineerForm" autoComplete="off" >
                <div className="form-group row mb-1">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <label className="formFont">Incoterm</label>
                    <RHFInput
                      as={<Select options={shipList} />}
                      rules={{ required: false }}
                      name="intShipId"
                      register={register}
                      value={""}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Supplier Reference</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="numVesselDWT"
                        type="text"
                        value={""}
                        placeholder="Enter Supplier Reference"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <label className="formFont">Reference Date</label>
                    <DatePicker
                      className="date-picker"
                      name="dteCPDate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="Select Reference Date"
                      selected={""}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <label className="formFont">Validity</label>
                    <DatePicker
                      className="date-picker"
                      name="dteCPDate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="Select Validity"
                      selected={""}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Order terms</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="numVesselDWT"
                        type="text"
                        value={""}
                        placeholder="Enter Address"
                      />
                    </Form.Group>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>

        </div>
      </div>

    </>
  );
};

export default PurhasesOrderEntry;
