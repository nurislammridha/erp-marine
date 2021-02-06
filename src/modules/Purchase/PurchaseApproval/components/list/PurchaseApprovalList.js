import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form } from "react-bootstrap";
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Card } from 'react-bootstrap';
import moment from "moment"
import PurchaseApprovalFilter from './PurchaseApprovalFilter';
import SimpleModal from '../../../../master/components/Modal/SimpleModal';
import RequisitionApprovalDetail from '../detail/RequisitionApprovalDetail';
import { GetPurchaseApprovalDetail, getPurchaseApprovalList } from '../../_redux/actions/PurchaseApprovalAction';



const PurchaseApprovalList = () => {
  const dispatch = useDispatch();
  const purchaseApprovalListData = useSelector((state) => state.purchaseApprovalFilter.purchaseApprovalList);
  const [requisitionDetailsShow, setRequisitionDetailsShow] = useState(false)

  const handleClick = (id) => {
    setRequisitionDetailsShow(true);
    dispatch(GetPurchaseApprovalDetail(id));
  }


  useEffect(() => {
    dispatch(getPurchaseApprovalList());
  }, []);

  return (
    <Card  >
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


                  {
                    purchaseApprovalListData.length > 0 && purchaseApprovalListData.map((item, index) => (
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
                        <td className="text-center">

                          <div className="d-flex">
                            <a onClick={() =>
                              handleClick(item.intPurchaseRequestID)
                            }>
                              <i className="far fa-eye editIcon item-list-icon"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
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
        modalTitle={"Requisition Approval Details"}
      >
        <RequisitionApprovalDetail handleClose={() => setRequisitionDetailsShow(false)} />
      </SimpleModal>

    </Card >
  );
};

export default PurchaseApprovalList;