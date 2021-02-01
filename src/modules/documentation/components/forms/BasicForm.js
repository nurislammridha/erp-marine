import * as React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useState } from "react";

import Checkbox from "react-custom-checkbox";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import DatePicker from "react-datepicker";

const BasicForm = () => {
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
      <Card>
        <Card.Body>
          <form
            className="form form-label-right voyageEngineerForm"
            method="post"
          >
            <div className="form-group row">
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Input</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Type"
                  />
                </Form.Group>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Date</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="date"
                    placeholder="Type"
                  />
                </Form.Group>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Time</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="time"
                    placeholder="Type"
                  />
                </Form.Group>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="formFont pl-1">
                    Example select
                  </Form.Label>
                  <Form.Control className="formSelect" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>

            {/* <Form.Group className="mt-3" controlId="formBasicChecbox">
                <Form.Check type="checkbox" />
              </Form.Group>

              <Form.Check className="mt-3" type="radio" aria-label="radio 1" /> */}
            {/* 
              <div className="col-xl-4 col-lg-4 col-md-6 ">
                <Form.Group as={Row} controlId="">
                  <Form.Label className="formFont pl-1" column sm="3">
                    Password
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      className="formHeight"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </Form.Group>
              </div> */}
            {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="formFont pl-1">
                  Example textarea
                </Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group> */}
            <div className="form-group row">
              <div className="col-xl-3 col-lg-3 col-md-6">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Search</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="search"
                    placeholder="Search"
                  />
                </Form.Group>
              </div>
              {/* <div className="">
                <Form.Group as={Col} md="" controlId="">
                  <Form.Label className="formFont">Pic an image</Form.Label>
                  <InputGroup className="custome-inputfile">
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        id="inputGroupPrepend"
                        className="formHeight"
                      >
                        <p className="chooseFileText">Choose File</p>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="file"
                      placeholder="No file chosen"
                      aria-describedby="inputGroupPrepend"
                      required
                      className="bg-white fileInput formHeight "
                    />
                    <Form.Control.Feedback type="invalid" className="bg-white">
                      No file chosen
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div> */}
              <div className="col-lg-3 col-md-6 mb-2">
                <label className="formFont">Pic an image</label>
                <div className="custom-file formHeight">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                  />
                  <label className="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6">
                <label className="formFont">Select Course</label>
                <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6">
                <label className="formFont">Select Course</label>
                <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6">
                <label className="formFont">Custome Searchbar</label>
                <Paper className="searchInput">
                  <IconButton aria-label="Search" className="searchPlaceholder">
                    <i className="flaticon-search "></i>
                  </IconButton>
                  <InputBase
                    placeholder="Search Employee Here"
                    // inputProps={{ "aria-label": "Search Google Maps" }}
                    // onChange={(e) => searchEmployee(e)}
                    // value={employeeInfo.employeeName}
                  />
                </Paper>
              </div>
              <div className="col-lg-3 col-md-6">
                <label className="formFont">Custome Datepicker</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="date-picker"
                />
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>
            <Form.Check className="mt-3" type="radio" aria-label="radio 1" />
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Checkbox
              // icon={<Icon.FiCheck color="#174A41" size={14} />}
              name="my-input"
              checked={false}
              onChange={(value) => {
                let p = {
                  isTrue: value,
                };
                return alert(value);
              }}
              borderColor="#fff"
              style={{ cursor: "pointer", backgroundColor: "#E5E5E5" }}
              labelStyle={{ marginLeft: 5, userSelect: "none" }}
              label="custome checkbox"
            />

            <div className="mt-5 float-right">
              <Button className="mr-4  saveButton text-white" variant="">
                Submit
              </Button>
              <Button className=" cancelButton " variant="">
                Cancel
              </Button>
            </div>
            <div className="clearfix"></div>
           
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default BasicForm;
