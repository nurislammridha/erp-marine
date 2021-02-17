import React from 'react';
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import POFilter from './POFilter';
import moment from "moment"
import SimpleModal from '../../../../master/components/Modal/SimpleModal';
import PODetail from '../detail/PODetail';
import { GetPOApprovalDetail, getPOApprovalList } from '../../_redux/actions/POApprovalAction';


const POList = () => {

  const dispatch = useDispatch();
  const [PODetailsShow, setPODetailsShow] = useState(false)
  const POApprovalListData = useSelector((state) => state.POApprovalFilter.POApprovalList);

 const [POID, setPOID] = useState(null)
  const handleClick = (id) => {
    setPODetailsShow(true)
    dispatch(GetPOApprovalDetail(id));
    setPOID(id);
  }

  useEffect(() => {
    dispatch(getPOApprovalList());
  }, []);

  return (
    <Card>
      <Card.Body>
        <div className="container ">
        <h1 className="tableheading mt-0 ">Purchase Order Approval</h1>
          <div className="row mb-5 table-form">
         
          
            <div className="offset-xl-8 offset-lg-8 col-xl-4 col-lg-4 col-10">
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
                  {
                    POApprovalListData.length > 0 && POApprovalListData.map((item, index) => (
                      <tr>
                        <td>
                          <Form.Check
                            className=""
                            type="checkbox"
                            name="isRevLoadingPorts"
                          // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>{item.strPONo !== null && item.strPONo !== '' ? item.strPONo : ''}</td>
                        <td>{item.dtePODate !== null && item.dtePODate !== '' ? moment(item.dtePODate).format("DD-MM-YYYY") : ''}</td>
                        <td>{item.strSupplierName !== null && item.strSupplierName !== '' ? item.strSupplierName : ''}</td>
                        <td>{item.strRemarks !== null && item.strRemarks !== '' ? item.strRemarks : ''}</td>
                        <td>{item.strCurrencyCode !== null && item.strCurrencyCode !== '' ? item.strCurrencyCode : ''}</td>
                        <td>{item.strCurrencyCode !== null && item.strCurrencyCode !== '' ? item.strCurrencyCode : ''}</td>
                        <td>
                          <button className={item.isApprovedAll === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.isApprovedAll === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                            {item.isApprovedAll !== null && item.isApprovedAll !== '' ? item.isApprovedAll : 'Pending'}
                          </button>
                        </td>
                        {/* intBookingStatusId */}
                        <td>
                          <div className="d-flex">
                            <a onClick={() =>
                              handleClick(item.intPOId)}
                            >
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
        show={PODetailsShow}
        handleClose={() => setPODetailsShow(false)}
        handleShow={() => setPODetailsShow(true)}
        // vesselBookingID={vesselBookingID}
        modalTitle={"Purchase Order Details"}
      >
        <PODetail id={POID} handleClose={() => setPODetailsShow(false)} />
      </SimpleModal>

    </Card >
  );
};

export default POList;