import React from 'react';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import { useForm } from "react-hook-form";
import { handleApprovePRApproval, handleChangePurchaseApprovalDetailInput, handleRejectedPRApproval } from '../../_redux/actions/PurchaseApprovalAction';
import { round } from 'lodash';


const RequisitionApprovalDetail = ({ handleClose }) => {

    const { handleSubmit, register, errors, setValue } = useForm();
    const dispatch = useDispatch();
    const PurchaseApprovalDetailInput = useSelector((state) => state.purchaseApprovalFilter.PurchaseApprovalDetailInput);
    const purchaseApprovalDetail = useSelector((state) => state.purchaseApprovalFilter.purchaseApprovalDetail);
    console.log('purchaseApprovalDetail', purchaseApprovalDetail)

    const purchaseApprovalMultiple = useSelector((state) => state.purchaseApprovalFilter.purchaseApprovalMultiple);

    const handleChangeTextInput = (name, value, item) => {
        dispatch(handleChangePurchaseApprovalDetailInput(name, value, item));
    };

    const handleApprove = (e) => {
        purchaseApprovalDetail.intStatus = 1;
        dispatch(handleApprovePRApproval(purchaseApprovalDetail, handleClose));
        e.preventDefault();

    };

    const handleReject = (e) => {
        purchaseApprovalDetail.intStatus = 0;
        // dispatch(handleRejectedPRApproval(purchaseApprovalDetail));
        e.preventDefault();
    };
    console.log('purchaseApprovalDetail :>> ', purchaseApprovalDetail);
    return (
        <div>
            <form
                className="form form-label-right"
                method="post"
            >
                {
                    purchaseApprovalDetail && (
                        <>
                            <div>

                                <div className="row">
                                    <div className="col-md-3">
                                        Requisition No
                                    <h5>{purchaseApprovalDetail.intPurchaseRequestID}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Requisition Date
                                    <h5>{moment(purchaseApprovalDetail.dtePurchaseRequestDate).format("DD-MM-YYYY")}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Due Date
                                    <h5>{moment(purchaseApprovalDetail.dteDueDate).format("DD-MM-YYYY")}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Department
                                    <h5>{purchaseApprovalDetail.strDepartmentName}</h5>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-3">
                                        Reference
                                    <h5>{purchaseApprovalDetail.strPurchaseReferanceNo}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Requisition Category
                                    <h5>{purchaseApprovalDetail.strCategoryName}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Approved By
                                    <h5>{purchaseApprovalDetail.dtePurchaseRequestDate}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Approved Date
                                    <h5>{purchaseApprovalDetail.dtePurchaseRequestDate}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 form-group">
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
                                                <th scope="col">ITEM ID</th>
                                                <th scope="col">ITEM NAME</th>
                                                <th scope="col">ITEM CATEGORY</th>
                                                <th scope="col">ITEM SUB CATEGORY</th>
                                                <th scope="col">UOM</th>
                                                <th scope="col">STOCK QTY</th>
                                                <th scope="col">REQ QTY</th>
                                                <th scope="col">APPROVED QTY</th>
                                                <th scope="col">REMARKS</th>
                                                <th scope="col">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseApprovalMultiple.length && purchaseApprovalMultiple.map((item, index) => (

                                                <tr>
                                                    <td>
                                                        <Form.Check
                                                            className=""
                                                            type="checkbox"
                                                            name="isChecked"
                                                            value={item.isChecked}
                                                            onChange={(e) => handleChangeTextInput('isChecked', e.target.checked, item)}
                                                        />
                                                    </td>
                                                    <td>{item.intId}</td>
                                                    <td>{item.strItemName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{round(item.numPurchaseRequestQty)}</td>
                                                    <td>
                                                        <Form.Control
                                                            type="number"
                                                            name="numApprovedQty"
                                                            // defaultValue={round(item.numPurchaseRequestQty)}
                                                            value={item.numApprovedQty}
                                                            max={50}
                                                            className="fromStyle formHeight"
                                                            onChange={(e) =>
                                                                handleChangeTextInput("numApprovedQty", e.target.value, item)
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            name="remarks"
                                                            value={item.remarks}
                                                            className="fromStyle formHeight"
                                                            onChange={(e) =>
                                                                handleChangeTextInput("remarks", e.target.value, item)
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <a href>
                                                                <i className="fas fa-trash-alt editIcon item-list-icon ml-4"
                                                                // onClick={(id) => deleteList(item.intSupplierId)}
                                                                >
                                                                </i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-sm-12">
                                    <div className="float-right">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={(e) => handleReject(e)}
                                        >
                                            Reject
                                    </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm ml-3 mr-3"
                                            onClick={(e) => handleApprove(e)}
                                        >
                                            Approve
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    );
}

export default RequisitionApprovalDetail;
