import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import {
  handleChangeLaytimeHeaderInput,
  getHearInputData,
  GetVoyageID,
  handleLaytimeDemurrageInput,
  getRowList,
  getVoyageList,
} from "../../_redux/actions/LaytimeAction";
import { useSelector, useDispatch } from "react-redux";
import LaytimeHeaderLoadingPortModal from "./LaytimeHeaderLoadingPortModal";
import LaytimeHeaderDischargePortModal from "./LaytimeHeaderDischargePortModal";
import moment from "moment";
import { showToast } from "../../../../master/utils/ToastHelper";

const LaytimeHeader = () => {
  const dispatch = useDispatch();

  const selectOptions = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
  ];

  const { register, handleSubmit, errors, setValue } = useForm();
  const [show, setShow] = useState(false);
  const [showLoadingPortModal, setShowLoadingPortModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseLoadingPortModal = () => setShowLoadingPortModal(false);
  const handleShow = () => setShow(true);
  const handleShowLoadingPortModal = () => setShowLoadingPortModal(true);

  const laytimeHeaderInput = useSelector(
    (state) => state.laytimeHeaderInfo.laytimeHeaderInput
  );
  const isLoading = useSelector((state) => state.laytimeHeaderInfo.isLoading);
  const layTimeDemurrage = useSelector(
    (state) => state.laytimeHeaderInfo.layTimeDemurrage
  );
  const voyageIDList = useSelector((state) => state.currencyInfo.voyageIDList);
  const voyageDataList = useSelector(
    (state) => state.laytimeHeaderInfo.voyageList
  );
  const loadingPort = (e) => {
    handleShow();
  };
  const dischargePort = (e) => {
    handleShowLoadingPortModal();
  };
  //handle lay-time header input
  const handleChangeTextInput = (name, value, e = null) => {
    dispatch(handleChangeLaytimeHeaderInput(name, value, e));
    if (name === "intCharterVoyageID") {
      dispatch(getHearInputData(value));
      dispatch(getRowList(value));
    }
  };
  const handleLayTimeDemurrageInput = (name, value) => {
    dispatch(handleLaytimeDemurrageInput(name, value));
  };

  //handle submit laytime header
  const submiteLaytimeData = () => {};

  // let voyageID = [];
  // if (voyageIDList) {
  //     voyageIDList.forEach((item) => {
  //         let getVoyageID = {
  //             value: item.intCurrencyID,
  //             label: item.strCurrencyName,
  //         };
  //         voyageID.push(getVoyageID);
  //     });
  // }
  useEffect(() => {
    dispatch(getVoyageList());
  }, []);

  useEffect(() => {
    dispatch(GetVoyageID());
  }, []);

  const RevLoadingPortsFalse = () => {
    showToast("error", "Please select reversible type");
  };
  return (
    <div className="container">
      <div className="card card-custom gutter-b card-top-border">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Laytime</h3>
          </div>
        </div>
        <div className="card-body">
          <form className="form form-label-right" method="post">
            <div className="form-group row">
              <div className="col-md-8">
                <div className="row">
                  {/* <div className="col-md-6">
                                        <label className="form-label">Vessel Name</label>
                                        <RHFInput
                                            as={<Select options={selectOptions} />}
                                            rules={{ required: true }}
                                            name="intShipID"
                                            register={register}
                                            value={laytimeHeaderInput.intShipID}
                                            onChange={(option) => {
                                                handleChangeTextInput(
                                                    "strShipName",
                                                    option.label
                                                );
                                                handleChangeTextInput(
                                                    "intShipID",
                                                    option.value
                                                );
                                            }}
                                            setValue={setValue}
                                        />
                                    </div> */}
                  <div className="col-md-6">
                    <label className="form-label mt-2 formFont">
                      Voyage No.
                    </label>
                    <RHFInput
                      as={
                        <Select
                          options={voyageDataList}
                          className="formHeight"
                        />
                      }
                      className="formHeight"
                      rules={{ required: true }}
                      name="intCharterVoyageID"
                      register={register}
                      value={laytimeHeaderInput.intCharterVoyageID}
                      onChange={(option) => {
                        handleChangeTextInput("strShipName", option.label);
                        handleChangeTextInput(
                          "intCharterVoyageID",
                          option.value
                        );
                      }}
                      setValue={setValue}
                    />
                  </div>
                </div>
                {isLoading && (
                  <>
                    <Spinner animation="border" role="status" className="mt-2">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    {/* <div className="spinner-border spinner-border-lg" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> */}
                    <span className="p-2">
                      Laytime header Data is loading....
                    </span>

                    {/** main body */}
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Commencement Port</label>
                        <RHFInput
                          as={
                            <Select options={selectOptions} isDisabled={true} />
                          }
                          rules={{ required: true }}
                          name="intCommenPortID"
                          register={register}
                          value={laytimeHeaderInput.commmencePort}
                          setValue={setValue}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label mt-2 formFont">
                          Commencement Date{" "}
                        </label>
                        <DatePicker
                          name="dteCommenDate"
                          className="form-control formHeight"
                          disableClock={true}
                          disabled={true}
                          dateFormat="MM-dd-yyyy"
                          placeholderText="select issue date"
                          selected={
                            laytimeHeaderInput.dteCommenDate !== ""
                              ? moment(
                                  laytimeHeaderInput.dteCommenDate
                                ).toDate()
                              : null
                          }
                          onChange={(date) =>
                            handleChangeTextInput("dteCommenDate", date)
                          }
                          ref={register({
                            required: true,
                            maxLength: 100,
                          })}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Completion Port</label>
                        <RHFInput
                          as={
                            <Select options={selectOptions} isDisabled={true} />
                          }
                          rules={{ required: true }}
                          name="intComplationPortID"
                          register={register}
                          value={laytimeHeaderInput.completionPort}
                          setValue={setValue}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label mt-2 formFont">
                          Completion Date
                        </label>

                        <DatePicker
                          name="dteComplationDate"
                          className="form-control formHeight"
                          placeholderText="select issue date"
                          disableClock={true}
                          disabled={true}
                          dateFormat="MM-dd-yyyy"
                          selected={
                            laytimeHeaderInput.dteComplationDate !== ""
                              ? moment(
                                  laytimeHeaderInput.dteComplationDate
                                ).toDate()
                              : null
                          }
                          onChange={(date) =>
                            handleChangeTextInput("dteComplationDate", date)
                          }
                          ref={register({
                            required: true,
                            maxLength: 100,
                          })}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">C/P Date</label>
                        <DatePicker
                          name="dteCPDate"
                          className="form-control formHeight"
                          placeholderText="select issue date"
                          disableClock={true}
                          disabled={true}
                          dateFormat="MM-dd-yyyy"
                          selected={
                            laytimeHeaderInput.dteCPDate !== ""
                              ? moment(laytimeHeaderInput.dteCPDate).toDate()
                              : null
                          }
                          onChange={(date) =>
                            handleChangeTextInput("dteCPDate", date)
                          }
                          ref={register({
                            required: true,
                            maxLength: 100,
                          })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label mt-2 formFont">
                          Charterer
                        </label>
                        <RHFInput
                          as={
                            <Select options={selectOptions} isDisabled={true} />
                          }
                          rules={{ required: true }}
                          name="intChartererID"
                          register={register}
                          value={laytimeHeaderInput.intChartererID}
                          onChange={(option) => {
                            handleChangeTextInput(
                              "intChartererName",
                              option.label
                            );
                            handleChangeTextInput(
                              "intChartererID",
                              option.value
                            );
                            handleChangeTextInput("charterer", {
                              label: option.label,
                              value: option.value,
                            });
                          }}
                          setValue={setValue}
                        />
                      </div>
                    </div>
                  </>
                )}
                {!isLoading && (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Commencement Port</label>
                        <RHFInput
                          as={
                            <Select options={selectOptions} isDisabled={true} />
                          }
                          rules={{ required: true }}
                          name="intCommenPortID"
                          register={register}
                          value={laytimeHeaderInput.commmencePort}
                          setValue={setValue}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label mt-2 formFont">
                          Commencement Date{" "}
                        </label>
                        <DatePicker
                          name="dteCommenDate"
                          className="form-control formHeight"
                          disableClock={true}
                          disabled={true}
                          dateFormat="MM-dd-yyyy"
                          placeholderText="select issue date"
                          selected={
                            laytimeHeaderInput.dteCommenDate !== ""
                              ? moment(
                                  laytimeHeaderInput.dteCommenDate
                                ).toDate()
                              : null
                          }
                          onChange={(date) =>
                            handleChangeTextInput("dteCommenDate", date)
                          }
                          ref={register({
                            required: true,
                            maxLength: 100,
                          })}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Completion Port</label>
                        <RHFInput
                          as={
                            <Select options={selectOptions} isDisabled={true} />
                          }
                          rules={{ required: true }}
                          name="intComplationPortID"
                          register={register}
                          value={laytimeHeaderInput.completionPort}
                          setValue={setValue}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label mt-2 formFont">
                          Completion Date
                        </label>

                        <DatePicker
                          name="dteComplationDate"
                          className="form-control formHeight"
                          placeholderText="select issue date"
                          disableClock={true}
                          disabled={true}
                          dateFormat="MM-dd-yyyy"
                          selected={
                            laytimeHeaderInput.dteComplationDate !== ""
                              ? moment(
                                  laytimeHeaderInput.dteComplationDate
                                ).toDate()
                              : null
                          }
                          onChange={(date) =>
                            handleChangeTextInput("dteComplationDate", date)
                          }
                          ref={register({
                            required: true,
                            maxLength: 100,
                          })}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">C/P Date</label>
                        <DatePicker
                          name="dteCPDate"
                          className="form-control formHeight"
                          placeholderText="select issue date"
                          disableClock={true}
                          disabled={true}
                          dateFormat="MM-dd-yyyy"
                          selected={
                            laytimeHeaderInput.dteCPDate !== ""
                              ? moment(laytimeHeaderInput.dteCPDate).toDate()
                              : null
                          }
                          onChange={(date) =>
                            handleChangeTextInput("dteCPDate", date)
                          }
                          ref={register({
                            required: true,
                            maxLength: 100,
                          })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label mt-2 formFont">
                          Charterer
                        </label>
                        <RHFInput
                          as={
                            <Select options={selectOptions} isDisabled={true} />
                          }
                          rules={{ required: true }}
                          name="intChartererID"
                          register={register}
                          value={laytimeHeaderInput.intChartererID}
                          onChange={(option) => {
                            handleChangeTextInput(
                              "intChartererName",
                              option.label
                            );
                            handleChangeTextInput(
                              "intChartererID",
                              option.value
                            );
                            handleChangeTextInput("charterer", {
                              label: option.label,
                              value: option.value,
                            });
                          }}
                          setValue={setValue}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="col-md-4">
                <div className="border rounded">
                  <div className="row">
                    <div className="col-sm-5">
                      <Form.Check
                        className="m-3"
                        type="radio"
                        label="REVERSIBLE"
                        name="strReversibleIType"
                        id="formHorizontalRadios1"
                        value={"REVERSIBLE"}
                        onChange={(e) =>
                          handleLayTimeDemurrageInput(
                            "strReversibleIType",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-sm-7">
                      <Form.Check
                        className="m-3"
                        type="radio"
                        label="NON-REVERSIBLE"
                        name="strReversibleIType"
                        id="formHorizontalRadios1"
                        value={"NON-REVERSIBLE"}
                        onChange={(e) =>
                          handleLayTimeDemurrageInput(
                            "strReversibleIType",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row m-3">
                    <Form.Check
                      className=""
                      type="checkbox"
                      label="Loading Port"
                      name="isRevLoadingPorts"
                      value={laytimeHeaderInput.isRevLoadingPorts}
                      onChange={(e) =>
                        handleChangeTextInput(
                          "isRevLoadingPorts",
                          e.target.checked
                        )
                      }
                    />
                    <a>
                      {
                        <i
                          className="fas fa-file ml-10"
                          onClick={() => loadingPort()}
                        ></i>
                      }
                    </a>
                  </div>
                  <div className="row m-3">
                    <Form.Check
                      className=""
                      type="checkbox"
                      label="Discharge Port"
                      name="isRevDischargePorts"
                      value={laytimeHeaderInput.isRevDischargePorts}
                      onChange={(e) =>
                        handleChangeTextInput(
                          "isRevDischargePorts",
                          e.target.checked
                        )
                      }
                    />
                    <a>
                      {
                        <i
                          className="fas fa-file ml-6"
                          onClick={() => dischargePort()}
                        ></i>
                      }
                    </a>
                  </div>
                </div>
                <div className="border rounded mt-5">
                  <Form.Check
                    className="m-3"
                    type="radio"
                    label="Always On Demurrage"
                    name="strOnceOnDemmurrage"
                    id="strOnceOnDemmurrage"
                    value={laytimeHeaderInput.strOnceOnDemmurrage}
                    onChange={(e) =>
                      handleChangeTextInput(
                        "strOnceOnDemmurrage",
                        e.target.checked === true
                      )
                    }
                  />
                  <Form.Check
                    className="m-3"
                    type="radio"
                    label="Not Always On Demurrage"
                    name="strOnceOnDemmurrage"
                    id="strOnceOnDemmurrage"
                    value={laytimeHeaderInput.strOnceOnDemmurrage}
                    onChange={(e) =>
                      handleChangeTextInput(
                        "strOnceOnDemmurrage",
                        e.target.checked === false
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <SimpleModal
              showLoadingPortModal={showLoadingPortModal}
              handleCloseLoadingPortModal={() => handleCloseLoadingPortModal()}
              modalTitle={"Demurrage/Dispatch Rate"}
            >
              <LaytimeHeaderLoadingPortModal
                handleClose={handleClose}
                handleCloseLoadingPortModal={handleCloseLoadingPortModal}
                handleLayTimeDemurrageInput={handleLayTimeDemurrageInput}
                layTimeDemurrage={layTimeDemurrage}
              />
            </SimpleModal>
            <SimpleModal
              show={show}
              handleClose={() => handleClose()}
              modalTitle={"Demurrage/Dispatch Rate"}
            >
              <LaytimeHeaderDischargePortModal
                handleClose={handleClose}
                handleCloseLoadingPortModal={handleCloseLoadingPortModal}
                handleLayTimeDemurrageInput={handleLayTimeDemurrageInput}
                layTimeDemurrage={layTimeDemurrage}
              />
            </SimpleModal>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LaytimeHeader;
