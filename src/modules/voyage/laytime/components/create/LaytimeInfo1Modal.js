import React from 'react';
import { Form, Button, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

const LaytimeInfo1Modal = () => {

    const { register, handleSubmit, errors, setValue } = useForm();
    const isLoading = "";
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
    return (
        <div>
            <form
                className="form form-label-right"
                method="post"
            >
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-8">
                            <label className="form-label">Demurrage Rate</label>
                            <RHFInput
                                as={<Select options={selectOptions} />}
                                rules={{ required: true }}
                                name=""
                                register={register}
                                value=""
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label mt-4"></label>
                            <RHFInput
                                as={<Select options={selectOptions} />}
                                rules={{ required: true }}
                                name=""
                                register={register}
                                value=""
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <label className="form-label">Despatch Rate</label>
                            <RHFInput
                                as={<Select options={selectOptions} />}
                                rules={{ required: true }}
                                name=""
                                register={register}
                                value=""
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label mt-4"></label>
                            <RHFInput
                                as={<Select options={selectOptions} />}
                                rules={{ required: true }}
                                name=""
                                register={register}
                                value=""
                            />
                        </div>
                    </div>
                    <div className="row ml-1 mt-3">
                        {!isLoading && (
                            <Button variant="primary" type="submit" className="saveButton">
                                Add
                            </Button>
                        )}
                        {isLoading && (
                            <Button
                                variant="primary"
                                type="submit"
                                className="saveButton"
                                disabled={true}
                            >
                                <span className="p-2">
                                    Adding...
                                </span>
                                <span className="ml-3 spinner spinner-white "></span>
                            </Button>
                        )}
                    </div>
                </div>

            </form>
        </div>
    );
}

export default LaytimeInfo1Modal;
