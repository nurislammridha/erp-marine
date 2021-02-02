import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { InputBase, Paper, IconButton } from "@material-ui/core";
import SimpleModal from "../../../master/components/Modal/SimpleModal";

const QuotationDetails = () => {
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

  const [show, setShow] = useState(false);
  return (
    <>
      <Card>
        <Card.Body className="pt-2">
          <form
            className="form form-label-right voyageEngineerForm"
            method="post"
          >
            <div className="row mb-5 table-form ">
              <h1 className="tableheading font-weight-bold ">
                Quotation Details
              </h1>

              <div className="col-xl-4 col-lg-4 col-md-6 mt-2">
                <Paper className="searchInput supplier-search">
                  <InputBase
                    placeholder="Search"
                    // inputProps={{ "aria-label": "Search Google Maps" }}
                    // onChange={(e) => searchEmployee(e)}
                    // value={employeeInfo.employeeName}
                  />
                  <IconButton
                    aria-label="Search"
                    className="searchPlaceholder supplier-search-placeholder"
                  >
                    <i className="flaticon-search "></i>
                  </IconButton>
                </Paper>
              </div>
            </div>
            <div className="custom-border mt-5 "></div>
            <div className="form-group row mt-3">
              <div className="col-xl-3 col-lg-3 col-md-6 ">
                <Form.Group>
                  <Form.Label className="formFont pl-1">
                    Quotation No
                  </Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Type"
                  />
                </Form.Group>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6">
                <label className="formFont">Supplier</label>
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
                <label className="formFont">Currency</label>
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
          </form>
        </Card.Body>
      </Card>
      <div className="row mt-5">
        <div className="col-xl-8 co-lg-8 col-12">
          <Card>
            <Card.Body className="pt-5">
            <div className="border-top"></div>
              <div className="react-bootstrap-table table-responsive ">
                <table className="table table table-head-custom table-vertical-center voyageTable quotation-table">
                  <thead>
                    <tr>
                      <th scope="col">SL NO</th>

                      <th scope="col">INDENT NO</th>
                      <th scope="col">ITEM ID</th>
                      <th scope="col">ITEM NAME</th>
                      <th scope="col">UOM</th>
                      <th scope="col">REMARKS</th>
                      <th scope="col">RFQ QTY</th>

                      <th scope="col">RATE</th>
                      <th scope="col">TOTAL</th>
                    </tr>
                    <tr>
                      <td>#01</td>
                      <td>2021</td>
                      <td>Container Cargo</td>
                      <td>8567</td>
                      <td>123</td>
                      <td>123</td>
                      <td>Chottogram</td>
                      <td>
                        <span className="border p-1 px-3">100</span>
                      </td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>#01</td>
                      <td>2021</td>
                      <td>Container Cargo</td>
                      <td>8567</td>
                      <td>123</td>
                      <td>123</td>
                      <td>Chottogram</td>
                      <td>
                        {" "}
                        <span className="border p-1 px-3">100</span>
                      </td>
                      <td>100</td>
                    </tr>
                  </thead>
                </table>

                <Button
                  className="mr-4 text-white float-right mt-5"
                  variant="primary"
                >
                  Submit
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 col-12">
          <Card>
            <Card.Body className="pt-3">
            <h6 className="supplier-modal-header mb-2">Supplier Info</h6>
                  <div className="border-bottom"></div>
              <div className="row mt-3 supplier-info">
             
                <div className="col-5">
                 
                  <p>Supplier name</p>
                  <p>Supplier Address</p>
                  <p>Supplier Contact</p>
                  <p>Supplier Email</p>
                </div>
                <div className="col-1">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="col-6">
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default QuotationDetails;
