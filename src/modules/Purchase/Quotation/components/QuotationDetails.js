import { round } from "lodash";
import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getQuotationDetails, handleChangeQuotationDetailInput, submitQuotation } from "../_redux/actions/QuotationFilterAction";


const QuotationDetails = () => {

  const dispatch = useDispatch();
  const quotationDetailList = useSelector((state) => state.QuotationFilterinfo.quotationDetailList);
  const QuotationDetailInput = useSelector((state) => state.QuotationFilterinfo.QuotationDetailInput);
  const supplierData = useSelector((state) => state.QuotationFilterinfo.supplierData);
  const QuotationFilterInput = useSelector((state) => state.QuotationFilterinfo.QuotationFilterInput);
  const isLoading = useSelector((state) => state.QuotationFilterinfo.isLoading);

  const newData = supplierData;
  if (QuotationFilterInput.intSupplierId) {
    var FilterData = newData.filter((item) => item.intSupplierId === QuotationFilterInput.intSupplierId);
  }

  console.log('quotationDetailList', quotationDetailList);
  console.log('data', FilterData)



  const handleChangeTextInput = (name, value, item) => {
    dispatch(handleChangeQuotationDetailInput(name, value, item))
  }

  const handleSubmit = (e) => {
    dispatch(submitQuotation(quotationDetailList));
    e.preventDefault();
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
                          <td>{item.intSupplierQuotationId}</td>
                          <td>{item.intItemId}</td>
                          <td>{item.strItemName}</td>
                          <td>{item.intSupplierQuotationId}</td>
                          <td>{item.intSupplierQuotationId}</td>
                          <td>{item.numQuotationQty}</td>
                          <td >
                            <Form.Control
                              type="number"
                              name="numQuotationRate"
                              defaultValue="0"
                              className="fromStyle formHeight"
                              style={{ width: "60%" }}
                              onChange={(e) =>
                                handleChangeTextInput("numQuotationRate", e.target.value, item)
                              }
                            />
                          </td>
                          <td>{item.intTotal == null ? 0 : item.intTotal}</td>
                        </tr>
                      ))}


                    </tbody>

                  </table>

                  <div className="float-right mt-5">
                    {!isLoading && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Submit
                      </button>
                    )}

                    {isLoading && (
                      <button
                        className="btn btn-primary"
                        type="button"
                      >
                        <span>Submitting</span>
                        <span className="ml-3 spinner spinner-white"></span>
                      </button>
                    )}

                  </div>

                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-12">
            {FilterData && FilterData.map((item) => (

              <Card>

                <Card.Body className="pt-3">

                  <>
                    <h6 className="supplier-modal-header mb-2">Supplier Info</h6>
                    <div className="border-bottom"></div>
                    <div className="mt-3 supplier-info">

                      <table>
                        <tr>
                          <th scope="row">Supplier name</th>
                          <td>:</td>
                          <td>{item.strSupplierName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Supplier Address</th>
                          <td>:</td>
                          <td>{item.strEmail}</td>
                        </tr>
                        <tr>
                          <th scope="row">Supplier Contact</th>
                          <td>:</td>
                          <td>{item.strContactNumber}</td>
                        </tr>
                        <tr>
                          <th scope="row">Supplier Email</th>
                          <td>:</td>
                          <td>{item.strEmail}</td>
                        </tr>
                      </table>
                      {/* <div className="row">
                        <div className="col-sm-5">
                          <p>Supplier name</p>
                        </div>
                        <div className="col-sm-7">
                          <p>: {item.strSupplierName}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-5">
                          <p>Supplier Address</p>
                        </div>
                        <div className="col-sm-7">
                          <p>: {item.strEmail}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-5">
                          <p>Supplier Contact</p>
                        </div>
                        <div className="col-sm-7">
                          <p>: {item.strContactNumber}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-5">
                          <p>Supplier Email</p>
                        </div>
                        <div className="col-sm-7">
                          <p>: {item.strEmail}</p>
                        </div>
                      </div> */}

                    </div>
                  </>

                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuotationDetails;
