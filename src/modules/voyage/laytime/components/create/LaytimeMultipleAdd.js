import React from 'react';
import { Tab, Tabs } from "react-bootstrap";

const LaytimeMultipleAdd = () => {
    return (
        <div>
            <div className="col-md-9">
                <div className="card card-custom gutter-b">
                    <div className="react-bootstrap-table table-responsive mt-3 ml-4">
                        <table className="table table table-head-custom table-vertical-center">
                            <thead>
                                <tr className="text-muted">
                                    <td>OPERATION</td>
                                    <td>PORT</td>
                                    <td>CARGO</td>
                                    <td>CARGO QTY</td>
                                    <td>COMMENCED</td>
                                    <td>COMPLETED</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td >
                                        <a
                                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </a>
                                        <button className="ml-3 saveButton text-white btn">SOF</button>
                                    </td>
                                </tr>


                            </tbody>

                            <tfoot>

                            </tfoot>

                        </table>
                    </div>
                    <div className="ml-5">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="SOF">
                                <table className="table table table-head-custom table-vertical-center mt-3">
                                    <thead>
                                        <tr className="text-muted">
                                            <td>START DATE</td>
                                            <td>END DATE</td>
                                            <td>TIME TO COUNT</td>
                                            <td>PERCENT</td>
                                            <td>REMARKS</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                            <td >
                                                <a
                                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                                >
                                                    <i class="fas fa-plus"></i>
                                                </a>
                                                <a
                                                    className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </a>

                                            </td>
                                        </tr>


                                    </tbody>

                                    <tfoot>

                                    </tfoot>

                                </table>
                            </Tab>
                            <Tab eventKey="profile" title="Operations">
                                <table className="table table table-head-custom table-vertical-center mt-3">
                                    <thead>
                                        <tr className="text-muted">
                                            <td>DATE</td>
                                            <td>REMARKS</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td></td>
                                            <td></td>

                                            <td >
                                                <a
                                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                                >
                                                    <i class="fas fa-plus"></i>
                                                </a>
                                                <a
                                                    className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </a>

                                            </td>
                                        </tr>


                                    </tbody>

                                    <tfoot>

                                    </tfoot>

                                </table>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
            </div>
        </div>
    );
}

export default LaytimeMultipleAdd;
