import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import SimpleModal from "../../../master/components/Modal/SimpleModal";

import { Link } from "react-router-dom";
import SupplierRFQ from "./SuplierRFQ";

const SupplierCsDetails = () => {
  const { register, setValue } = useForm();
  const supplierDetailsList = useSelector(state => state.supplierCsInfo.supplierDetailsList);
  console.log('supplierDetailsList :>> ', supplierDetailsList);
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
          <div className="container ">
            <form
              className="form form-label-right voyageEngineerForm"
              method="post"
            >
              <div className="row mb-5 table-form ">
                <h1 className="tableheading font-weight-bold ">
                  Supplier CS Details
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
            </form>
            <div className="row mt-5 mb-5">
              <div className="col-3">
                <h6 className="supplier-detail-text">Indent Date</h6>
                <h5 className="supplier-detail-date">01/06/2021</h5>
              </div>
              <div className="col-3">
                <h6 className="supplier-detail-text">Due Date</h6>
                <h5 className="supplier-detail-date">01/06/2021</h5>
              </div>
              <div className="col-3">
                <h6 className="supplier-detail-text">Approved By</h6>
                <h5 className="supplier-detail-date">01/06/2021</h5>
              </div>
              <div className="col-3">
                <h6 className="supplier-detail-text">Approved Date</h6>
                <h5 className="supplier-detail-date">01/06/2021</h5>
              </div>
            </div>

            <div className="border-bottom p-0 "></div>

            <div className="react-bootstrap-table table-responsive mt-5">
              <table className="table table table-head-custom table-vertical-center voyageTable supplier-table">
                <thead>
                  <tr>
                    <th scope="col">SL NO</th>

                    <th scope="col">INDENT NO</th>
                    <th scope="col">ITEM ID</th>
                    <th scope="col">UOM</th>
                    <th scope="col">HS CODE</th>
                    <th scope="col">PURPOSE</th>

                    <th scope="col">CURRENT STOCK</th>
                    <th scope="col">INDENT QTY</th>
                    <th scope="col">PO ISSUE</th>
                    <th scope="col">RFQ QTY</th>
                    <th scope="col">REMARKS</th>
                    <th scope="col">ACTION</th>
                  </tr>
                  <tr>
                    <td>#01</td>
                    <td>2021</td>
                    <td>Container Cargo</td>
                    <td>8567</td>
                    <td>123</td>
                    <td>123</td>
                    <td>Chottogram</td>
                    <td>100</td>
                    <td>100</td>
                    <td>100</td>
                    <td>Chottogram</td>

                    <td className="mt-3">
                      {" "}
                      <i className="fas fa-trash-alt viewIcon"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>#01</td>
                    <td>2021</td>
                    <td>Container Cargo</td>
                    <td>8567</td>
                    <td>123</td>
                    <td>123</td>
                    <td>Chottogram</td>
                    <td>100</td>
                    <td>100</td>
                    <td>100</td>
                    <td>Chottogram</td>

                    <td className="mt-3">
                      {" "}
                      <i className="fas fa-trash-alt viewIcon"></i>
                    </td>
                  </tr>
                </thead>
              </table>

              <Button
                className="mr-4 text-white float-right mt-5"
                variant="primary"
                onClick={() => setShow(true)}
              >
                Prepare RFQ
              </Button>
            </div>
            <SimpleModal
              size="xl"
              show={show}
              handleClose={() => setShow(false)}
              handleShow={() => setShow(true)}
              modalTitle={"Details"}
            >
              <SupplierRFQ />
            </SimpleModal>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SupplierCsDetails;
