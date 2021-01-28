import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { bankInfoSubmitMultiple, deleteBankMultiple, getBankName, handleChangeBankInfoInput } from '../_redux/actions/BankInfoAction';


const BankInfoAdd = withRouter(({ history }) => {


    const { register, setValue } = useForm();
    const dispatch = useDispatch();
    const bankInfoInput = useSelector((state) => state.bankInfo.bankInfoInput);
    const bankOptionData = useSelector((state) => state.bankInfo.bankOptionData);
    const bankInfo = useSelector(state => state.bankInfo.bankInfoMultiple);
    console.log('bankOptionData', bankOptionData)
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeBankInfoInput(name, value));
    };
    const multipleAdd = () => {
        dispatch(bankInfoSubmitMultiple(bankInfoInput));
    }

    useEffect(() => {
        dispatch(getBankName());
        if (bankInfo.length > 0) {
            setValue("intBankId", "");
        }
    }, [bankInfo]);
    console.log('bankInfo Adddd:>> ', bankInfo);
    return (
        <div className="container">
            <div className="mt-10">

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3">
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
                        <div className="col-md-3">
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
                        <div className="col-md-3">
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
                        <div className="col-md-3">
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
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-label mt-2 formFont">Bank Name</label>
                            <RHFInput
                                as={<Select options={bankOptionData} />}
                                rules={{ required: true }}
                                name="intBankId"
                                register={register}
                                value={bankInfoInput.strBankName}

                                onChange={(option) => {
                                    handleChangeTextInput("intBankId", option.value);
                                    handleChangeTextInput("strBankName", option.label);
                                }
                                }
                                setValue={setValue}

                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mt-2 formFont">Branch Name</label>
                            <Form.Control
                                type="text"
                                name="strBankBranchName"
                                className="fromStyle formHeight"
                                value={bankInfoInput.strBankBranchName}
                                onChange={(e) =>
                                    handleChangeTextInput(
                                        "strBankBranchName",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mt-2 formFont">IBAN(optional)</label>
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
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label mt-2 formFont">Is Default</label> <br />
                                    <label className="switch">
                                        <input type="checkbox" checked={bankInfoInput.isDefaultAccount ? true : false}
                                            onChange={(option) => handleChangeTextInput("isDefaultAccount", bankInfoInput.isDefaultAccount ? 0 : 1)}
                                        ></input>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-primary btn-sm mt-8 float-right"
                                        onClick={() => multipleAdd()}
                                    >
                                        Add
                                       </button>
                                </div>
                            </div>


                        </div>
                    </div>
                    {
                        bankInfo.length > 0 && (
                            <div className="react-bootstrap-table table-responsive mt-8">
                                <table className="table table table-head-custom table-vertical-center voyageTable">
                                    <thead>
                                        <th>SL</th>
                                        <th>ACCOUNT NAME</th>
                                        <th>ACCOUNT NO</th>
                                        <th>BRANCE NAME</th>
                                        <th>BANK NAME</th>
                                        <th>ROUTING NO</th>
                                        <th>IS DEFAULT</th>
                                        <th>ACTION</th>
                                    </thead>
                                    <tbody>
                                        {bankInfo.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strBeneficiaryName}</td>
                                                <td>{item.strBankAccountNo}</td>
                                                <td>{item.strBankBranchName}</td>
                                                <td>{item.strBankName}</td>
                                                <td>{item.strRoutingNo}</td>
                                                <td>{item.isDefaultAccount ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <a><i className="fas fa-trash-alt editIcon ml-4"
                                                        onClick={() => dispatch(deleteBankMultiple(index))}
                                                    ></i></a>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                </div>


            </div>
        </div >
    );
});

export default BankInfoAdd;
