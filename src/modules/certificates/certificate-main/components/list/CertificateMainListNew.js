import React from "react";

import { Form, Card, Button, Row, Col } from "react-bootstrap";
import "./style.css";

import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { InputBase, Paper, IconButton } from "@material-ui/core";

const CertificateMainList = () => {
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
          <div className="row mb-5 table-form ">
            <h1 className="tableheading ">Certificates</h1>
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
                className="certificate-input"
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

            <div className="mt-3">
              <i className="fas fa-filter tableFilter  mr-2"></i>
              <i className="far fa-filter"></i>
              <Button className="btn-sm" variant="primary">
                Add New
              </Button>
            </div>
          </div>
          <div className="react-bootstrap-table table-responsive">
            <table className="table table table-head-custom table-vertical-center user-list-table ">
              <thead>
                {/* <tr>
                      <th scope="col">SI</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Roles</th>
                      <th scope="col">Action</th>
                    </tr> */}
              </thead>
              <tbody>
                <p className="certificate-list-text"> CLASS (2 Items)</p>
                <tr>
                  <td>#01</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>
                    <button className="btn btn-primary btn-sm text-white certificate-lis-btn certificate-done">
                      Done
                    </button>
                  </td>

                  <td>
                    <i className="far fa-edit certificate-edit-icon mt-1 ml-2"></i>
                  </td>
                </tr>
                <tr>
                  <td>#01</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>Super Admin</td>
                  <td>
                    <button className="btn btn-primary btn-sm text-white certificate-lis-btn certificate-due">
                      Due
                    </button>
                  </td>

                  <td>
                    <i className="far fa-edit  mt-1 certificate-edit-icon ml-2"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <Card className="p-5">
        <div className="row justify-content-center">
          <div className="col-3 ml-5">
            <div className="between-thirty due-days">
              <h6 className="pl-5">Due between 30 days </h6>
            </div>
          </div>
          <div className="col-2">
            <div className="between-sixty due-days">
              <h6 className=" ">Due between 60 days </h6>
            </div>
          </div>
          <div className="col-3">
            <div className="between-thirty More-than-sixty due-days ">
              <h6 className="pl-5 text-center">Due more than 60 days </h6>
            </div>
          </div>
          <div className="col-2 mr-5">
            <div className="expired due-days">
              <h6 className="pl-5 ">Expired </h6>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CertificateMainList;
