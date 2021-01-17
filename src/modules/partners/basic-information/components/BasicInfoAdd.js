import React from 'react'
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

export default function BasicInfoAdd() {

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

    return (
        <div className="container">
            <div className="card card-custom gutter-b">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Basic Information</h3>
                    </div>
                </div>
                <div className="card-body">
                    <form
                        className="form form-label-right"
                        method="post"
                    >
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Partner Name</label>
                                    <Form.Control
                                        type="text"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Contact No</label>
                                    <Form.Control
                                        type="number"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Partner Type</label>
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
                                    <label className="form-label mt-2 formFont">Licence No</label>
                                    <Form.Control
                                        type="text"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Email</label>
                                    <Form.Control
                                        type="email"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Business Unit</label>
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
                                    <label className="form-label mt-2 formFont">Bil No</label>
                                    <Form.Control
                                        type="number"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Tin No</label>
                                    <Form.Control
                                        type="number"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Partner Code</label>
                                    <Form.Control
                                        type="number"
                                        name=""
                                        className="fromStyle formHeight"
                                    // value={}
                                    // onChange={(e) =>
                                    //     handleChangeTextInput(
                                    //         "intVoyageNumber",
                                    //         e.target.value
                                    //     )
                                    // }
                                    />
                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">TAX Type</label>
                                    <RHFInput
                                        as={<Select options={selectOptions} />}
                                        rules={{ required: true }}
                                        name=""
                                        register={register}
                                        value=""
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="form-group row">
                            <div className="col-md-11">

                            </div>
                            <div className="col-md-1">
                                {/* <a onClick={() => {
                                            history.push("/voyage/laytime/laytimeinfo2");
                                        }}> */}
                                <button type="button" class="saveButton text-white btn mt-5">Next</button>
                                {/* </a> */}
                            </div>

                        </div>

                    </form>
                </div>
            </div>

        </div >
    );
}

