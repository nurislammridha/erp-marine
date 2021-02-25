import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";

const AdminInformation = () => {
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
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b pl-5 pr-5 mb-1 card-top-border">
              <div className="mt-5">
                <h3 className="mb-0 pb-0">Admin Information</h3>
              </div>
              <hr></hr>
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Supplier Name</label>
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
                    <Form.Group>
                      <Form.Label className="formFont">PO Number</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">PO Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="date-picker"
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Waranty Expiry Date</label>
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
                    <label className="formFont">Date Of Installation</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="date-picker"
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Asset Location</label>
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
                    <label className="formFont">Depriciation Run Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="date-picker"
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Rate of Depriciation</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Country</label>
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
                    <Form.Group>
                      <Form.Label className="formFont">Name Of Manufacture</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Manufacture Provice SL NO</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Model No</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">LC Number</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Others</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Rated Capacity</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Recommand Life</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Reamrks</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="mt-5 float-right pb-5">
                  <Button className="saveButton text-white" variant="">
                    Submit
                  </Button>
                </div>
                <div className="clear-fix" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminInformation;
