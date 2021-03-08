import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import { EmptyCurrencyConversionAddMessage, GetCurrencyData,AddCurrencyConversion } from "../../_redux/actions/CurrencyAction";

const CurrencyConversionEntry = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();

  const [currencyInfo, setCurrencyInfo] = React.useState({
    convertedFromData: {
      value:1,
      label:'USD'
    },
    convertedToData: {
      value:2,
      label:'BDT'
    },
    decUSDAmount: 1,
    decBDTAmount: ""
  });


  const handleChange = ({ currentTarget: input }) => {
    const currencyInfoData = { ...currencyInfo };
    currencyInfoData[input.name] = input.value;
    setCurrencyInfo(currencyInfoData);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandle = (item, name) => {
    const currencyInfoData = { ...currencyInfo };
    currencyInfoData[name] = item;
    setCurrencyInfo(currencyInfoData);
  };

  const addStatus = useSelector((state) => state.currencyInfo.addStatus);
  const addMessage = useSelector((state) => state.currencyInfo.addMessage);
  const currencyList = useSelector((state) => state.currencyInfo.currencyList);
  let currency = [];
  if (currencyList) {
    currencyList.forEach((item) => {
      let items = {
        value: item.intCurrencyID,
        label: item.strCurrencyName,
      };
      currency.push(items);
    });
  }


  useEffect(() => {
    dispatch(GetCurrencyData());

    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      toast.error("Somthing Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      disableLoading();
      if (addStatus && addMessage.length > 0) {
        toast.success(addMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyCurrencyConversionAddMessage());
        // history.push("/vessel-items/list");
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyCurrencyConversionAddMessage());
      }
    }
  }, [addStatus, addMessage]);

  const onSubmit = async (e) => {
    console.log('SubmitData',currencyInfo);
    enableLoading();
    dispatch(AddCurrencyConversion(currencyInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Currency Conversion</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row mt-5">
                <div className="col-lg-4">
                  <label className="form-label">Currency Converted From</label>
                  <RHFInput
                    as={<Select options={currency} />}
                    rules={{ required: true }}
                    name="convertedFromData"
                    register={register}
                    defaultValue={currencyInfo.convertedFromData}
                    value={currencyInfo.convertedFromData}
                    onChange={(e) => selectHandle(e, "convertedFromData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.convertedFromData &&
                      errors.convertedFromData.type === "required" &&
                      "This Can't be blank"}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Currency Converted To</label>
                  <RHFInput
                    as={<Select options={currency} />}
                    rules={{ required: true }}
                    name="convertedToData"
                    register={register}
                    defaultValue={currencyInfo.convertedToData}
                    value={currencyInfo.convertedToData}
                    onChange={(e) => selectHandle(e, "convertedToData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.convertedToData &&
                      errors.convertedToData.type === "required" &&
                      "This Can't be blank"}
                  </div>
                </div>
               
                <div className="col-lg-4">
                  <label className="form-label">USD Amount</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Quantity Available"
                    name="decUSDAmount"
                    className="fromStyle"
                    defaultValue={currencyInfo.decUSDAmount}
                    value={currencyInfo.decUSDAmount}
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.decUSDAmount &&
                      errors.decUSDAmount.type === "required" &&
                      "USD Amount Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">BDT Amount</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Purchase Price"
                    name="decBDTAmount"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.decBDTAmount &&
                      errors.decBDTAmount.type === "required" &&
                      "BDT Amount Can't be Blank"}
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push("/vessels/list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg mr-2">
                      Back
                    </button>
                  </a>
                  {/* <button type="submit" class="btn btn-primary btn-lg">
                    Next
                    </button> */}
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Submit</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Submit</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default CurrencyConversionEntry;
