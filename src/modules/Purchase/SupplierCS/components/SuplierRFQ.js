import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ReactToPrint from 'react-to-print';
import { getSupplierName } from '../../../master/DropDownData/SupplierName/_redux/SupplierNameAction/SupplierNameAction';
import { getQuotationRFQDetails, getSupplierAddress, newRfqList, searchValueRFQ } from '../_redux/action/SupplierCsAction';
const SupplierRFQ = () => {
    const componentRef = useRef();
    const { register, setValue } = useForm();
    const supplierNameList = useSelector(state => state.SupplierNameReducer.supplierNameList);
    const supplierAddress = useSelector(state => state.supplierCsInfo.supplierAddress);
    const valSearchRFQ = useSelector(state => state.supplierCsInfo.valSearchRFQ);
    const rfqList = useSelector(state => state.supplierCsInfo.rfqList);
    console.log('rfqList :>> ', rfqList);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSupplierName())
    }, [])

    const changeSupplierList = (value) => {
        dispatch(getSupplierAddress(value))
    }
    const searchRFQ = (value) => {
        dispatch(searchValueRFQ(value))
    }
    const addRfqList = () => {

        dispatch(getQuotationRFQDetails(rfqList, valSearchRFQ));
    }


    return (

        <>

            <div className="form-group row">
                {rfqList && (
                    <div className="col-xl-3 col-lg-3 col-md-5">
                        <Form.Group>
                            <Form.Label className="formFont pl-1">RFQ NO</Form.Label>
                            <Form.Control
                                className="formHeight"
                                type="number"
                                placeholder={rfqList.intPurchaseRequestID}
                                name="searchRFQ"
                                value={valSearchRFQ}
                                onChange={(e) => searchRFQ(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                )}
                <div className="col-xl-2 col-lg-2 col-md-2">
                    <button
                        className="btn btn-primary mt-5"
                        onClick={() => addRfqList()}
                    >
                        Add List
                   </button>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-5">
                    <label className="formFont">Supplier</label>
                    <RHFInput
                        as={<Select options={supplierNameList} />}
                        rules={{ required: false }}
                        name="intSupplierId"
                        register={register}
                        value={''}
                        setValue={setValue}
                        onChange={(option) => changeSupplierList(option.value)}
                    />
                </div>

                <Button
                    className="mr-4 text-white float-right mt-5 btn-sm"
                    variant="primary"
                >
                    Send Mail
                </Button>
                <ReactToPrint
                    trigger={() => <Button
                        className="mr-4 text-white float-right mt-5 btn-sm"
                        variant="primary"
                    >
                        Print <img src={"/media/svg/icons/Code/print.svg"} />
                    </Button>}
                    content={() => componentRef.current}
                />


            </div>
            <div className="row" ref={componentRef}>
                <div className="col-xl-8 col-lg-8 col-12">
                    <div className="react-bootstrap-table table-responsive mt-5">
                        {rfqList && (
                            <table className="table table table-head-custom table-vertical-center voyageTable supplier-table">
                                <thead>
                                    <tr>
                                        <th scope="col">SL NO</th>
                                        <th scope="col">INDENT NO</th>
                                        <th scope="col">ITEM ID</th>
                                        <th scope="col">ITEM NAME</th>
                                        <th scope="col">UOM</th>
                                        <th scope="col">REMARKS</th>
                                        <th scope="col">RFQ QTY</th>
                                    </tr>

                                    {rfqList.purchase_row.map((item, index) => (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.intId}</td>
                                            <td>{item.intitemid}</td>
                                            <td>{item.strItemName}</td>
                                            <td>Test</td>
                                            <td>Test</td>
                                            <td>Test</td>
                                        </tr>
                                    ))}


                                </thead>
                            </table>
                        )}

                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-12 mt-5">
                    <div className="border rounded p-5 pb-5">
                        <h6 className="supplier-modal-header mb-3">
                            Supplier Info
                    </h6>
                        <div className="border-bottom"></div>
                        <div className="row mt-3 supplier-info">
                            <div className="col-6">
                                <p>Supplier name</p>
                                <p>Supplier Address</p>
                                <p>Supplier Contact</p>
                                <p>Supplier Email</p>
                            </div>
                            {supplierAddress && supplierAddress.map((item, index) => (
                                <div className="col-1">
                                    <p>:{item.strSupplierName}</p>
                                    <p>:{item.strSupplierAddress}</p>
                                    <p>:{item.strContactNumber}</p>
                                    <p>:{item.strEmail}</p>
                                </div>
                            ))}

                            <div className="col-5">
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupplierRFQ;