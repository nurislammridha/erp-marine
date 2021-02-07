import React, { useEffect, useState } from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleModal from '../../../master/components/Modal/SimpleModal';
import { getPRListData } from '../_redux/actions/PurhasesRequestAction';
import PaginationLaravel from '../../../master/pagination/PaginationLaravel';
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";

import moment from "moment"
import PurchaseRequestDetails from './PurchaseRequestDetails';
const PurchaseRequestList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.purchaseRequest.isLoading);
  const PRListData = useSelector((state) => state.purchaseRequest.PRListData);
  const PRPaginateData = useSelector((state) => state.purchaseRequest.PRPaginateData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [PRDetailsShow, setPRDetailsShow] = useState(false)
  const [PRDetailsID, setPRDetailsID] = useState(null)
  const [status, setStatus] = useState()

  useEffect(() => {
    dispatch(getPRListData(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getPRListData(data.page));
  };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getPRListData(currentPage));
    } else {
      dispatch(getPRListData(currentPage, searchText));
    }
  };
  const handleShowPQDetails = (item) => {
    setPRDetailsID(item.intPurchaseRequestID);
    setPRDetailsShow(true);
    setStatus(item.strStatus)
  }
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
          {isLoading && <LoadingSpinner text="Loading Purchase Request List..." />}
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
                    PRListData.length > 0 && PRListData.map((item, index) => (
                      <tr>
                        <td>{item.intPurchaseRequestID !== null && item.intPurchaseRequestID !== '' ? item.intPurchaseRequestID : ''}</td>
                        <td>{item.dtePurchaseRequestDate !== null && item.dtePurchaseRequestDate !== '' ? moment(item.dtePurchaseRequestDate).format("DD-MM-YYYY") : ''}</td>
                        <td>{item.strCategoryName !== null && item.strCategoryName !== '' ? item.strCategoryName : ''}</td>
                        <td>{item.strRemarks !== null && item.strRemarks !== '' ? item.strRemarks : ''}</td>
                        <td>
                          {
                            item.strStatus === 'Approved' ? <button className="btn approve-status booking-list-btn text-success">Approved</button>
                              :
                              <button className={item.strStatus === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.strStatus === "Pending" ? "btn pending-status booking-list-btn text-warning" : (item.strStatus === "Approve" ? "btn approve-status booking-list-btn text-success" : ''))}>
                                {item.strStatus !== null && item.strStatus !== '' ? item.strStatus : ''}
                              </button>
                          }

                        </td>
                        <td className="text-center">

                          <div className="d-flex">
                            <Link onClick={() => handleShowPQDetails(item)}>
                              <i className="far fa-eye editIcon item-list-icon"></i>
                            </Link>
                            {/* <Link>
                              <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                            </Link>
                            <a href >
                              <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                            </a> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {!isLoading && PRListData.length === 0 && (
                <div className="alert alert-warning mt-5">
                  Sorry ! Purchase Request List Not Found.
                </div>
              )}
              <PaginationLaravel
                changePage={changePage}
                data={PRPaginateData}
              />
            </div>
          </div>
        </div>

      </Card.Body >
      <SimpleModal
        size="lg"
        status={status}
        show={PRDetailsShow}
        handleClose={() => setPRDetailsShow(false)}
        handleShow={() => setPRDetailsShow(true)}
        PRDetailsID={PRDetailsID}
        modalTitle={"Purchase Request Details"}
      >
        <PurchaseRequestDetails handleClose={() => setPRDetailsShow(false)} PRDetailsID={PRDetailsID} />
      </SimpleModal>
    </Card >
  );
};

export default PurchaseRequestList;