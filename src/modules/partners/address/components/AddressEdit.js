import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    deletePartnerAddressMultiple,
    getCountryName,
    handleChangePartnerAddressInput,
    partnerAddressSubmit,
    partnerAddressSubmitMultiple
} from '../_redux/actions/AddressAction';

const AddressEdit = withRouter(({ history }) => {
    const { register, setValue, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const partnerAddress = useSelector(state => state.partnerAddress.partnerAddressInput);
    const addressInfo = useSelector(state => state.partnerAddress.addressInfo);
    // console.log('partnerAddress :>> ', partnerAddress);
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePartnerAddressInput(name, value))
    }
    const countryOptionData = useSelector(
        (state) => state.partnerAddress.countryOptionData
    );
    console.log('countryOptionData', countryOptionData)

    useEffect(() => {
        dispatch(getCountryName());
        if (addressInfo.length > 0) {
            setValue("intCountryID", "");
        }
    }, [addressInfo]);
    console.log('countryOptionData', countryOptionData)

    const onSubmit = () => {
        // dispatch(partnerAddressSubmit(partnerAddress));
        // setShow(true);
    }

    const multipleAdd = () => {
        dispatch(partnerAddressSubmitMultiple(partnerAddress));

    }
    return (
        <div className="container">
            <div className="mt-10">
                <div className="form-group row">
                    <div className="col-md-3">
                        <Form.Group>
                            <label className="form-label mt-2 formFont">Address</label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                name="strSupplierAddress"
                                className="fromStyle formHeight"
                                value={partnerAddress.strSupplierAddress}
                                onChange={(e) => handleChangeTextInput("strSupplierAddress", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group>
                            <label className="form-label mt-2 formFont">City</label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City Name"
                                name="strCity"
                                className="fromStyle formHeight"
                                value={partnerAddress.strCity}
                                onChange={(e) => handleChangeTextInput("strCity", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group>
                            <label className="form-label mt-2 formFont">State</label>
                            <Form.Control
                                type="text"
                                placeholder="Enter State"
                                name="strState"
                                className="fromStyle formHeight"
                                value={partnerAddress.strState}
                                onChange={(e) => handleChangeTextInput("strState", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group>
                            <label className="form-label mt-2 formFont">Country</label>
                            <RHFInput
                                className=""
                                as={<Select options={countryOptionData} />}
                                rules={{ required: true }}
                                name="intCountryID"
                                register={register}
                                value={partnerAddress.intCountryID}
                                setValue={setValue}
                                onChange={(option) => {
                                    handleChangeTextInput("intCountryID", option.value);
                                    handleChangeTextInput("strCountry", option.label);
                                    // handleChangeTextInput("strCountryName", option.label);
                                }
                                }
                            />
                        </Form.Group>
                    </div>

                </div>
                <div className="form-group row">
                    <div className="col-md-3">
                        <Form.Group>
                            <label className="form-label mt-2 formFont">Zip Code</label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Code"
                                name="strZipCode"
                                className="fromStyle formHeight"
                                value={partnerAddress.strZipCode}
                                onChange={(e) => handleChangeTextInput("strZipCode", e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md-3">
                        <Form.Group>
                            <label className="form-label mt-2 formFont">Is Default</label> <br />
                            {/* <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                /> */}
                            <label className="switch">
                                <input type="checkbox" checked={partnerAddress.isDefault ? true : false}
                                    onChange={(option) => handleChangeTextInput("isDefault", partnerAddress.isDefault ? 0 : 1)}
                                ></input>
                                <span className="slider round"></span>
                            </label>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <div className="mt-8"></div>
                        <button
                            className="btn btn-sm btn-primary float-right"
                            onClick={() => multipleAdd()}
                        >
                            Add
                            </button>
                    </div>
                </div>
                {
                    addressInfo.length > 0 &&
                    <div className="react-bootstrap-table table-responsive mt-8">
                        <table className="table table table-head-custom table-vertical-center voyageTable">
                            <thead>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Is Default</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {addressInfo.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.strSupplierAddress}</td>
                                        <td>{item.strCity}</td>
                                        <td>{item.strState}</td>
                                        <td>{item.strCountry}</td>
                                        <td>{item.isDefault ? 'Yes' : 'No'}</td>
                                        <td>
                                            <a><i className="fas fa-trash-alt editIcon ml-4"
                                                onClick={() => dispatch(deletePartnerAddressMultiple(index))}
                                            ></i></a>

                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                }


            </div>
        </div >
    )
});
export default AddressEdit;