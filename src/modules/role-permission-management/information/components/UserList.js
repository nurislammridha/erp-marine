import React, { useState } from "react";
import {  Card, Button } from "react-bootstrap";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import UserModal from "./UserModal";
const UserList = () => {
  const [show, setShow] = useState(false);
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
  return (
    <>
     <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form ">
            <h1 className="tableheading mt-0">User List</h1>
            <div className="col-xl-3 col-lg-3 col-md-6 mb-2 mt-2">
            
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
            <div className="col-xl-3 col-lg-3 col-md-6">
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
            <RHFInput
                  as={<Select options={CourseName} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={CourseName.label}
                  setValue={setValue}
                />
            </div>
            {/* <div className="col-xl-3 col-lg-3 col-md-6">use RHFInput</div> */}

            <div className="">
              <i className="fas fa-filter tableFilter  mr-2"></i>
              <i className="far fa-filter"></i>
              <Button className="btn-sm" variant="primary">
                Add New
              </Button>
            </div>
          </div>
       </div>
       </Card.Body>
       </Card>
      <UserModal show={show} setShow={setShow} />
    </>
  );
};

export default UserList;
