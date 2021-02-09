import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";


const QuotationDetails = () => {

  return (
    <>

      <div className="row mt-5">
        <div className="col-xl-8 co-lg-8 col-12">
          <Card>
            <Card.Body className="pt-5">
              <div className="border-top"></div>
              <div className="react-bootstrap-table table-responsive ">
                <table className="table table table-head-custom table-vertical-center voyageTable quotation-table">
                  <thead>
                    <tr>
                      <th scope="col">SL NO</th>
                      <th scope="col">INDENT NO</th>
                      <th scope="col">ITEM ID</th>
                      <th scope="col">ITEM NAME</th>
                      <th scope="col">UOM</th>
                      <th scope="col">REMARKS</th>
                      <th scope="col">RFQ QTY</th>
                      <th scope="col">RATE</th>
                      <th scope="col">TOTAL</th>
                    </tr>
                    <tr>
                      <td>#01</td>
                      <td>2021</td>
                      <td>Container Cargo</td>
                      <td>8567</td>
                      <td>123</td>
                      <td>123</td>
                      <td>12</td>
                      <td >
                        <Form.Control
                          type="number"
                          name="numRate"
                          className="fromStyle formHeight"
                          style={{ width: "60%" }}
                        />
                      </td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>#01</td>
                      <td>2021</td>
                      <td>Container Cargo</td>
                      <td>8567</td>
                      <td>123</td>
                      <td>123</td>
                      <td>14</td>
                      <td>
                        <Form.Control
                          type="number"
                          name="numRate"
                          className="fromStyle formHeight"
                          style={{ width: "60%" }}
                        />
                      </td>
                      <td>100</td>
                    </tr>
                  </thead>
                </table>

                <Button
                  className="mr-4 text-white float-right mt-5"
                  variant="primary"
                >
                  Submit
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 col-12">
          <Card>
            <Card.Body className="pt-3">
              <h6 className="supplier-modal-header mb-2">Supplier Info</h6>
              <div className="border-bottom"></div>
              <div className="row mt-3 supplier-info">

                <div className="col-5">

                  <p>Supplier name</p>
                  <p>Supplier Address</p>
                  <p>Supplier Contact</p>
                  <p>Supplier Email</p>
                </div>
                <div className="col-1">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="col-6">
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default QuotationDetails;
