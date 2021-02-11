import { round } from "lodash";
import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getQuotationDetails, submitQuotation } from "../_redux/actions/QuotationFilterAction";


const QuotationDetails = () => {

  const dispatch = useDispatch();
  const quotationDetailList = useSelector((state) => state.QuotationFilterinfo.quotationDetailList);
  const QuotationFilterInput = useSelector((state) => state.QuotationFilterinfo.QuotationFilterInput);
  const isLoading = useSelector((state) => state.QuotationFilterinfo.isLoading);
  console.log('quotationDetailList', quotationDetailList)
  const handleSubmit = () => {
    dispatchEvent(submitQuotation())
  }

  useEffect(() => {
    dispatch(getQuotationDetails());
  }, [])

  return (
    <>
      {!quotationDetailList && (
        <div className="text-center display-block bg-warning mt-5 rounded text-white p-5">
          <h4>please give quotating number</h4>
        </div>
      )}
      {quotationDetailList && (

        <div className="row mt-5">
          <div className="col-lg-8 col-12">
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
                    </thead>
                    <tbody>

                      {quotationDetailList.length && quotationDetailList.map((item, index) => (


                        <tr>
                          <td>{index + 1}</td>
                          {console.log('item', item.strRemarks)}
                          <td>{item.intSupplierQuotationId}</td>
                          <td>{item.intItemId}</td>
                          <td>{item.strItemName}</td>
                          <td>{item.intSupplierQuotationId}</td>
                          <td>{item.intSupplierQuotationId}</td>
                          <td>{round(item.numQuotationQty)}</td>
                          <td >
                            <Form.Control
                              type="number"
                              name="numQuotationRate"
                              defaultValue={round(item.numQuotationRate)}
                              className="fromStyle formHeight"
                              style={{ width: "60%" }}
                            />
                          </td>
                          <td>100</td>
                        </tr>
                      ))}


                    </tbody>

                  </table>

                  <div className="float-right mt-5">
                    {!isLoading && (
                      <Button

                        onClick={() => handleSubmit()}
                      >
                        Submit
                      </Button>
                    )}

                    {isLoading && (
                      <Button

                        type="button"
                      >
                        <span>Submitting</span>
                        <span className="ml-3 spinner spinner-white"></span>
                      </Button>
                    )}

                  </div>

                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-12">
            <Card>
              <Card.Body className="pt-3">
                <h6 className="supplier-modal-header mb-2">Supplier Info</h6>
                <div className="border-bottom"></div>
                <div className="mt-3 supplier-info">
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Supplier name</p>
                    </div>
                    <div className="col-sm-7">
                      <p>:</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Supplier Address</p>
                    </div>
                    <div className="col-sm-7">
                      <p>:</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Supplier Contact</p>
                    </div>
                    <div className="col-sm-7">
                      <p>:</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <p>Supplier Email</p>
                    </div>
                    <div className="col-sm-7">
                      <p>:</p>
                    </div>
                  </div>

                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default QuotationDetails;
