import React, { useEffect, useState } from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleModal from '../../../master/components/Modal/SimpleModal';
import { getPQListData } from '../_redux/actions/PurhasesRequestAction';
import PaginationLaravel from '../../../master/pagination/PaginationLaravel';
import moment from "moment"
const PurchaseRequestList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.purchaseRequest.isLoading);
  const PQListData = useSelector((state) => state.purchaseRequest.PQListData);
  const PQPaginateData = useSelector((state) => state.purchaseRequest.PQPaginateData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getPQListData(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getPQListData(data.page));
  };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getPQListData(currentPage));
    } else {
      dispatch(getPQListData(currentPage, searchText));
    }
  };
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
                  value={searchText}
                  onChange={searchProduct}
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
                <tbody>
                  {
                    PQListData.length > 0 && PQListData.map((item, index) => (
                      <tr>
                        <td>{item.intPurchaseRequestID !== null && item.intPurchaseRequestID !== '' ? item.intPurchaseRequestID : ''}</td>
                        <td>{item.dtePurchaseRequestDate !== null && item.dtePurchaseRequestDate !== '' ? moment(item.dtePurchaseRequestDate).format("DD-MM-YYYY") : ''}</td>
                        <td>{item.strCategoryName !== null && item.strCategoryName !== '' ? item.strCategoryName : ''}</td>
                        <td>{item.strRemarks !== null && item.strRemarks !== '' ? item.strRemarks : ''}</td>
                        <td>
                          <button className={item.isApprovedAll === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.isApprovedAll === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                            {item.isApprovedAll !== null && item.isApprovedAll !== '' ? item.isApprovedAll : 'Pending'}
                          </button>
                        </td>
                        <td>

                          <div className="d-flex">
                            <Link>
                              <i className="far fa-eye editIcon item-list-icon"></i>
                            </Link>
                            <Link>
                              <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                            </Link>
                            <a href >
                              <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {!isLoading && PQListData.length === 0 && (
                <div className="alert alert-warning mt-5">
                  Sorry ! Vessel Booking List Not Found.
                </div>
              )}
              <PaginationLaravel
                changePage={changePage}
                data={PQPaginateData}
              />
            </div>
          </div>
        </div>

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