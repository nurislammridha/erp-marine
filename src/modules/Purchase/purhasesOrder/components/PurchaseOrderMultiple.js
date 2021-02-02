import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { addMultipleOrder, purchasesOrderInput } from '../_redux/actions/PurhasesOrderAction';
const PurchaseOrderMultiple = () => {
    const { register, setValue } = useForm();
    const dispatch = useDispatch();
    const orderInput = useSelector(state => state.purchasesOrderInfo.orderInput);
    const multipleOrder = useSelector(state => state.purchasesOrderInfo.multipleOrder);
    const changeTextValue = (name, value) => {
        dispatch(purchasesOrderInput(name, value))
    }
    const addMultiple = () => {
        dispatch(addMultipleOrder(orderInput))
    }
    const shipList = [
        {
            value: 1,
            label: "Akij"
        },
        {
            value: 2,
            label: "Akij Noor"
        },
    ]
    return (
        <>
            <div className="row">
                <div className="col-md-4 col-12">
                    <label className="formFont">Refference No</label>
                    <RHFInput
                        as={<Select options={shipList} />}
                        rules={{ required: false }}
                        name="intRefferenceId"
                        register={register}
                        value={orderInput.intRefferenceId}
                        setValue={setValue}
                        onChange={(option) => {
                            changeTextValue("intRefferenceId", option.value);
                            changeTextValue("strRefferenceName", option.label);
                        }}
                    />
                </div>
                <div className="col-md-4 col-12">
                    <label className="formFont">Item</label>
                    <RHFInput
                        as={<Select options={shipList} />}
                        rules={{ required: false }}
                        name="intItemId"
                        register={register}
                        value={orderInput.intItemId}
                        setValue={setValue}
                        onChange={(option) => {
                            changeTextValue("intItemId", option.value);
                            changeTextValue("strItemName", option.label);
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label className="formFont pl-1">Remarks</Form.Label>
                        <Form.Control
                            className="formHeight"
                            name="strRemarks"
                            type="text"
                            value={orderInput.strRemarks}
                            placeholder="Enter Remarks"
                            onChange={(e) => changeTextValue("strRemarks", e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label className="formFont pl-1">QTY</Form.Label>
                        <Form.Control
                            className="formHeight"
                            name="numQTY"
                            type="number"
                            value={orderInput.numQTY}
                            placeholder="Enter QTY"
                            onChange={(e) => changeTextValue("numQTY", e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-3">
                    <label htmlFor="">All Item</label>
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check
                            className="forgotPasswordText  "
                            type="checkbox"
                        // onChange={(e) =>
                        //   certificateMainInfoChange(
                        //     "intNotOnBoard",
                        //     certificateInfoInput.intNotOnBoard == "0" ? "1" : "0"
                        //   )
                        // }
                        />
                    </Form.Group>
                </div>
                <div className="col-md-1">
                    <button
                        className="btn btn-primary btn-sm mt-5"
                        onClick={() => addMultiple()}
                    >
                        Add
                    </button>
                </div>
            </div>
            {multipleOrder.length > 0 && (
                <>
                    <div className="react-bootstrap-table table-responsive mt-9">
                        <table className="table table table-head-custom table-vertical-center  voyageTable">
                            <thead>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">ITEM ID</th>
                                    <th scope="col">ITEM NAME</th>
                                    <th scope="col">UOM</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">REMARKS</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {multipleOrder.length > 0 && multipleOrder.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.intItemId}</td>
                                        <td>{item.strItemName}</td>
                                        <td>123</td>
                                        <td>{item.numQTY}</td>
                                        <td>{item.strRemarks}</td>
                                        <td>
                                            {""}
                                            <div className="d-flex">
                                                <Link>
                                                    <i className="far fa-eye editIcon item-list-icon"></i>
                                                </Link>
                                                <Link>
                                                    <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                                                </Link>
                                                <a href>
                                                    <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-10"></div>
                        <div className="col-md-2 mt-3">
                            <button
                                className="btn btn-primary btn-sm float-right text-center custome-addnew-btn item-add-save mb-5"
                            // onClick={() => dispatch(submitMultipleItem(multipleItemList))}
                            >
                                save
                             </button>
                        </div>
                        <div className="clear-fix"></div>
                    </div>
                </>
            )}

        </>
    );
}

export default PurchaseOrderMultiple;