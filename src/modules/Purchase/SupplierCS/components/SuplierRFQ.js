import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import ReactToPrint from 'react-to-print';
import { getSupplierName } from '../../../master/DropDownData/SupplierName/_redux/SupplierNameAction/SupplierNameAction';
import { getQuotationRFQDetails, getSupplierAddress, searchValueRFQ } from '../_redux/action/SupplierCsAction';
const SupplierRFQ = () => {
    const componentRef = useRef();
    const { register, setValue } = useForm();
    const supplierNameList = useSelector(state => state.SupplierNameReducer.supplierNameList);
    const supplierDetailsList = useSelector(state => state.supplierCsInfo.supplierDetailsList);
    const supplierAddress = useSelector(state => state.supplierCsInfo.supplierAddress);
    const valSearchRFQ = useSelector(state => state.supplierCsInfo.valSearchRFQ);
    const quotationRFQlist = useSelector(state => state.supplierCsInfo.quotationRFQlist);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSupplierName())
    }, [])
    useEffect(() => {
        dispatch(getQuotationRFQDetails(valSearchRFQ))
    }, [valSearchRFQ, dispatch])
    const changeSupplierList = (value) => {
        dispatch(getSupplierAddress(value))
    }
    const searchRFQ = (value) => {
        dispatch(searchValueRFQ(value))
    }
    console.log('quotationRFQlist :>> ', quotationRFQlist);
    const courseData = [
        {
            id: 1,
            name: "cse",
        },
        {
            id: 1,
            name: "EEE",
        },
        {
            id: 1,
            name: "MBA",
        },
    ];
    let CourseName = [];
    if (courseData) {
        courseData.forEach((item) => {
            let items = {
                value: item.id,
                label: item.name,
            };
            CourseName.push(items);
        });
    }
    return (

        <>

            <div className="form-group row">
                <div className="col-xl-4 col-lg-4 col-md-6">
                    <Form.Group>
                        <Form.Label className="formFont pl-1">RFQ NO</Form.Label>
                        <Form.Control
                            className="formHeight"
                            type="number"
                            placeholder="Type RFQ"
                            name="searchRFQ"
                            value={valSearchRFQ}
                            onChange={(e) => searchRFQ(e.target.value)}
                        />
                    </Form.Group>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6">
                    <label className="formFont">Supplier</label>
                    <RHFInput
                        as={<Select options={supplierNameList} />}
                        rules={{ required: false }}
                        name="intSupplierId"
                        register={register}
                        value={CourseName.label}
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
                        {quotationRFQlist && (
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

                                        <th scope="col">RATE</th>
                                        <th scope="col">TOTAL</th>
                                    </tr>

                                    {quotationRFQlist.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>2021</td>
                                            <td>{index.intItemId}</td>
                                            <td>8567</td>
                                            <td>123</td>
                                            <td>{item.strRemarks}</td>
                                            <td>{item.numPRQty}</td>
                                            <td>100</td>
                                            <td>100</td>
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