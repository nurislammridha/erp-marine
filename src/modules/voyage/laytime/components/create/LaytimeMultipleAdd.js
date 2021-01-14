import React from 'react';

const LaytimeMultipleAdd = () => {
    return (
        <div>
            <div className="col-md-9">
                <div className="container card card-custom gutter-b">
                    <div className="react-bootstrap-table table-responsive mt-3">
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
                                            <i className="fa fa-times-circle"></i>
                                        </a>
                                    </td>
                                </tr>


                            </tbody>

                            <tfoot>

                            </tfoot>

                        </table>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
            </div>
        </div>
    );
}

export default LaytimeMultipleAdd;
