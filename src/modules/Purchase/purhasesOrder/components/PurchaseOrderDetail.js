import React from 'react';
import { useSelector } from "react-redux";


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
                            Address
                <h5>{orderViewList.strDeliveryAddress}</h5>
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
                            Ware house
                <h5>{orderViewList.strWarehouseName}</h5>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default PurchaseOrderDetail;
