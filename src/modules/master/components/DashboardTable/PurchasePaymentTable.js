import React, { useEffect, useState } from "react";

import { Card } from "react-bootstrap";

const PurchasePaymentTable = () => {
  return (
    <Card>
      <Card.Body>
        <div className="container ">
          <h1 className="sales-payment-heading mb-5">Purchase Payment Due</h1>
          <div className="react-bootstrap-table table-responsive">
            <table className="table table table-bordered table-head-custom table-vertical-center dashboard-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Reference NO.</th>
                  <th> Due Amount</th>
                </tr>
                <tr>
                  <td>#01</td>

                  <td>Durres(Durazzo)</td>
                  <td>Akij Noor</td>
                </tr>
              </thead>
            </table>
            <p className="text-center p-4 dashboard-table-text">
              No data available in table
            </p>
            <div className="mt-3">
              <p className="float-left mt-3 show-value-text">
                Showing 0 to 0 entries
              </p>
              <button className="btn text-white float-right invoice-btn">
                Print Invoice{" "}
                <img className="ml-2" src="/media/dashboard/Frame.svg" />
              </button>
            </div>
            <div className="clear-fix"></div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PurchasePaymentTable;
