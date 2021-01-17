import React from 'react'
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeBankInfoInput } from '../_redux/actions/BankInfoAction';

const BankInfoAdd = withRouter(({ history }) => {

    const selectOptions = [
        {
            label: 'Active',
            value: "1"
        },
        {
            label: 'In Active',
            value: "0"
        }
    ]

    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    const bankInfoInput = useSelector((state) => state.bankInfo.bankInfoInput);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeBankInfoInput(name, value));
    };

    return (
        <div className="container">
            <div className="card card-custom gutter-b mt-10">
                <div className="card-body">
                    <form
                        className="form form-label-right"
                        method="post"
                    >
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Beneficiary Name</label>
                                    <Form.Control
                                        type="text"
                                        name="strBeneficiaryName"
                                        className="fromStyle formHeight"
                                        value={bankInfoInput.strBeneficiaryName}
                                        onChange={(e) =>
                                            handleChangeTextInput(
                                                "strBeneficiaryName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Account No</label>
                                    <Form.Control
                                        type="text"
                                        name="strBankAccountNo"
                                        className="fromStyle formHeight"
                                        value={bankInfoInput.strBankAccountNo}
                                        onChange={(e) =>
                                            handleChangeTextInput(
                                                "strBankAccountNo",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Bank Name</label>
                                    <RHFInput
                                        as={<Select options={selectOptions} />}
                                        rules={{ required: true }}
                                        name=""
                                        register={register}
                                        value=""
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Branch Name</label>
                                    <RHFInput
                                        as={<Select options={selectOptions} />}
                                        rules={{ required: true }}
                                        name=""
                                        register={register}
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Routing No</label>
                                    <Form.Control
                                        type="text"
                                        name="strRoutingNo"
                                        className="fromStyle formHeight"
                                        value={bankInfoInput.strRoutingNo}
                                        onChange={(e) =>
                                            handleChangeTextInput(
                                                "strRoutingNo",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">IBAN</label>
                                    <Form.Control
                                        type="text"
                                        name="intIBANNO"
                                        className="fromStyle formHeight"
                                        value={bankInfoInput.intIBANNO}
                                        onChange={(e) =>
                                            handleChangeTextInput(
                                                "intIBANNO",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Swift Code</label>
                                    <Form.Control
                                        type="text"
                                        name="strSWIFTCode"
                                        className="fromStyle formHeight"
                                        value={bankInfoInput.strSWIFTCode}
                                        onChange={(e) =>
                                            handleChangeTextInput(
                                                "strSWIFTCode",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Is Default</label>
                                    <Form.Check
                                        className=""
                                        type="checkbox"

                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div className="form-group row mt-5">
                            <div className="col-md-9">

                            </div>
                            <div className="col-md-3">
                                <div className="float-right">
                                    <a onClick={() => {
                                        history.push("/partners/address");
                                    }}>
                                        <button type="button" class="saveButton text-white btn">Previous</button>
                                    </a>
                                    <a onClick={() => {
                                        history.push("/partners/others-info");
                                    }}>
                                        <button type="button" class="saveButton text-white btn ml-3">Next</button>
                                    </a>
                                </div>

                            </div>
                        </div> */}
                    </form>
                </div>
            </div>
        </div >
    );
});

export default BankInfoAdd;
