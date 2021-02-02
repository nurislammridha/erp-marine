import React from 'react';
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Card } from 'react-bootstrap';
import PurchaseApprovalFilter from './PurchaseApprovalFilter';
import SimpleModal from '../../../../master/components/Modal/SimpleModal';
import RequisitionApprovalDetail from '../detail/RequisitionApprovalDetail';


const PurchaseApprovalList = () => {

  const [requisitionDetailsShow, setRequisitionDetailsShow] = useState(false)
  const showModal = () => {
    setRequisitionDetailsShow(true)
  }

  return (
    <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form">
            <h1 className="tableheading mt-0 ">Purchase Approval</h1>
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
          <PurchaseApprovalFilter />
          <hr />
          {/* {isLoading && <LoadingSpinner text="Loading Vessel Booking List..." />} */}
          <div className="row">
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th scope="col">REQUISITION NO</th>
                    <th scope="col">REQUISITION DATE</th>
                    <th scope="col">REQUISITION CATEGORY</th>
                    <th scope="col">REAMRKS</th>
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
        show={requisitionDetailsShow}
        handleClose={() => setRequisitionDetailsShow(false)}
        handleShow={() => setRequisitionDetailsShow(true)}
        // vesselBookingID={vesselBookingID}
        modalTitle={"Requisition Approval Details"}
      >
        <RequisitionApprovalDetail />
      </SimpleModal>

    </Card >
  );
};

export default PurchaseApprovalList;