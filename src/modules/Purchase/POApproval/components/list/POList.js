import React from 'react';
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import POFilter from './POFilter';
import SimpleModal from '../../../../master/components/Modal/SimpleModal';
import PODetail from '../detail/PODetail';


const POList = () => {

  const [PODetailsShow, setPODetailsShow] = useState(false)
  const showModal = () => {
    setPODetailsShow(true)
  }

  return (
    <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form">
            <h1 className="tableheading mt-0 ">Purchase Order Approval</h1>
            <hr></hr>
            <div className="col-xl-4 col-lg-4 col-5">
              <Paper className="searchInput">
                <InputBase
                  className="custome-purchase-search"
                  placeholder="Search "
                // value={searchText}
                // onChange={searchProduct}
                />
                <IconButton aria-label="Search" className="searchPlaceholder purchaseSearch">
                  <i className="flaticon-search "></i>
                </IconButton>
              </Paper>
            </div>
          </div>
          <hr />
          <POFilter />
          <hr />
          {/* {isLoading && <LoadingSpinner text="Loading Vessel Booking List..." />} */}
          <div className="row">
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        className=""
                        type="checkbox"
                        name="isRevLoadingPorts"
                      // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                      />
                    </th>
                    <th scope="col">SL NO</th>
                    <th scope="col">PO NO</th>
                    <th scope="col">PO DATE</th>
                    <th scope="col">SUPPLIER NAME</th>
                    <th scope="col">PO AMOUNT</th>
                    <th scope="col">CURRENCY</th>
                    <th scope="col">PO ISSUER</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>


                  <tr>
                    {/* <td onClick={(id) => getVesselBookingID(item)}>{vesselPaginateData.from + index}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCargoName !== null && item.strCargoName !== '' ? item.strCargoName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strShipName !== null && item.strShipName !== '' ? item.strShipName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strVoyageNo !== null && item.strVoyageNo !== '' ? item.strVoyageNo : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>
                          <button className={item.strBookingStatus === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.strBookingStatus === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                            {item.strBookingStatus !== null && item.strBookingStatus !== '' ? item.strBookingStatus : ''}
                          </button>
                        </td> */}
                    <td>
                      <Form.Check
                        className=""
                        type="checkbox"
                        name="isRevLoadingPorts"
                      // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                      />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* intBookingStatusId */}
                    <td>
                      <div className="d-flex">
                        <a onClick={() => showModal()}>
                          <i className="far fa-eye editIcon item-list-icon"></i>
                        </a>
                      </div>
                    </td>
                  </tr>


                </tbody>
              </table>
              {/* {!isLoading && VesselBookingList.length === 0 && (
              <div className="alert alert-warning mt-5">
                Sorry ! Vessel Booking List Not Found.
              </div>
            )} */}
              {/* <PaginationLaravel
              changePage={changePage}
              data={vesselPaginateData}
            /> */}
            </div>
          </div>
        </div>
        {/*  */}
      </Card.Body >
      <SimpleModal
        size="xl"
        // status={status}
        show={PODetailsShow}
        handleClose={() => setPODetailsShow(false)}
        handleShow={() => setPODetailsShow(true)}
        // vesselBookingID={vesselBookingID}
        modalTitle={"Purchase Order Details"}
      >
        <PODetail />
      </SimpleModal>

    </Card >
  );
};

export default POList;