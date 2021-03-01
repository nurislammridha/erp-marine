import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { getCurrencyList } from "../../../master/DropDownData/Currency/_redux/CurrencyAction/CurrencyAction";
import { getPaymentTerms } from "../../../master/DropDownData/PaymentTerms/_redux/PaymentTermsAction/PaymentTermsAction";
import { changeAccountsInformation, SubmitAccountsInformation } from "../_redux/actions/AccountsInformationAction";

const AccountsInformation = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors, setValue } = useForm();
  const CurrencyList = useSelector((state) => state.CurrencyListReducer.CurrencyList);
  const paymentTerms = useSelector((state) => state.PaymentTermsReducer.paymentTerms);
  const accountsInfoInput = useSelector((state) => state.accountInfo.accountsInfoInput);
  const isLoading = useSelector((state) => state.accountInfo.isLoading);

  console.log('accountsInfoInput :>> ', accountsInfoInput);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dispatch(getCurrencyList())
    dispatch(getPaymentTerms())
  }, [])

  const handleChangeTextInput = (name, value) => {
    dispatch(changeAccountsInformation(name, value));
  };

  const handleSubmitAccountsInfo = (e) => {
    dispatch(SubmitAccountsInformation(accountsInfoInput));
    // e.preventDefault();
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b pl-5 pr-5 mb-1 card-top-border">
              <div className="mt-5">
                <h3 className="mb-0 pb-0">Accounts Information</h3>
              </div>
              <hr></hr>
              <form
                className="form form-label-right voyageEngineerForm"
                onSubmit={handleSubmit(handleSubmitAccountsInfo)}
                method="post"
                autoComplete="off"
              >

                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">
                        Invoice Value
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type"
                        className="formHeight"
                        name="numInvoiceValue"
                        value={accountsInfoInput.numInvoiceValue}
                        onChange={(e) => handleChangeTextInput("numInvoiceValue", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.numInvoiceValue &&
                          errors.numInvoiceValue.type === 'required' &&
                          "Invoice value can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Currency</label>
                    <RHFInput
                      as={<Select options={CurrencyList} />}
                      rules={{ required: true }}
                      name="intCurrencyId"
                      register={register}
                      value={accountsInfoInput.currency}
                      onChange={(option) => (
                        handleChangeTextInput("intCurrencyId", option.value),
                        handleChangeTextInput("currency", option)
                      )}
                      setValue={setValue}
                    />
                    <div className="text-danger font-weight-bold m-1">
                      {errors.intCurrencyId &&
                        errors.intCurrencyId.type === 'required' &&
                        "Currency can't be blank !"}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">PO Number</label>
                    <Form.Control
                      type="text"
                      placeholder="Type"
                      className="formHeight"
                      name="intPOId"
                      value={accountsInfoInput.intPOId}
                      onChange={(e) => handleChangeTextInput("intPOId", e.target.value)}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <div className="text-danger font-weight-bold m-1">
                      {errors.intPOId &&
                        errors.intPOId.type === 'required' &&
                        "PO number can't be blank !"}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">PO Date</label>
                    <DatePicker
                      className="date-picker"
                      type="date"
                      name="dtePODate"
                      selected={accountsInfoInput.dtePODate}
                      onChange={(date) => handleChangeTextInput("dtePODate", date)}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                    <div className="text-danger font-weight-bold m-1">
                      {errors.dtePODate &&
                        errors.dtePODate.type === 'required' &&
                        "PO date can't be blank !"}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Payment Terms</label>
                    <RHFInput
                      as={<Select options={paymentTerms} />}
                      rules={{ required: true }}
                      name="intPaymentTermsId"
                      register={register}
                      value={accountsInfoInput.paymentTerms}
                      onChange={(option) => (
                        handleChangeTextInput("intPaymentTermsId", option.value),
                        handleChangeTextInput("paymentTerms", option)
                      )}
                      setValue={setValue}
                    />
                    <div className="text-danger font-weight-bold m-1">
                      {errors.intPaymentTermsId &&
                        errors.intPaymentTermsId.type === 'required' &&
                        "Payment terms can't be blank !"}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">
                        Methods of Depreciation
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        className="formHeight"
                        name="strMethodOfDepreciation"
                        value={accountsInfoInput.strMethodOfDepreciation}
                        onChange={(e) => handleChangeTextInput("strMethodOfDepreciation", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.strMethodOfDepreciation &&
                          errors.strMethodOfDepreciation.type === 'required' &&
                          "Methods of depreciation can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">
                        Total Acquisition Cost
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="numTotalAcquisitionCost"
                        value={accountsInfoInput.numTotalAcquisitionCost}
                        onChange={(e) => handleChangeTextInput("numTotalAcquisitionCost", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.numTotalAcquisitionCost &&
                          errors.numTotalAcquisitionCost.type === 'required' &&
                          "Total acquisition cost can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Remarks</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="strRemarks"
                        value={accountsInfoInput.strRemarks}
                        onChange={(e) => handleChangeTextInput("strRemarks", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.strRemarks &&
                          errors.strRemarks.type === 'required' &&
                          "Remarks can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Landed Cost</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="numLandedCost"
                        value={accountsInfoInput.numLandedCost}
                        onChange={(e) => handleChangeTextInput("numLandedCost", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.numLandedCost &&
                          errors.numLandedCost.type === 'required' &&
                          "Landed cost can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">
                        Erection and other Cost
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="numErectionAndOtherCost"
                        value={accountsInfoInput.numErectionAndOtherCost}
                        onChange={(e) => handleChangeTextInput("numErectionAndOtherCost", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.numErectionAndOtherCost &&
                          errors.numErectionAndOtherCost.type === 'required' &&
                          "Erection and other cost can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">
                        Total Accumulated Dep
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="strTotalAccumulatedDep"
                        value={accountsInfoInput.strTotalAccumulatedDep}
                        onChange={(e) => handleChangeTextInput("strTotalAccumulatedDep", e.target.value)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.strTotalAccumulatedDep &&
                          errors.strTotalAccumulatedDep.type === 'required' &&
                          "Total accumulated dep can't be blank !"}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6 mt-5">
                    <Form.Group controlId="formBasicChecbox">
                      <Form.Check
                        type="checkbox"
                        label="Is Tax Account"
                        name="isTaxAccount"
                        checked={accountsInfoInput.isTaxAccount == "0" ? false : true}
                        onChange={(e) => handleChangeTextInput("isTaxAccount", accountsInfoInput.isTaxAccount == "0" ? "1" : "0")}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="text-danger font-weight-bold m-1">
                        {errors.isTaxAccount &&
                          errors.isTaxAccount.type === 'required' &&
                          "Please check is tax ammount ?"}
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="mt-5 float-right pb-5">
                  {
                    !isLoading && (
                      <Button className="saveButton text-white" type="submit" variant="">
                        Submit
                      </Button>
                    )
                  }
                  {
                    isLoading && (
                      <Button className="saveButton text-white" disabled={true} variant="">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...
                      </Button>

                    )
                  }
                </div>
                <div className="clear-fix" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountsInformation;
