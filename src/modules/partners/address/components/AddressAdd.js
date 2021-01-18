import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleChangePartnerAddressInput, partnerAddressSubmit } from '../_redux/actions/AddressAction';

const AddressAdd = withRouter(({ history }) => {
    const { register, setValue, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const partnerAddress = useSelector(state => state.partnerAddress.partnerAddressInput);
    // console.log('partnerAddress :>> ', partnerAddress);
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePartnerAddressInput(name, value))
    }
    const country = [
        {
            label: "Bangladesh",
            value: "1",
        },
        {
            label: "Nepal",
            value: "3",
        },
        {
            label: "Pakistan",
            value: "2",
        },
        {
            label: "Usa",
            value: "1",
        },
        {
            label: "Vutan",
            value: "0",
        }
    ];
    const onSubmit = () => {
        dispatch(partnerAddressSubmit(partnerAddress))
    }
    return (
        <div className="container">
            <div className="mt-10">

                <form
                    className="form form-label-right"
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                >
                    <div className="form-group row">
                        <div className="col-md-4">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Address</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.address}
                                    onChange={(e) => handleChangeTextInput("address", e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">City</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter City Name"
                                    name="city"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.city}
                                    onChange={(e) => handleChangeTextInput("city", e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">State</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter State"
                                    name="state"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.state}
                                    onChange={(e) => handleChangeTextInput("state", e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-4">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Zip Code</label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Code"
                                    name="code"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.code}
                                    onChange={(e) => handleChangeTextInput("code", e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Country</label>
                                <RHFInput
                                    className=""
                                    as={<Select options={country} />}
                                    rules={{ required: false }}
                                    name="country"
                                    register={register}
                                    value={country.value}
                                    setValue={setValue}
                                    onChange={(option) => handleChangeTextInput("country", option.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-3">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Is Default</label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-1">
                            <div className="mt-8"></div>
                            <button
                                className="btn btn-sm btn-primary"
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
                <div className="react-bootstrap-table table-responsive mt-8">
                    <table className="table table table-head-custom table-vertical-center voyageTable">
                        <thead>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Is Default</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dhaka</td>
                                <td>Jessore</td>
                                <td>Bangladesh</td>
                                <td>Bangladesh</td>
                                <td>
                                    {" "}
                                    <i className="far fa-edit editIcon"></i>
                                    <i className="fas fa-trash-alt editIcon ml-4"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Dhaka</td>
                                <td>Jessore</td>
                                <td>Bangladesh</td>
                                <td>Bangladesh</td>
                                <td>
                                    {" "}
                                    <i className="far fa-edit editIcon"></i>
                                    <i className="fas fa-trash-alt editIcon ml-4"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Dhaka</td>
                                <td>Jessore</td>
                                <td>Bangladesh</td>
                                <td>Bangladesh</td>
                                <td>
                                    {" "}
                                    <i className="far fa-edit editIcon"></i>
                                    <i className="fas fa-trash-alt editIcon ml-4"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
});
export default AddressAdd;