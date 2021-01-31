import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PurchaseRequestCreateTable = () => {
    return (
        <div className="container table-form">
            <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ITEM ID</th>
                            <th scope="col">ITEM NAME</th>
                            <th scope="col">UOM</th>
                            <th scope="col">QTY</th>
                            <th scope="col">REMARKS</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>AKIJ</td>
                            <td>02</td>
                            <td>06</td>
                            <td>TESTING</td>
                            <td>
                                <Link>
                                    <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                                </Link>
                                <Link>
                                    <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>AKIJ Noor</td>
                            <td>02</td>
                            <td>06</td>
                            <td>TESTING</td>
                            <td>
                                <Link>
                                    <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                                </Link>
                                <Link>
                                    <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className="text-white booking-btn float-right" type="submit" variant="primary">
                    Save
                </Button>
                {/* {
              !isLoading && (
                <Button className="ml-4 text-white booking-btn" type="submit" variant="primary">
                  Book
                </Button>
              )}
            {isLoading && (
              <Button className="ml-4 text-white booking-btn" variant="primary" disabled={true}>
                <span className="p-2"> Booking.... </span>
                <span className="ml-3 spinner spinner-white "></span>
              </Button>
            )} */}
            </div>
        </div>

    );
};

export default PurchaseRequestCreateTable;