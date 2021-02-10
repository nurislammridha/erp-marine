import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import PurchaseOrderDetail from './PurchaseOrderDetail';
import SimpleModal from '../../../master/components/Modal/SimpleModal';
import { PurchaseOrderView } from '../_redux/actions/PurhasesOrderAction';
import moment from "moment";
const PurhasesOrderList = () => {
  const dispatch = useDispatch()
  const [orderDetailsShow, setOrderDetailsShow] = useState(false)
  const purchaseOrderList = useSelector(state => state.purchasesOrderInfo.purchaseOrderList);
  const handleClickView = (id) => {
    setOrderDetailsShow(true);
    dispatch(PurchaseOrderView(id))
  }
  return (
    <>
      <Card >
        <Card.Body>
          {purchaseOrderList && purchaseOrderList.length === 0 && (
            <div class="alert alert-danger" role="alert">
              Sorry! No Data Found.
            </div>
          )}
          {purchaseOrderList && purchaseOrderList.length > 0 && (

            <div className="react-bootstrap-table table-responsive mt-0">
              <table className="table table table-head-custom table-vertical-center  voyageTable">
                <thead>
                  <tr>
                    <th scope="col">PO NO</th>
                    <th scope="col">PO DATE</th>
                    <th scope="col">CURRENCY</th>
                    <th scope="col">SUPPLIER NAME</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrderList.map((item, index) => (
                    <tr>
                      <td>{item.intPOId}</td>
                      <td>{moment(item.dtePODate).format("YYYY-MM-DD")}</td>
                      <td>{item.strCurrencyCode}</td>
                      <td>{item.strSupplierName}</td>
                      <td>
                        <h2 className="btn rejected-status booking-list-btn text-danger">
                          {item.strStatus}
                        </h2>
                      </td>
                      <td>
                        {""}
                        <div className="d-flex">
                          <a href
                            onClick={() => handleClickView(item.intPOId)}
                          >
                            <i className="far fa-eye editIcon item-list-icon"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}

        </Card.Body >
        <SimpleModal
          size="xl"
          show={orderDetailsShow}
          handleClose={() => setOrderDetailsShow(false)}
          handleShow={() => setOrderDetailsShow(true)}
          modalTitle={"Purchase Order Details"}
        >
          <PurchaseOrderDetail />
        </SimpleModal>
      </Card >
    </>
  );
};

export default PurhasesOrderList;