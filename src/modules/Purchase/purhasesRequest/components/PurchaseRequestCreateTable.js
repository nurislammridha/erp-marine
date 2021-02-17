import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMultiplePQRowData, handleSubmitPQ } from '../_redux/actions/PurhasesRequestAddAction';

const PurchaseRequestCreateTable = () => {
    const dispatch = useDispatch()
    const purchaseRequestData = useSelector((state) => state.purchaseRequest.purchaseRequestData);
    const multiplePQData = useSelector((state) => state.purchaseRequest.multiplePQData);
    const isLoading = useSelector((state) => state.purchaseRequest.isLoading);

    const handlePQSubmit = (e) => {
        dispatch(handleSubmitPQ(purchaseRequestData));
        e.preventDefault();
    }
    return (
        <div className="container table-form">
            <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ITEM ID</th>
                            <th scope="col">ITEM NAME</th>
                            <th scope="col">UOM</th>
                            <th scope="col">QTY</th>
                            <th scope="col">REMARKS</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            multiplePQData.length > 0 && multiplePQData.map((item, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.strItemName}</td>
                                        <td>02</td>
                                        <td>{item.numPurchaseRequestQty}</td>
                                        <td>{item.strPurchaseRequestPurpose}</td>
                                        <td>
                                            {/* <Link>
                                                <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                                            </Link> */}
                                            <Link onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Are you sure you wish to delete this item?"
                                                    )
                                                )
                                                    dispatch(deleteMultiplePQRowData(index))
                                            }}>
                                                <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>

                {
                    !isLoading && (
                        <Button className="text-white booking-btn float-right" type="submit" variant="primary" onClick={(e) => handlePQSubmit(e)}>
                            Save
                        </Button>
                    )}
                {isLoading && (
                    <Button className="text-white booking-btn float-right" variant="primary" disabled={true}>
                        <span className="p-2"> Saving.... </span>
                        <span className="ml-3 spinner spinner-white "></span>
                    </Button>
                    // <Button className="ml-4 text-white booking-btn" variant="primary" disabled={true}>

                    // </Button>
                )}
            </div>
        </div>

    );
};

export default PurchaseRequestCreateTable;