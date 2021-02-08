import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import DatePicker from "react-datepicker";
import UserModal from "../../../role-permission-management/information/components/UserModal";
import { getBranchList, getSBUlist } from "../../purhasesOrder/_redux/actions/PurhasesOrderAction";
import { getDepartmentList } from "../_redux/action/SupplierCsAction";

const SupplierCs = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const { register, setValue } = useForm();
  const sbuList = useSelector(state => state.purchasesOrderInfo.sbuList);
  const branchList = useSelector(state => state.purchasesOrderInfo.branchList);
  const departmentList = useSelector(state => state.supplierCsInfo.departmentList);
  useEffect(() => {
    dispatch(getSBUlist())
    dispatch(getBranchList())
    dispatch(getDepartmentList())
  }, [])
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
                    as={<Select options={departmentList} />}
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
                    as={<Select options={sbuList} />}
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
                    as={<Select options={branchList} />}
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
            <div className="custom-border mt-5 "></div>


            <div className="react-bootstrap-table table-responsive mt-5">
              <table className="table table table-head-custom table-vertical-center voyageTable supplier-table">
                <thead>
                  <tr>

                    <th scope="col">SL NO</th>
                    <th scope="col">LOCATION</th>
                    <th scope="col">INDENT NO</th>
                    <th scope="col">INDENT DATE</th>
                    <th scope="col">APPROVE DATE</th>
                    <th scope="col">APPROVE BY</th>
                    <th scope="col">DUE DATE</th>

                    <th scope="col">ACTION</th>


                  </tr>
                  <tr>
                    <td>#01</td>
                    <td>2021-01-05 00:00</td>
                    <td>Container Cargo</td>
                    <td>Durres(Durazzo)</td>
                    <td>Akij Noor</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>


                    <td className="mt-3">
                      <Link to="/supplier/details">
                        <i className="far fa-eye viewIcon"></i>
                      </Link>
                      {" "}


                    </td>
                  </tr>
                  <tr>
                    <td>#01</td>
                    <td>2021-01-05 00:00</td>
                    <td>Container Cargo</td>
                    <td>Durres(Durazzo)</td>
                    <td>Akij Noor</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>


                    <td className="mt-3">
                      {" "}
                      <i className="far fa-eye viewIcon"></i>

                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </Card.Body>
      </Card>
      <UserModal show={show} setShow={setShow} />
    </>
  );
};

export default SupplierCs;
