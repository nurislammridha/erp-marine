import React from 'react';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import { round } from 'lodash';
import { handleChangePurchaseOrderApprovalDetailInput } from '../../_redux/actions/POApprovalAction'

const PODetail = () => {
    const dispatch = useDispatch();
    const POApprovalDetail = useSelector((state) => state.POApprovalFilter.POApprovalDetail);
    const POApprovalMultiple = useSelector((state) => state.POApprovalFilter.POApprovalMultiple);

    console.log('POApprovalDetail :>> ', POApprovalDetail);
    console.log('POApprovalMultiple :>> ', POApprovalMultiple);
    const handleChangeTextInput = (name, value, item) => {
        dispatch(handleChangePurchaseOrderApprovalDetailInput(name, value, item));
    };

    return (
        <div>
            <form
                className="form form-label-right"
                method="post"
            >
                {
                    POApprovalDetail && (
                        <>
                            <div>
                                <div className="row">
                                    <div className="col-md-3">
                                        Requisition No
                                        <h5>{POApprovalDetail.intPOId}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Requisition Date
                                        <h5>{moment(POApprovalDetail.dtePODate).format("DD-MM-YYYY")}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Due Date
                                        <h5>{moment(POApprovalDetail.dtePOValidityDate).format("DD-MM-YYYY")}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Department
                                        <h5>{POApprovalDetail.intPOId}</h5>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-3">
                                        Reference
                                        <h5>{POApprovalDetail.strReferenceTypeName}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Requisition Category
                                        <h5>{POApprovalDetail.intPOId}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Approved By
                                        <h5>{POApprovalDetail.intPOId}</h5>
                                    </div>
                                    <div className="col-md-3">
                                        Approved Date
                                        <h5>{moment(POApprovalDetail.dteApproveDatetime).format("DD-MM-YYYY")}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
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
                                            {POApprovalMultiple.map((item, index) => (


                                                <tr>

                                                    <td>
                                                        <Form.Check
                                                            className=""
                                                            type="checkbox"
                                                            name="isRevLoadingPorts"
                                                            value={item.isChecked}
                                                            onChange={(e) => handleChangeTextInput('isChecked', e.target.checked, item)}
                                                        />
                                                    </td>
                                                    <td>{item.intItemId}</td>
                                                    <td>{item.strItemName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{item.strUoMName}</td>
                                                    <td>{item.strBeneficiaryName}</td>
                                                    <td>{round(item.numOrderQty)}</td>
                                                    <td>
                                                        <Form.Control
                                                            type="number"
                                                            name="numApprovedQty"
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
                                        <button className="btn btn-danger btn-sm" >
                                            Reject
                                        </button>
                                        <button className="btn btn-primary btn-sm ml-3 mr-5" >
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

export default PODetail;
