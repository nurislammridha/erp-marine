import React from 'react';
import { withRouter } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';

const OthersInfoAdd = withRouter(({ history }) => {

    const selectOptions = [
        {
            name: 'Port of Chittagong',
            id: "1"
        },
        {
            name: 'Port of Payra',
            id: "2"
        },
        {
            name: 'Port of Mongla',
            id: "3"
        },
        {
            name: 'Port of Matarbari',
            id: "4"
        }
    ]

    return (
        <div className="container">
            <div className="mt-10">

                <form
                    className="form form-label-right"
                    method="post"
                >
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Port Served</label>
                                <Multiselect
                                    options={selectOptions}
                                    displayValue="name"
                                    showCheckbox={true}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Product or Service Supplied</label>
                                <Multiselect
                                    options={selectOptions}
                                    displayValue="name"
                                    showCheckbox={true}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label mt-2 formFont">Service List</label>
                                <Multiselect
                                    options={selectOptions}
                                    displayValue="name"
                                    showCheckbox={true}
                                />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div >
    );
});

export default OthersInfoAdd;
