import React from 'react';
import { useSelector } from "react-redux";
import moment from "moment";

const PurchaseOrderDetail = () => {
    const orderViewList = useSelector(state => state.purchasesOrderInfo.orderViewList);
    return (
        <div>
            {orderViewList && (
                <>
                    <div className="row">
                        <div className="col-md-3">
                            Po No
                <h5>{orderViewList.intPOId}</h5>
                        </div>
                        <div className="col-md-3">
                            Business Line
                <h5>{orderViewList.strBusinessLineName}</h5>
                        </div>
                        <div className="col-md-3">
                            Unit
                <h5>{orderViewList.strBusinessUnitName}</h5>
                        </div>
                        <div className="col-md-3">
                            Currrency
                <h5>{orderViewList.strCurrencyCode}</h5>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-3">
                            Terms
                <h5>{orderViewList.strOtherTerms}</h5>
                        </div>
                        <div className="col-md-3">
                            Organization Name
                <h5>{orderViewList.strPurchaseOrganizationName}</h5>
                        </div>
                        <div className="col-md-3">
                            Supplier Name
                <h5>{orderViewList.strSupplierName}</h5>
                        </div>
                        <div className="col-md-3">
                            PO Date
                <h5>{moment(orderViewList.dtePODate).format("YYYY-MM-DD")}</h5>
                        </div>
                    </div>
                    <div className="react-bootstrap-table table-responsive mt-9">
                        <table className="table table table-head-custom table-vertical-center ">
                            <thead>
                                <tr>
                                    <th scope="col">SN</th>
                                    <th scope="col">REFFERENCE</th>
                                    <th scope="col">ITEM NAME</th>
                                    <th scope="col">PURCHASE DESCRIPTION</th>
                                    <th scope="col">QTY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderViewList.purchase_row.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.strReferenceCode}</td>
                                        <td>{item.strItemName}</td>
                                        <td>{item.strPurchaseDescription}</td>
                                        <td>{item.numOrderQty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </>
            )}

        </div>
    );
}

export default PurchaseOrderDetail;
