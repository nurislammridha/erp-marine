import { IconButton, InputBase, Paper } from '@material-ui/core';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleModal from '../../../master/components/Modal/SimpleModal';

const PurchaseRequestList = () => {
  return (
    <Card>
      <Card.Body>
        <div className="container ">
          <div className="row mb-5 table-form">
            <h1 className="tableheading mt-0 ">Purchase Request</h1>

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
            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-0"></div> */}

            <div>
              <Link to="/purchase/request/create">
                <Button className="btn-sm" variant="primary">
                  New Requisition
            </Button>
              </Link>

            </div>
          </div>
          {/* {isLoading && <LoadingSpinner text="Loading Vessel Booking List..." />} */}
          <div className="row">
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th scope="col">REQUEST NO</th>
                    <th scope="col">REQUEST DATE</th>
                    <th scope="col">REQUEST CATEGORY</th>
                    <th scope="col">REMARKS</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {
                    VesselBookingList.length > 0 && VesselBookingList.map((item, index) => (
                      <tr>
                        <td onClick={(id) => getVesselBookingID(item)}>{vesselPaginateData.from + index}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCargoName !== null && item.strCargoName !== '' ? item.strCargoName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strShipName !== null && item.strShipName !== '' ? item.strShipName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strVoyageNo !== null && item.strVoyageNo !== '' ? item.strVoyageNo : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>
                          <button className={item.strBookingStatus === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.strBookingStatus === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                            {item.strBookingStatus !== null && item.strBookingStatus !== '' ? item.strBookingStatus : ''}
                          </button>
                        </td>
                        {/* intBookingStatusId */}
                {/* <td>
                  {/* {""} */}
                {/*}  <div className="d-flex">
                    <Link onClick={(id) => getVesselBookingID(item)}>
                      <i className="far fa-eye editIcon item-list-icon"></i>
                    </Link>
                    <Link to={`/voyage/booking/bookingEdit/${item.intShipBookingId}`}>
                      <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                    </Link>
                    <a href onClick={() => deleteVesselBookDetails(item.intShipBookingId)} >
                      <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                    </a>
                  </div>
                </td>
                      </tr>
                    ))
                  }
                </tbody>  */}
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
        // show={bookDetailShow}
        // handleClose={() => setBookDetailShow(false)}
        // handleShow={() => setBookDetailShow(true)}
        // vesselBookingID={vesselBookingID}
        modalTitle={"Vessel Booking Details"}
      >
        {/* <VesselBookingDetails handleClose={() => setBookDetailShow(false)} vesselBookingID={vesselBookingID} /> */}
      </SimpleModal>
    </Card >
  );
};

export default PurchaseRequestList;