import React from 'react';
import { withRouter } from "react-router-dom";

const OthersInfoAdd = withRouter(({ history }) => {
    return (
        <div className="container">
            <div className="card card-custom gutter-b">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Others Information</h3>
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
                                    <label className="form-label mt-2 formFont">Port Served</label>

                                </div>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-5">
                                    <label className="form-label mt-2 formFont">Account No</label>

                                </div>
                            </div>



                        </div>

                        <div className="form-group row mt-5">
                            <div className="col-md-9">

                            </div>
                            <div className="col-md-3">
                                <div className="float-right">
                                    <a onClick={() => {
                                        history.push("/partners/bank-info");
                                    }}>
                                        <button type="button" class="saveButton text-white btn">Previous</button>
                                    </a>
                                    {/* <a onClick={() => {
                                            history.push("/voyage/laytime/laytimeinfo2");
                                        }}> */}
                                    <button type="button" class="saveButton text-white btn ml-3">Next</button>
                                    {/* </a> */}
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
});

export default OthersInfoAdd;
