import React from 'react';

const LaytimeDetail = () => {
    return (
        <div>
            <div className="card card-custom">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Details</h3>
                    </div>
                </div>
                <div className="card-body">
                    <table>
                        <tr>
                            <td>Time Allowed</td>
                            <td>:  34352</td>
                        </tr>
                        <tr>
                            <td>Total Used</td>
                            <td>:  255</td>
                        </tr>
                        <tr>
                            <td>Times Remaining</td>
                            <td>:  868347</td>
                        </tr>
                        <tr>
                            <td>Time Counting Form</td>
                            <td>:  34352</td>
                        </tr>
                        <tr>
                            <td>Time Counting Until</td>
                            <td>:  255</td>
                        </tr>
                        <tr>
                            <td>Despatch Rate</td>
                            <td>:  868347</td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default LaytimeDetail;
