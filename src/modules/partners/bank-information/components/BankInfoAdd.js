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
            <div className="mt-10">

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
                                {/* <RHFInput
                                    as={<Select options={selectOptions} />}
                                    rules={{ required: true }}
                                    name=""
                                    register={register}
                                    value=""
                                /> */}
                            </div>
                            <div className="col-md-2">

                            </div>
                            <div className="col-md-5">
                                <label className="form-label mt-2 formFont">Branch Name</label>
                                {/* <RHFInput
                                    as={<Select options={selectOptions} />}
                                    rules={{ required: true }}
                                    name=""
                                    register={register}
                                    value=""
                                /> */}
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
                                    name="strIBANNo"
                                    className="fromStyle formHeight"
                                    value={bankInfoInput.strIBANNo}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strIBANNo",
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
                                <label className="form-label mt-2 formFont">Is Default</label> <br />
                                {/* <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                /> */}

                                <label className="switch">
                                    {/* <input
                                        type="checkbox"
                                        name="isDefaultAccount"
                                        value={bankInfoInput.isDefaultAccount}
                                        onChange={(e) =>
                                            handleChangeTextInput(
                                                "isDefaultAccount",
                                                e.value
                                            )
                                        }
                                    >
                                    </input> */}
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div >
    );
});

export default BankInfoAdd;
