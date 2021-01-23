import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../_metronic/_assets/css/default-style.css";
import "../../../../styles/global-style.css";

import { Form, Card, Button, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";

const BookingEntry = () => {
  const { register, setValue } = useForm();
  const courseData = [
    {
      id: 1,
      name: "cse",
    },
    {
      id: 1,
      name: "EEE",
    },
    {
      id: 1,
      name: "MBA",
    },
  ];

  let CourseName = [];
  if (courseData) {
    courseData.forEach((item) => {
      let items = {
        value: item.id,
        label: item.name,
      };
      CourseName.push(items);
    });
  }
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Card>
      <Card.Body className="pt-5 mt-0">
        <h1 className="tableheading mt-0 pt-0 ">Booking Entry</h1>
        <hr></hr>
        <form
          className="form form-label-right voyageEngineerForm"
          method="post"
        >
          <div className="form-group row">
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Broker Name</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>

            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Charter Name</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Ship Name</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Voyage Type</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Load Port/ Commence Port</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>
            <div className="col-lg-3 col-6">
              <label className="formFont"> Commence Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>

            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Dischanging/ Completion Port</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>
            <div className="col-lg-3 col-6 completion-date">
              <label className="formFont"> Completion Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-3 col-6">
              <label className="formFont">C/P Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>

            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Freight/ Hire Rate</label>
              <RHFInput
                as={<Select options={CourseName} />}
                rules={{ required: false }}
                name="courseData"
                register={register}
                value={CourseName.label}
                setValue={setValue}
              />
            </div>
            <div className="col-lg-3 col-6">
              <label className="formFont">On Hire Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="col-lg-3 col-6">
              <label className="formFont">Redelivery Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-xl-3 col-lg-3 col-6">
              <Form.Group>
                <Form.Label className="formFont pl-1">Cargo</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="text"
                  placeholder="Type"
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-6">
              <Form.Group>
                <Form.Label className="formFont pl-1">Cargo Qty</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="text"
                  placeholder="Type"
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-6">
              <Form.Group>
                <Form.Label className="formFont pl-1">Vessel DWT</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="text"
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
                    type="text"
                    placeholder="Type"
                    aria-describedby="inputGroupPrepend"
                    required
                    className="formHeight"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="form-group row">
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
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Type"
                    aria-describedby="inputGroupPrepend"
                    required
                    className="formHeight"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-6">
              <Form.Group>
                <Form.Label className="formFont pl-1">Load Rate</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="text"
                  placeholder="Type"
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-6">
              <label className="formFont">Laycan start </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="col-lg-3 col-6">
              <label className="formFont">Laycan End</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="date-picker"
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="col-lg-3 col-6">
              <Form.Group>
                <Form.Label className="formFont pl-1">
                  Discharge Rate
                </Form.Label>
                <Form.Control
                  className="formHeight"
                  type="text"
                  placeholder="Type"
                />
              </Form.Group>
            </div>
          </div>
          <div className="mt-5 float-right">
            <Button className=" cancelButton  " variant="">
              Cancel
            </Button>
            <Button className="ml-4  saveButton text-white " variant="">
              Booking
            </Button>
          </div>
          <div className="clearfix"></div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default BookingEntry;
