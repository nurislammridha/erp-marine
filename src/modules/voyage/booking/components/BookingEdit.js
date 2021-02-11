import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../_metronic/_assets/css/default-style.css";
import "../../../../styles/global-style.css";
import { Form, Card, Button, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { handleVesselBookingInput, VesselBookingEdit } from "../_redux/actions/VesselBookingEditAction";
import moment from 'moment';
import { useHistory, useParams } from "react-router-dom";
import { getVoyageType } from "../../../master/DropDownData/VoyageType/_redux/VoyageTypeAction/VoyageTypeAction";
import { getVesselBookingDetails } from "../_redux/actions/VesselBookInfoAction";
import { getPortList } from "../../../master/DropDownData/Port/_redux/PortAction/PortAction";
import { getCargoList } from "../../../master/DropDownData/Cargo/_redux/CargoAction/CargoAction";
import { getShipList } from "../../../master/DropDownData/Ship/_redux/ShipAction/ShipAction";
import { getBookingStatusList } from './../../../master/DropDownData/BookingStatus/_redux/BookingStatusAction/BookingStatusAction';
import { getCharterList } from "../../../master/DropDownData/Charter/_redux/CharterAction/CharterAction";

const BookingEdit = () => {
  const history = useHistory();
  const { id } = useParams()
  const { register, setValue } = useForm();
  const dispatch = useDispatch();

  const VesselBooking = useSelector((state) => state.VesselBookingReducer.VesselBooking);
  const voyageTypeList = useSelector((state) => state.VoyageTypeReducer.voyageTypeList);
  const portList = useSelector((state) => state.PortReducer.portList);
  const cargoList = useSelector((state) => state.CargoReducer.cargoList);
  const shipList = useSelector((state) => state.ShipReducer.shipList);
  const isLoading = useSelector((state) => state.VesselBookingReducer.isLoading);
  const VesselBookingDetails = useSelector((state) => state.VesselBookingReducer.VesselBookingDetails);
  const bookingStatusList = useSelector((state) => state.BookingStatusReducer.bookingStatusList);
  const charterList = useSelector((state) => state.CharterReducer.charterList);
  const brokerList = useSelector((state) => state.CharterReducer.brokerList);
  useEffect(() => {
    dispatch(getVoyageType());
    dispatch(getPortList());
    dispatch(getCargoList());
    dispatch(getCharterList());
    dispatch(getShipList());
    dispatch(getBookingStatusList())
    dispatch(getVesselBookingDetails(id))

  }, [])

  console.log('VesselBooking :>> ', VesselBooking);

// handle vessel booking input 
const handleChangeTextInput = (name, value) => {
  dispatch(handleVesselBookingInput(name, value))
}
const submitVesselBooking = (e) => {
  dispatch(VesselBookingEdit(VesselBooking, e, id))
  e.preventDefault()
}

return (
  <Card>
    <Card.Body className="pt-5 mt-0">
      <h1 className="tableheading mt-0 pt-0 ">Booking Edit</h1>
      <hr></hr>
      <div className="row">
        <div className="float-left booking-text">
          <h6 className="text-bold">BASIC INFO</h6>
        </div>
        <div className=" float-right booking-text">
          <hr className="hr-margin"></hr>
        </div>
      </div>
      <div className="clear-fix"></div>


      <form
        className="form form-label-right voyageEngineerForm" onSubmit={(e) => submitVesselBooking(e)} autoComplete="off" >
        <div className="form-group row mb-1">
          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Ship Name</label>
            <RHFInput
              as={<Select options={shipList} />}
              rules={{ required: false }}
              name="intShipId"
              register={register}
              value={VesselBooking.ship}
              onChange={(option) => {
                handleChangeTextInput('strShipName', option.label);
                handleChangeTextInput('intShipId', option.value)
              }}
              setValue={setValue}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Broker Name</label>
            <RHFInput
              as={<Select options={brokerList} />}
              rules={{ required: false }}
              name="intBrokerId"
              register={register}
              value={VesselBooking.broker}
              onChange={(option) => {
                handleChangeTextInput('strBrokerName', option.label);
                handleChangeTextInput('intBrokerId', option.value)
              }}
              setValue={setValue}
            />
          </div>

          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Charter Name</label>
            <RHFInput
              as={<Select options={charterList} />}
              rules={{ required: false }}
              name="intCharterId"
              register={register}
              value={VesselBooking.charter}
              onChange={(option) => {
                handleChangeTextInput('strCharterName', option.label);
                handleChangeTextInput('intCharterId', option.value)
              }}
              setValue={setValue}
            />
          </div>
          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Voyage Type</label>
            <RHFInput
              as={<Select options={voyageTypeList} />}
              rules={{ required: false }}
              name="intVoyageTypeId"
              register={register}
              value={VesselBooking.voyageType}
              onChange={(option) => {
                handleChangeTextInput('strVoyageNo', option.label);
                handleChangeTextInput('intVoyageTypeId', option.value)
              }}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="form-group row mb-1">
          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Load Port/ Commence Port</label>
            <RHFInput
              as={<Select options={portList} />}
              rules={{ required: false }}
              name="intCommencePortId"
              register={register}
              value={VesselBooking.commencePort}
              onChange={(option) => {
                handleChangeTextInput('strCommencePortName', option.label);
                handleChangeTextInput('intCommencePortId', option.value)
              }}
              setValue={setValue}
            />
          </div>
          <div className="col-lg-3 col-6">
            <label className="formFont"> Commence Date</label>
            <DatePicker
              className="date-picker"
              name="dteCommenceDate"
              dateFormat="MM-dd-yyyy"
              minDate={moment().toDate()}
              placeholderText="select commence date"
              selected={VesselBooking.dteCommenceDate !== '' ? moment(VesselBooking.dteCommenceDate).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteCommenceDate", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>

          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Dischanging/ Completion Port</label>
            <RHFInput
              as={<Select options={portList} />}
              rules={{ required: false }}
              name="intCompletionPortId"
              register={register}
              value={VesselBooking.completionPort}
              onChange={(option) => {
                handleChangeTextInput('strCompletionPortName', option.label);
                handleChangeTextInput('intCompletionPortId', option.value)
              }}
              setValue={setValue}
            />
          </div>
          <div className="col-lg-3 col-6 completion-date">
            <label className="formFont"> Completion Date</label>
            <DatePicker
              className="date-picker"
              name="dteCompletionDate"
              dateFormat="MM-dd-yyyy"
              minDate={VesselBooking.dteCommenceDate}
              placeholderText="select completion date"
              selected={VesselBooking.dteCompletionDate !== '' ? moment(VesselBooking.dteCompletionDate).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteCompletionDate", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>
        </div>
        <div className="mt-5">
          <div className="row">
            <div className="float-left booking-text two">
              <h6 className="text-bold">RATE AND COMMISION</h6>
            </div>
            <div className="float-right booking-text two">
              <hr className="hr-margin"></hr>
            </div>
          </div>
        </div>
        <div className="clear-fix"></div>

        <div className="form-group row mb-1">


          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Freight/ Hire Rate</label>
            {/* <RHFInput
                as={<Select options={VesselBooking} />}
                rules={{ required: false }}
                name="numFreightOrHireRate"
                register={register}
                value={VesselBooking.numFreightOrHireRate}
                onChange={(option) => {
                  handleChangeTextInput('strFreightOrHireName', option.label);
                  handleChangeTextInput('numFreightOrHireRate', option.value)
                }}
                setValue={setValue}
              /> */}
            <Form.Control
              className="formHeight"
              name="numFreightOrHireRate"
              type="text"
              value={VesselBooking.numFreightOrHireRate}
              onChange={(e) => handleChangeTextInput('numFreightOrHireRate', e.target.value)}
              placeholder="Freight/ Hire Rate"
            />
          </div>
          <div className="col-lg-3 col-6">
            <Form.Group>
              <Form.Label className="formFont pl-1">Load Rate</Form.Label>
              <Form.Control
                className="formHeight"
                type="number"
                placeholder="Load Rate"
                name="numLoadRate"
                value={VesselBooking.numLoadRate}
                onChange={(e) => handleChangeTextInput('numLoadRate', e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-lg-3 col-6">
            <Form.Group>
              <Form.Label className="formFont pl-1">
                Discharge Rate
                </Form.Label>
              <Form.Control
                className="formHeight"
                name="numDischargeRate"
                type="number"
                placeholder="Discharge rate"
                value={VesselBooking.numDischargeRate}
                onChange={(e) => handleChangeTextInput('numDischargeRate', e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-lg-3 col-6">
            <Form.Group>
              <Form.Label className="formFont pl-1">Vessel DWT</Form.Label>
              <Form.Control
                className="formHeight"
                name="numVesselDWT"
                type="number"
                value={VesselBooking.numVesselDWT}
                onChange={(e) => handleChangeTextInput('numVesselDWT', e.target.value)}
                placeholder="Type"
              />
            </Form.Group>
          </div>
          <div className="col-lg-3 col-6 ">
            <Form.Group
              as={Col}
              md="12"
              className="booking-entry-input"
              controlId="validationCustomUsername"
            >
              <Form.Label className="formFont">Add Commision </Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="numAddCommission"
                  placeholder="add commision"
                  aria-describedby="inputGroupPrepend"
                  value={VesselBooking.numAddCommission}
                  onChange={(e) => handleChangeTextInput('numAddCommission', e.target.value)}
                  className="formHeight"
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-lg-3 col-6">
            <Form.Group
              as={Col}
              md="12"
              className="booking-entry-input"
              controlId="validationCustomUsername"
            >
              <Form.Label className="formFont">
                Brokerage Commision{" "}
              </Form.Label>
              <InputGroup className="booking-entry-input">
                <Form.Control
                  type="number"
                  name="numBrockCommission"
                  placeholder="Brokerage Commision"
                  aria-describedby="inputGroupPrepend"
                  value={VesselBooking.numBrockCommission}
                  onChange={(e) => handleChangeTextInput('numBrockCommission', e.target.value)}
                  className="formHeight"
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-3 col-6">
            <Form.Group>
              {/* <Form.Label className="formFont pl-1">Cargo</Form.Label> */}
              <label className="formFont">Cargo</label>
              <RHFInput
                as={<Select options={cargoList} />}
                rules={{ required: false }}
                name="intCargoId"
                register={register}
                value={VesselBooking.cargo}
                onChange={(option) => {
                  handleChangeTextInput('strCargoName', option.label);
                  handleChangeTextInput('intCargoId', option.value)
                }}
                setValue={setValue}
              />
            </Form.Group>
          </div>
          <div className="col-lg-3 col-6">
            <Form.Group>
              <Form.Label className="formFont pl-1">Cargo Qty</Form.Label>
              <Form.Control
                className="formHeight"
                name="intTotalCargoQty"
                type="number"
                value={VesselBooking.intTotalCargoQty}
                onChange={(e) => handleChangeTextInput('intTotalCargoQty', e.target.value)}
                placeholder="Qty"
              />
            </Form.Group>
          </div>
        </div>
        <div className="mt-5">
          <div className="row">
            <div className="float-left booking-text one">
              <h6 className="text-bold">DATE DETAILS</h6>
            </div>
            <div className="float-right booking-text one">
              <hr className="hr-margin"></hr>
            </div>
          </div>
        </div>
        <div className="form-group row mb-1">
          <div className="col-lg-3 col-6">
            <label className="formFont">Laycan start </label>
            <DatePicker
              className="date-picker"
              name="dteLaycanStart"
              dateFormat="MM-dd-yyyy"
              placeholderText="select laycan start date"
              selected={VesselBooking.dteLaycanStart !== '' ? moment(VesselBooking.dteLaycanStart).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteLaycanStart", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="col-lg-3 col-6">
            <label className="formFont">Laycan End</label>
            <DatePicker
              className="date-picker"
              name="dteLaycanEnd"
              dateFormat="MM-dd-yyyy"
              placeholderText="select laycan end date"
              selected={VesselBooking.dteLaycanEnd !== '' ? moment(VesselBooking.dteLaycanEnd).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteLaycanEnd", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="col-lg-3 col-6">
            <label className="formFont">On Hire Date</label>
            <DatePicker
              className="date-picker"
              name="dteOnHireDate"
              dateFormat="MM-dd-yyyy"
              placeholderText="select on hire date"
              selected={VesselBooking.dteOnHireDate !== '' ? moment(VesselBooking.dteOnHireDate).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteOnHireDate", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="col-lg-3 col-6">
            <label className="formFont">Redelivery Date</label>
            <DatePicker
              className="date-picker"
              name="dteRedeliveryDate"
              dateFormat="MM-dd-yyyy"
              placeholderText="select redelivery date"
              selected={VesselBooking.dteRedeliveryDate !== '' ? moment(VesselBooking.dteRedeliveryDate).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteRedeliveryDate", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="col-lg-3 col-6">
            <label className="formFont">C/P Date</label>
            <DatePicker
              className="date-picker"
              name="dteCPDate"
              dateFormat="MM-dd-yyyy"
              placeholderText="select C/P date"
              selected={VesselBooking.dteCPDate !== '' ? moment(VesselBooking.dteCPDate).toDate() : null}
              onChange={(date) => handleChangeTextInput("dteCPDate", date)}
              ref={register({
                required: true,
                maxLength: 100,
              })}
            />
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="col-xl-3 col-lg-3 col-6">
            <label className="formFont">Status</label>
            <RHFInput
              as={<Select options={bookingStatusList} />}
              rules={{ required: false }}
              name="intBookingStatusId"
              register={register}
              value={VesselBooking.bookingStatus}
              onChange={(option) => {
                handleChangeTextInput('strBookingStatus', option.label);
                handleChangeTextInput('intBookingStatusId', option.value)
              }}
              setValue={setValue}
            />
          </div>

        </div>
        <div className="float-right">
          <Button className=" cancelButton" variant="" onClick={() => history.push('/voyage/booking/bookinglist')}>
            Cancel
            </Button>
          {
            !isLoading && (
              <Button className="ml-4 text-white booking-btn" type="submit" variant="primary">
                Book
              </Button>
            )}
          {isLoading && (
            <Button className="ml-4 text-white booking-btn" variant="primary" disabled={true}>
              <span className="p-2"> Booking.... </span>
              <span className="ml-3 spinner spinner-white "></span>
            </Button>
          )}
        </div>
        <div className="clearfix"></div>
      </form>
    </Card.Body>
  </Card>
);
};

export default BookingEdit;
