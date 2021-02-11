import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import DatePicker from "react-datepicker";
import UserModal from "../../../role-permission-management/information/components/UserModal";
import { getBranchList, getSBUlist } from "../../purhasesOrder/_redux/actions/PurhasesOrderAction";
import { getDepartmentList, getSupplierCSDetails } from "../_redux/action/SupplierCsAction";
import SupplierCSFilter from "./SupplierCSFilter";
import moment from "moment"
import SupplierCsDetails from "./SupplierCsDetails";

const SupplierCs = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const { register, setValue } = useForm();
  const supplierCSInput = useSelector(state => state.supplierCsInfo.supplierCSInput);
  const search = useSelector(state => state.supplierCsInfo.search);
  const supplierList = useSelector(state => state.supplierCsInfo.supplierList);
  const { strDepartmentName, strSBUName, strBranchName, flag1, flag2 } = supplierCSInput;
  console.log('supplierList :>> ', supplierList);
  console.log('search n:>> ', search);
  const [startDate, setStartDate] = useState(new Date());
  const SupplierDetailsId = (id) => {
    history.push(`/supplier/details/${id}`)
    dispatch(getSupplierCSDetails(id))
  }
  return (
    <>
      <Card >
        <Card.Body className="pt-2">
          <div className="container ">
            <SupplierCSFilter />
            <div className="custom-border mt-5 "></div>
            {/* {supplierCSInput && strDepartmentName.length > 0 && strSBUName.length > 0 && strBranchName.length > 0 && flag1.length > 0 && flag2.length > 0 && ( */}
            {supplierList === "" && (
              <div class="alert alert-primary mt-9" role="alert">
                Please Select All Input to find Data
              </div>
            )}
            {supplierList === undefined && (
              <div class="alert alert-success mt-9" role="alert">
                Select Or Search to find Data
              </div>
            )}
            {supplierList === null && (
              <div className="alert alert-danger mt-9" role="alert">
                Sorry No Data Found...
              </div>
            )}
            {supplierList && supplierList.length === 0 && (
              <div className="alert alert-danger mt-9" role="alert">
                Sorry No Data Found...
              </div>
            )}

            {supplierList && supplierList.length > 0 && (
              <>
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
                    </thead>
                    <tbody>
                      {supplierList.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>Dhaka</td>
                          <td>{item.intPurchaseRequestId}</td>
                          <td>{moment(item.dteServerDateTime).format("YYYY-MM-DD")}</td>
                          <td>{moment(item.dteLastActionDateTime).format("YYYY-MM-DD")}</td>
                          <td>{item.strApprovedByFinance}</td>
                          <td>{item.strApprovedByOffice}</td>


                          <td className="mt-3">

                            {/* <Link to="/supplier/details/${item.intPurchaseRequestID}">
                              <i className="far fa-eye viewIcon"></i>
                            </Link> */}
                            <a href
                              onClick={() => SupplierDetailsId(item.intPurchaseRequestID)}
                            >
                              <i className="far fa-eye viewIcon"></i>
                            </a>
                            {" "}


                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </>
            )}
            {/* {search && search.length > 0 && (
              <>
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
                        <td>By Search</td>
                        <td>Chottogram</td>
                        <td>Chottogram</td>
                        <td className="mt-3">
                          <Link to="/supplier/details">
                            <i className="far fa-eye viewIcon"></i>
                          </Link>
                          {" "}
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </>
            )} */}
          </div>
        </Card.Body>
      </Card>
      <UserModal show={show} setShow={setShow} />
    </>
  );
};

export default SupplierCs;
