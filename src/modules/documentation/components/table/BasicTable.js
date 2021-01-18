import React, { useEffect, useState } from "react";

import { Form, Card, Button, Row, Col } from "react-bootstrap";
import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";

import TableCircularProgressBar from "../../../master/components/CircularProgressBar/TableCircularProgressBar";

const BasicTable = () => {
  return (
    <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form ">
            <h1 className="tableheading ">Voyage List</h1>
            <div className="col-xl-3 col-lg-3 col-md-6 mb-2">
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
            {/* <div className="col-xl-3 col-lg-3 col-md-6">use RHFInput</div> */}

            <div className="mt-3">
              <i className="fas fa-filter tableFilter mt-3 mr-2"></i>
              <i className="far fa-filter"></i>
              <Button className="btn-sm" variant="primary">
                Add New
              </Button>
            </div>
          </div>
          <div className="row">
            {/* <table className="table mt-5 voyageTable table-responsive"> */}
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th scope="col">
                      {" "}
                      <Form.Check type="checkbox" />
                    </th>

                    <th scope="col">Voyage No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Port Name</th>
                    <th scope="col">Vessel Name</th>
                    <th scope="col">Comencement</th>
                    <th scope="col">Diagram</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {" "}
                      <Form.Check type="checkbox" />
                    </th>
                    <td>#01</td>
                    <td>2021-01-05 00:00</td>
                    <td>Container Cargo</td>
                    <td>Durres(Durazzo)</td>
                    <td>Akij Noor</td>
                    <td>Chottogram</td>
                    <td>
                      {" "}
                      <TableCircularProgressBar />
                    </td>
                    <td>
                      <button className="btn approve">Approved</button>
                    </td>

                    <td className="mt-3">
                      {" "}
                      <i className="far fa-edit editIcon"></i>
                      <i className="fas fa-trash-alt editIcon ml-4"></i>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {" "}
                      <Form.Check type="checkbox" />
                    </th>
                    <td>#01</td>
                    <td>2021-01-05 00:00</td>
                    <td>Container Cargo</td>
                    <td>Durres(Durazzo)</td>
                    <td>Akij Noor</td>
                    <td>Chottogram</td>
                    <td>
                      {" "}
                      <TableCircularProgressBar />
                    </td>
                    <td>
                      <button className="btn approve">Approved</button>
                    </td>

                    <td className="mt-3">
                      {" "}
                      <i className="far fa-edit editIcon"></i>
                      <i className="fas fa-trash-alt editIcon ml-4"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  */}
        <h4 className="mt-5">Normal table</h4>
        <div className="react-bootstrap-table table-responsive">
          <table className="table table table-head-custom table-vertical-center voyageTable">
            <thead>
              <tr>
                <th tabindex="0">
                  {" "}
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" />
                  </Form.Group>
                </th>
                <th>SL</th>
                <th> Name</th>
                <th> Code</th>

                <th class="text-right pr-3">Actions</th>
              </tr>
              <tr>
                <th scope="row">
                  {" "}
                  <Form.Check type="checkbox" />
                </th>
                <td>#01</td>

                <td>Durres(Durazzo)</td>
                <td>Akij Noor</td>

                <td className="text-right pr-3 mt-3">
                  {" "}
                  <i className="far fa-edit editIcon"></i>
                  <i className="fas fa-trash-alt editIcon ml-4"></i>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BasicTable;
