import * as React from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useState } from "react";

import Checkbox from "react-custom-checkbox";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import DatePicker from "react-datepicker";

const SupplierCs = () => {
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
      <Card >
        <Card.Body className="pt-2">
        <div className="container ">
        <form
            className="form form-label-right voyageEngineerForm"
            method="post"
          >
          <div className="row mb-5 table-form ">
          
            <h1 className="tableheading font-weight-bold ">comparative statement</h1>
           
            <div className="col-xl-4 col-lg-4 col-md-6 mt-2">
              
              <Paper className="searchInput supplier-search">
               
                <InputBase
                  placeholder="Search"
                  // inputProps={{ "aria-label": "Search Google Maps" }}
                  // onChange={(e) => searchEmployee(e)}
                  // value={employeeInfo.employeeName}
                />
                 <IconButton aria-label="Search" className="searchPlaceholder supplier-search-placeholder">
                  <i className="flaticon-search "></i>
                </IconButton>
              </Paper>
            </div>
            </div>
         <div className="border-bottom p-0 "></div>
            <div className="form-group row mt-3">
              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <label className="formFont">Department</label>
                <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <label className="formFont">SBU</label>
                <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <label className="formFont">Branch</label>
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
              <label className="formFont">From Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="date-picker"
                />
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>
            <div className="form-group row">
            <div className="col-xl-3 col-lg-3 col-md-6">
              <label className="formFont">To Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="date-picker"
                />
                <i className="fas fa-calendar-alt"></i>
              </div>
              </div>
            </form>
            </div>
            </Card.Body>
            </Card>
            </>
  );
};

export default SupplierCs;
