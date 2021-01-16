import React from 'react';
import { Form, Button, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

const LaytimeHeaderModal = () => {

    const { register, handleSubmit, errors, setValue } = useForm();
    const isLoading = "";
    return (
        <div>
            <form
                className="form form-label-right"
                method="post"
            >
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-8">
                            <label className="form-label mt-2 formFont">Demurrage Rate</label>
                            <Form.Control
                                type="number"
                                name="numDemurrageRate"
                                className="fromStyle formHeight"
                            // value={laytimeDetailInput.numDemurrageRate}
                            // onChange={(e) =>
                            //     handleChangeTextInput(
                            //         "numDemurrageRate",
                            //         e.target.value
                            //     )
                            // }
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label mt-5 formFont"></label>
                            <Form.Control
                                type="number"
                                name="numDespatchRate"
                                className="fromStyle formHeight"
                            // value={laytimeDetailInput.numDespatchRate}
                            // onChange={(e) =>
                            //     handleChangeTextInput(
                            //         "numDespatchRate",
                            //         e.target.value
                            //     )
                            // }
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <label className="form-label mt-2 formFont">Despatch Rate</label>
                            <Form.Control
                                type="number"
                                name="numDespatchRate"
                                className="fromStyle formHeight"
                            // value={laytimeDetailInput.numDespatchRate}
                            // onChange={(e) =>
                            //     handleChangeTextInput(
                            //         "numDespatchRate",
                            //         e.target.value
                            //     )
                            // }
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label mt-5 formFont"></label>
                            <Form.Control
                                type="number"
                                name="numDespatchRate"
                                className="fromStyle formHeight"
                            // value={laytimeDetailInput.numDespatchRate}
                            // onChange={(e) =>
                            //     handleChangeTextInput(
                            //         "numDespatchRate",
                            //         e.target.value
                            //     )
                            // }
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

export default LaytimeHeaderModal;
