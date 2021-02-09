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
import SupplierCSFilter from "./SupplierCSFilter";
import moment from "moment"

const SupplierCs = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const { register, setValue } = useForm();
  const supplierCSInput = useSelector(state => state.supplierCsInfo.supplierCSInput);

  console.log('supplierCSInput :>> ', supplierCSInput);
  const { strDepartmentName, strSBUName, strBranchName, flag1, flag2 } = supplierCSInput;

  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Card >
        <Card.Body className="pt-2">
          <div className="container ">
            <SupplierCSFilter />
            <div className="custom-border mt-5 "></div>
            {supplierCSInput && strDepartmentName.length > 0 && strSBUName.length > 0 && strBranchName.length > 0 && flag1.length > 0 && flag2.length > 0 && (
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
              </>
            )}

          </div>
        </Card.Body>
      </Card>
      <UserModal show={show} setShow={setShow} />
    </>
  );
};

export default SupplierCs;
