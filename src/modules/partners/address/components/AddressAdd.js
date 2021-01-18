import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleChangePartnerAddressInput, partnerAddressInput } from '../_redux/actions/AddressAction';

const AddressAdd = withRouter(({ history }) => {
    const { register, setValue, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const partnerAddress = useSelector(state => state.partnerAddress.partnerAddressInput);
    console.log('partnerAddress :>> ', partnerAddress);
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
        // dispatch(partnerAddressInput(partnerAddress))
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
                        <div className="col-md-5">
                            <Form.Group>
                                <label className="form-label mt-2 formFont">PIC name</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter PIC Name"
                                    name="picName"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.picName}
                                    onChange={(e) => handleChangeTextInput("picName", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <label className="form-label mt-2 formFont">PIC Contact</label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter PIC Contact"
                                    name="picContact"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.picContact}
                                    onChange={(e) => handleChangeTextInput("picContact", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <label className="form-label mt-2 formFont">PIC Email</label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter PIC Email"
                                    name="picEmail"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.picEmail}
                                    onChange={(e) => handleChangeTextInput("picEmail", e.target.value)}
                                />
                            </Form.Group>
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
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-5">
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
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Code</label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Code"
                                    name="code"
                                    className="fromStyle formHeight"
                                    value={partnerAddress.code}
                                    onChange={(e) => handleChangeTextInput("code", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Country</label>
                                <RHFInput
                                    className=""
                                    as={<Select options={country} />}
                                    rules={{ required: false }}
                                    name="country"
                                    register={register}
                                    value={partnerAddress.country}
                                    setValue={setValue}
                                    onChange={(e) => handleChangeTextInput("country", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <label className="form-label mt-2 formFont">Is Default</label>
                                <Form.Check
                                    required
                                    feedback="You must agree before submitting."
                                    name="isDefault"
                                    onChange={(e) => handleChangeTextInput("isDefault", e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    {/* <div className="form-group row">
                            <div className="col-md-9">
                            </div>
                            <div className="col-md-3">
                                <button className="saveButton text-white btn ml-3"
                                    onClick={() => history.push('/partners/info')}
                                >
                                    Previous
                                    </button>
                                <button
                                    className="saveButton text-white btn px-9 ml-3"
                                    onClick={() => history.push('/partners/bank-info')}
                                    type="submit"
                                >
                                    Next
                                </button>
                            </div>
                        </div> */}
                </form>

            </div>
        </div >
    )
});
export default AddressAdd;