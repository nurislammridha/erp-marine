import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { addMultipleOrder, deleteMultipleItem, editOrderMultiple, purchasesOrderInput, SubmitFinalOrder, submitMultipleOrderList } from '../_redux/actions/PurhasesOrderAction';
import { getRefferenceNo } from '../../../master/DropDownData/RefferenceNo/_redux/RefferenceNoAction/RefferenceNoAction';
import { getItemList } from '../../../master/DropDownData/Item/_redux/ItemListAction/ItemListAction';
import { useHistory } from 'react-router-dom';
const PurchaseOrderMultiple = () => {
    const history = useHistory();
    const { register, setValue } = useForm();
    const dispatch = useDispatch();
    const orderInput = useSelector(state => state.purchasesOrderInfo.orderInput);
    const multipleOrder = useSelector(state => state.purchasesOrderInfo.multipleOrder);
    const editOptionReference = useSelector(state => state.purchasesOrderInfo.editOptionReference);
    const editOptionItem = useSelector(state => state.purchasesOrderInfo.editOptionItem);
    const finalOrderInput = useSelector(state => state.purchasesOrderInfo.finalOrderInput);
    const status = useSelector(state => state.purchasesOrderInfo.status);
    if (status) {
        history.push('/purchase/order/list')
    }
    useEffect(() => {
        if (finalOrderInput.orderRow) {
            dispatch(SubmitFinalOrder(finalOrderInput))
        }

    }, [finalOrderInput, dispatch])
    const changeTextValue = (name, value) => {
        dispatch(purchasesOrderInput(name, value))
    }
    const addMultiple = () => { dispatch(addMultipleOrder(orderInput)) }
    const deleteMultiple = (index) => { dispatch(deleteMultipleItem(index)) }
    const submitMultipleOrder = (multipleOrder) => {
        dispatch(submitMultipleOrderList(multipleOrder, finalOrderInput))
    }
    const refferenceList = useSelector(state => state.RefferenceTypeReducer.refferenceList);
    const ItemList = useSelector(state => state.ItemListReducer.ItemList);
    console.log('ItemList :>> ', ItemList);
    useEffect(() => {
        dispatch(getRefferenceNo())
        dispatch(getItemList())
    }, [])

    useEffect(() => {
        setValue("intReferenceId", "");
        setValue("intItemId", "");
    }, [multipleOrder, setValue])
    const handleEdit = (index) => {
        dispatch(editOrderMultiple(index))
    }
    return (
        <>
            <div className="row">
                <div className="col-md-4 col-12">
                    <label className="formFont">Refference No</label>
                    <RHFInput
                        as={<Select options={refferenceList} />}
                        rules={{ required: false }}
                        name="intReferenceId"
                        register={register}
                        value={editOptionReference}
                        setValue={setValue}
                        onChange={(option) => {
                            changeTextValue("intReferenceId", option.value);
                            changeTextValue("strReferenceCode", option.label);
                        }}
                    />
                </div>
                <div className="col-md-4 col-12">
                    <label className="formFont">Item</label>
                    <RHFInput
                        as={<Select options={ItemList} />}
                        rules={{ required: false }}
                        name="intItemId"
                        register={register}
                        value={editOptionItem}
                        setValue={setValue}
                        onChange={(option) => {
                            changeTextValue("intItemId", option.value);
                            changeTextValue("strItemName", option.label);
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label className="formFont pl-1">Purchase Description</Form.Label>
                        <Form.Control
                            className="formHeight"
                            name="strPurchaseDescription"
                            type="text"
                            value={orderInput.strPurchaseDescription}
                            placeholder="Enter Remarks"
                            onChange={(e) => changeTextValue("strPurchaseDescription", e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label className="formFont pl-1">QTY</Form.Label>
                        <Form.Control
                            className="formHeight"
                            name="numOrderQty"
                            type="number"
                            value={orderInput.numOrderQty}
                            placeholder="Enter QTY"
                            onChange={(e) => changeTextValue("numOrderQty", e.target.value)}
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
                                        <td>
                                            <a href
                                                onClick={() => {
                                                    handleEdit(index);
                                                    deleteMultiple(index);
                                                }}
                                            >
                                                {index + 1}
                                            </a>
                                        </td>
                                        <td>
                                            <a href
                                                onClick={() => {
                                                    handleEdit(index);
                                                    deleteMultiple(index);
                                                }}
                                            >
                                                {item.intItemId}
                                            </a>
                                        </td>
                                        <td>
                                            <a href
                                                onClick={() => {
                                                    handleEdit(index);
                                                    deleteMultiple(index);
                                                }}
                                            >
                                                {item.strItemName}
                                            </a>
                                        </td>
                                        <td>
                                            <a href
                                                onClick={() => {
                                                    handleEdit(index);
                                                    deleteMultiple(index);
                                                }}
                                            >
                                                123
                                            </a>
                                        </td>
                                        <td>
                                            <a href
                                                onClick={() => {
                                                    handleEdit(index);
                                                    deleteMultiple(index);
                                                }}
                                            >
                                                {item.numOrderQty}
                                            </a>
                                        </td>
                                        <td>
                                            <a href
                                                onClick={() => {
                                                    handleEdit(index);
                                                    deleteMultiple(index);
                                                }}
                                            >
                                                {item.strPurchaseDescription}
                                            </a>
                                        </td>
                                        <td>
                                            {""}
                                            <div className="d-flex">
                                                <a href
                                                    onClick={() => deleteMultiple(index)}
                                                >
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
                                onClick={() => submitMultipleOrder(multipleOrder)}
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