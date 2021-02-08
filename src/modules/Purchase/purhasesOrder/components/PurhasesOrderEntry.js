import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../_metronic/_assets/css/default-style.css";
import "../../../../styles/global-style.css";
import { Form, Card } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import PurchaseOrderMultiple from "./PurchaseOrderMultiple";
import { FinalOrderInput, getIncotermName } from "../_redux/actions/PurhasesOrderAction";
import { getPaymentTerms } from "../../../master/DropDownData/PaymentTerms/_redux/PaymentTermsAction/PaymentTermsAction";
import { getCurrencyList } from "../../../master/DropDownData/Currency/_redux/CurrencyAction/CurrencyAction";
import { getSupplierName } from "../../../master/DropDownData/SupplierName/_redux/SupplierNameAction/SupplierNameAction";

const PurhasesOrderEntry = () => {
  const dispatch = useDispatch()
  const { register, setValue } = useForm();
  const finalOrderInput = useSelector(state => state.purchasesOrderInfo.finalOrderInput);
  const incotermList = useSelector(state => state.purchasesOrderInfo.incotermList);
  const paymentTerms = useSelector(state => state.PaymentTermsReducer.paymentTerms);
  const CurrencyList = useSelector(state => state.CurrencyListReducer.CurrencyList);
  const supplierNameList = useSelector(state => state.SupplierNameReducer.supplierNameList);
  console.log('incotermList :>> ', incotermList);
  const handleChangeTextInput = (name, value) => {
    dispatch(FinalOrderInput(name, value));
  }
  useEffect(() => {
    dispatch(getPaymentTerms())
    dispatch(getCurrencyList())
    dispatch(getSupplierName())
    dispatch(getIncotermName())
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-md-9 col-12 mr-0 pr-0">
          <Card className="mr-0 pr-0">
            <Card.Body className="pt-5 mt-0">
              <div className="row">
                <div className="col-lg-3">
                  <h6 className="text-bold">PURCHASE ORDER</h6>
                </div>
                <div className="col-lg-9">
                  <hr className="hr-margin"></hr>
                </div>
              </div>

              <form
                className="form form-label-right voyageEngineerForm" autoComplete="off" >
                <div className="form-group row mb-1">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Supplier Name</label>
                    <RHFInput
                      as={<Select options={supplierNameList} />}
                      rules={{ required: false }}
                      name="inSupplierId"
                      register={register}
                      value={finalOrderInput.strSupplierName}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeTextInput("inSupplierId", option.value);
                        handleChangeTextInput("strSupplierName", option.label);
                      }}
                    />
                  </div>
                  {/* <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Supplier Address</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name=""
                        type="text"
                        // value={""}
                        placeholder="Enter Address No"
                      />
                    </Form.Group>
                  </div> */}
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Order Date</label>
                    <DatePicker
                      className="date-picker"
                      name="dtePODate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="Enter Order Date"
                      selected={finalOrderInput.dtePODate}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                      onChange={(e) => handleChangeTextInput("dtePODate", e)}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Currency</label>
                    <RHFInput
                      as={<Select options={CurrencyList} />}
                      rules={{ required: false }}
                      name="intCurrencyId"
                      register={register}
                      value={finalOrderInput.strCurrencyCode}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeTextInput("intCurrencyId", option.value);
                        handleChangeTextInput("strCurrencyCode", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Payment Terms</label>
                    <RHFInput
                      as={<Select options={paymentTerms} />}
                      rules={{ required: false }}
                      name="intPaymentTerms"
                      register={register}
                      value={finalOrderInput.intPaymentTerms}
                      setValue={setValue}
                      onChange={(option) => handleChangeTextInput("intPaymentTerms", option.value)}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Cash/Advance</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="numCaseInPercent"
                        type="number"
                        value={finalOrderInput.numCaseInPercent}
                        placeholder="Enter Cash/Advance"
                        onChange={(e) => handleChangeTextInput("numCaseInPercent", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                    <label className="formFont">Pay Days</label>
                    <DatePicker
                      className="date-picker"
                      name="dtePayDays"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="Select Pay Days"
                      selected={finalOrderInput.dtePayDays}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                      onChange={(e) => handleChangeTextInput("dtePayDays", e)}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>
          <Card className="ml-0 pl-0">
            <Card.Body className="pt-5 mt-0">

              <PurchaseOrderMultiple />

            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-12 ml-0 pl-0">
          <Card className="ml-0 pl-0">
            <Card.Body className="pt-5 mt-0">
              <form
                className="form form-label-right voyageEngineerForm" autoComplete="off" >
                <div className="form-group row mb-1">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <label className="formFont">Incoterm</label>
                    <RHFInput
                      as={<Select options={incotermList} />}
                      rules={{ required: false }}
                      name="intIncotermsId"
                      register={register}
                      value={finalOrderInput.intIncotermsId}
                      setValue={setValue}
                      onChange={(option) => handleChangeTextInput("intIncotermsId", option.value)}
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Supplier Reference</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="strSupplierReference"
                        type="text"
                        value={finalOrderInput.strSupplierReference}
                        placeholder="Enter Supplier Reference"
                        onChange={(e) => handleChangeTextInput("strSupplierReference", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <label className="formFont">Reference Date</label>
                    <DatePicker
                      className="date-picker"
                      name="dteReferenceDate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="Select Reference Date"
                      selected={finalOrderInput.dteReferenceDate}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                      onChange={(e) => handleChangeTextInput("dteReferenceDate", e)}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <label className="formFont">Validity</label>
                    <DatePicker
                      className="date-picker"
                      name="dtePOValidityDate"
                      dateFormat="MM-dd-yyyy"
                      placeholderText="Select Validity Date"
                      selected={finalOrderInput.dtePOValidityDate}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                      onChange={(e) => handleChangeTextInput("dtePOValidityDate", e)}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Other terms</Form.Label>
                      <Form.Control
                        className="formHeight"
                        name="strOtherTerms"
                        type="text"
                        value={finalOrderInput.strOtherTerms}
                        placeholder="Enter Other terms"
                        onChange={(e) => handleChangeTextInput("strOtherTerms", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>

        </div>
      </div>

    </>
  );
};

export default PurhasesOrderEntry;
