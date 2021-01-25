import React, { useEffect, useState } from "react";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import TableCircularProgressBar from "../../../master/components/CircularProgressBar/TableCircularProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { getVesselBookingList } from "../_redux/actions/VesselBookingAddAction";
import moment from "moment";
import { Link } from "react-router-dom";
const BookingList = () => {
  const dispatch = useDispatch();
  const VesselBookingList = useSelector((state) => state.VesselBookingReducer.VesselBookingList);
  console.log('VesselBookingList :>> ', VesselBookingList);

  useEffect(() => {
    dispatch(getVesselBookingList())
  }, [])

  return (
    <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form ">
            <h1 className="tableheading mt-0 ">Booking List</h1>

            <hr></hr>
            <div className="col-xl-4 col-lg-4 col-5 mb-2">
              <Paper className="searchInput">
                <IconButton aria-label="Search" className="searchPlaceholder">
                  <i className="flaticon-search "></i>
                </IconButton>
                <InputBase
                  placeholder="Search "
                // inputProps={{ "aria-label": "Search Google Maps" }}
                // onChange={(e) => searchEmployee(e)}
                // value={employeeInfo.employeeName}
                />
              </Paper>
            </div>
            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0"></div> */}

            <div>
              <Link to="/voyage/booking/bookingentry">
                <Button className="btn-sm" variant="primary">
                  Add New
              </Button>
              </Link>

            </div>
          </div>
          <div className="row">
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th scope="col">SL No</th>
                    <th scope="col">CHARTER NAME</th>
                    <th scope="col">SHIP NAME</th>
                    <th scope="col">VOYAGE TYPE</th>
                    <th scope="col">COMMENCE PORT</th>
                    <th scope="col">COMMENCE DATE</th>
                    <th scope="col">COMPLETION PORT</th>
                    <th scope="col">COMPLETION DATE</th>
                    <th scope="col">VESSEL DWT</th>
                    <th scope="col">ON HIRE DATE</th>
                    <th scope="col">FREIGHT DATE</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    VesselBookingList.length > 0 && VesselBookingList.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.strCargoName !== null && item.strCargoName !== '' ? item.strCargoName : ''}</td>
                        <td>{item.strShipName !== null && item.strShipName !== '' ? item.strShipName : ''}</td>
                        <td>{item.strVoyageNo !== null && item.strVoyageNo !== '' ? item.strVoyageNo : ''}</td>
                        <td>{item.strCommencePortName !== null && item.strCommencePortName !== '' ? item.strCommencePortName : ''}</td>
                        <td>{item.dteCommenceDate !== null && item.dteCommenceDate !== '' ? moment(item.dteCommenceDate).format("DD-MM-YYYY") : ''}</td>
                        <td>{item.strCompletionPortName !== null && item.strCompletionPortName !== '' ? item.strCompletionPortName : ''}</td>
                        <td>{item.dteCompletionDate !== null && item.dteCompletionDate !== '' ? moment(item.dteCompletionDate).format("DD-MM-YYYY") : ''}</td>
                        <td>{item.strCommencePortName !== null && item.strCommencePortName !== '' ? item.strCommencePortName : ''}</td>
                        <td>{item.strCommencePortName !== null && item.strCommencePortName !== '' ? item.strCommencePortName : ''}</td>
                        <td>{item.numFreightOrHireRate !== null && item.numFreightOrHireRate !== '' ? item.numFreightOrHireRate : ''}</td>
                        <td>
                          <button className="btn approve booking-list-btn text-warning">
                            Pending
                      </button>
                        </td>

                        <td className="mt-3">
                          {" "}
                          <i className="far fa-edit editIcon item-list-icon cursor-pointer"></i>
                          <i className="fas fa-trash-alt editIcon item-list-icon ml-2 cursor-pointer"></i>
                        </td>
                      </tr>
                    ))
                  }
                  {/* <tr>
                    <td>#01</td>
                    <td>2021-01-05 00:00</td>
                    <td>Container Cargo</td>
                    <td>Durres(Durazzo)</td>
                    <td>Akij Noor</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>
                    <td>Chottogram</td>

                    <td>
                      <button className="btn approve booking-list-btn text-warning">
                        Pending
                      </button>
                    </td>

                    <td className="mt-3">
                      {" "}
                      <i className="far fa-edit editIcon item-list-icon"></i>
                      <i className="fas fa-trash-alt editIcon item-list-icon ml-2 "></i>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  */}
      </Card.Body>
    </Card>
  );
};

export default BookingList;
