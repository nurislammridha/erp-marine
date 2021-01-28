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
            <div className="col-xl-3 col-lg-3 col-md-6 mb-2">
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
                    <button className="btn btn-primary btn-sm text-white">
                      Done
                    </button>
                  </td>

                  <td>
                    <i className="far fa-edit editIcon mt-1"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CertificateMainList;
