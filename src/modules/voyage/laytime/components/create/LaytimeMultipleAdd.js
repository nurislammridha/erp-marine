import { Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";

const LaytimeMultipleAdd = () => {
    const [show, setShow] = useState(false);


    return (

        <div className="">
            <div className="card card-custom gutter-b">
                <div className="ml-5 react-bootstrap-table table-responsive pr-15">
                    <table className="table table table-head-custom table-vertical-center voyageTable mt-3">
                        <thead>
                            <tr>

                                <th>OPERATION</th>
                                <th> PORT</th>
                                <th> CARGO</th>
                                <th> CARGO QTY</th>
                                <th> COMMENCED</th>
                                <th> COMPLETED</th>
                                <th class="text-right pr-3">ACTION</th>
                            </tr>
                            <tr>

                                <td>#01</td>
                                <td>#01</td>
                                <td>#01</td>
                                <td>Durres(Durazzo)</td>
                                <td>Akij Noor</td>
                                <td>Akij Noor</td>
                                <td className="text-right pr-3 mt-3">
                                    <a
                                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </a>
                                    <button type="submit" class="saveButton text-white btn ml-3" onClick={() => setShow(!show)}>SOF</button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                {show && (
                    <div className="ml-5 mt-10">
                        <Tabs defaultActiveKey="SOF" id="uncontrolled-tab-example">
                            <Tab eventKey="SOF" title="SOF">
                                <div className="react-bootstrap-table table-responsive pr-10">
                                    <table className="table table table-head-custom table-vertical-center voyageTable mt-3">
                                        <thead>
                                            <tr>

                                                <th>START DATE</th>
                                                <th> END DATE</th>
                                                <th> TIME TO COUNT</th>
                                                <th> PERCENT</th>
                                                <th> REMARKS</th>
                                                <th class="text-right pr-3">ACTION</th>
                                            </tr>
                                            <tr>

                                                <td>#01</td>
                                                <td>#01</td>
                                                <td>
                                                    <Form.Control as="select">
                                                        <option>#01</option>
                                                        <option>#02</option>
                                                        <option>#03</option>
                                                        <option>#04</option>
                                                    </Form.Control>
                                                </td>
                                                <td>Durres(Durazzo)</td>
                                                <td>Akij Noor</td>
                                                <td className="text-right pr-3 mt-3">
                                                    <a
                                                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </a>
                                                    <a
                                                        className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Tab>
                            <Tab eventKey="Operations" title="Operations">
                                <div className="react-bootstrap-table table-responsive pr-10">
                                    <table className="table table table-head-custom table-vertical-center voyageTable mt-3">
                                        <thead>
                                            <tr>
                                                <th> DATE</th>
                                                <th> REMARKS</th>
                                                <th class="text-right pr-3">ACTION</th>
                                            </tr>
                                            <tr>
                                                <td>Durres(Durazzo)</td>
                                                <td>Akij Noor</td>

                                                <td className="text-right pr-3 mt-3">
                                                    <a
                                                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </a>
                                                    <a
                                                        className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Tab>

                        </Tabs>
                        <div className="row mt-5 mb-5">
                            <div className="col-sm-10">

                            </div>
                            <div className="col-sm-2 ">
                                {/* <a onClick={() => {
                                            history.push("/voyage/laytime/laytimeinfo2");
                                        }}> */}
                                <button type="submit" class="saveButton text-white btn ml-13">Save</button>
                                {/* </a> */}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>



    );
}

export default LaytimeMultipleAdd;
