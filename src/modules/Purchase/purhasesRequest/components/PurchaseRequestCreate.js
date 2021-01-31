import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from 'moment';
import PurchaseRequestCreateTable from './PurchaseRequestCreateTable';

const PurchaseRequestCreate = () => {
  const { register, setValue } = useForm();
  const history = useHistory()

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
    <Card>
      <Card.Body className="pt-5 mt-0">
        <h1 className="tableheading mt-0 pt-0 ">Purchase Request Entry</h1>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="text-bold">BASIC</h6>
          </div>
          <div className="custome-border-design">
          </div>
        </div>
        {/**purchase create form */}
        <form className="form form-label-right voyageEngineerForm" autoComplete="off" >
          {/*****************Basic information ***************/}
          <div className="form-group row mb-1">
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">SBU</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Branch</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Ship Name</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Department</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont"> Due Date</label>
              <DatePicker
                className="date-picker"
                name="dteCommenceDate"
                dateFormat="MM-dd-yyyy"
                minDate={moment().toDate()}
                placeholderText="select commence date"
                // selected={VesselBooking.dteCommenceDate !== '' ? moment(VesselBooking.dteCommenceDate).toDate() : null}
                // onChange={(date) => handleChangeTextInput("dteCommenceDate", date)}
                ref={register({
                  required: true,
                  maxLength: 100,
                })}
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Category</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Reference</label>
              <Form.Control
                className="formHeight"
                name="numFreightOrHireRate"
                type="text"
                // value={VesselBooking.numFreightOrHireRate}
                // onChange={(e) => handleChangeTextInput('numFreightOrHireRate', e.target.value)}
                placeholder="Reference"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Remarks</label>
              <Form.Control
                className="formHeight"
                name="numFreightOrHireRate"
                type="text"
                // value={VesselBooking.numFreightOrHireRate}
                // onChange={(e) => handleChangeTextInput('numFreightOrHireRate', e.target.value)}
                placeholder="Remarks"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6 mt-2">
              <label htmlFor="">Quality Check</label>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check
                  className="forgotPasswordText  "
                  type="checkbox"
                // onChange={(e) =>
                //   certificateMainInfoChange(
                //     "intNotOnBoard",
                //     certificateInfoInput.intNotOnBoard == "0" ? "1" : "0"
                //   )
                // }
                />
              </Form.Group>
            </div>
          </div>
          {/*****************Basic information close***************/}
          {/*****************Details information start***************/}
          <div className="d-flex flex-row">
            <div className="custome-border-left">
              <h6 className="text-bold">Details Information</h6>
            </div>
            <div className="custome-border-design">
            </div>
          </div>

          <div className="form-group row mb-1">
            <div className="col-xl-3 col-lg-3 col-6">
              <Form.Group>
                <label className="formFont">Search by team</label> <br />
                <label className="switch">
                  <input type="checkbox"
                    onChange={(e) => console.log('e :>> ', e)}
                    className="formHeight"
                  // <input type="checkbox" checked={partnerAddress.isDefault ? true : false}
                  // onChange={(option) => handleChangeTextInput("isDefault", partnerAddress.isDefault ? 0 : 1)}
                  ></input>
                  <span className="slider round"></span>
                </label>
              </Form.Group>
            </div>
          </div>

          <div className="form-group row mb-1">
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Item Type</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Item Category</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Item Sub Category</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Item</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipId"
                register={register}
                // onChange={(option) => {
                //   handleChangeTextInput('strShipName', option.label);
                //   handleChangeTextInput('intShipId', option.value)
                // }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Qty</label>
              <Form.Control
                className="formHeight"
                name="numFreightOrHireRate"
                type="text"
                // value={VesselBooking.numFreightOrHireRate}
                // onChange={(e) => handleChangeTextInput('numFreightOrHireRate', e.target.value)}
                placeholder="Qty"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <div className="mt-5">
                <Button className="text-white booking-btn" variant="primary">
                  Book
                </Button>
                <Link >
                  <i class="far fa-file-alt editIcon booking-btn bg-primary text-light ml-3"></i>
                </Link>
              </div>
            </div>

          </div>
          {/*****************Details information closes***************/}
          <hr></hr>
          <PurchaseRequestCreateTable />

          <div className="clearfix"></div>

        </form>
      </Card.Body>
    </Card>
  );
};

export default PurchaseRequestCreate;