import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Tab, Tabs } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import {
  deleteMultipleList,
  deleteSofList,
} from "../../_redux/actions/LaytimeAction";
import {
  addNewOperation,
  addNewSof,
  getRemarkList,
  handleChangeLaytimeMultiple,
  handleChangeLaytimeMultipleOperation,
  multipleSubmitAction,
  removeOperationData,
  removeSofData,
  showSoftacton,
} from "../../_redux/actions/LaytimeMultipleAction";
import { showToast } from "../../../../master/utils/ToastHelper";

const LaytimeMultipleAdd = () => {
  const selectCount = [
    {
      label: "Full",
      value: "1",
    },
    {
      label: "Normal",
      value: "2",
    },
  ];

  const remarkList = useSelector(
    (state) => state.layTimeOperationRemark.remarkList
  );
  const dispatch = useDispatch();
  const laytimeDataList = useSelector(
    (state) => state.laytimeDetailInfo.laytimeDataList
  );

  // const layTImeRowData = useSelector(
  //   (state) => state.laytimeDetailInfo.laytimeRowData
  // );
  useEffect(() => {
    dispatch(getRemarkList());
  }, []);

  const laytimeOperationData = useSelector(
    (state) => state.LaytimeMultiple.laytimeOperationData
  );
  const laytimeDetailsData = useSelector(
    (state) => state.LaytimeMultiple.laytimeDetailsData
  );
  const layTimeMultipleInput = useSelector(
    (state) => state.LaytimeMultiple.layTimeMultipleInput
  );
  const intLayTimeHeaderID = useSelector(
    (state) => state.LaytimeMultiple.intLayTimeHeaderID
  );
  const intLayTimeRowID = useSelector(
    (state) => state.LaytimeMultiple.intLayTimeRowID
  );
  const layTimeDetailsList = useSelector(
    (state) => state.LaytimeMultiple.layTimeMultipleInput.layTimeDetails
  );

  const layTimeOperationList = useSelector(
    (state) => state.LaytimeMultiple.layTimeMultipleInput.layTimeOperations
  );

  const laytimeopData = useSelector(
    (state) => state.LaytimeMultiple.layTimeOperation
  );
  const laytimeSofData = useSelector(
    (state) => state.LaytimeMultiple.layTimeSof
  );

  const handleChangeTextInput = (name, value, index) => {
    dispatch(handleChangeLaytimeMultiple(name, value, index));
  };
  const softShow = useSelector((state) => state.LaytimeMultiple.softShow);

  const loading = useSelector((state) => state.LaytimeMultiple.loading);

  const operationhandleChangeTextInput = (name, value, index) => {
    dispatch(handleChangeLaytimeMultipleOperation(name, value, index));
  };

  const [show, setShow] = useState([]);

  const { register, handleSubmit, errors, setValue } = useForm();

  const deleteMultiple = (data) => {
    alert(
      "Are you sure want to remove data ",
      dispatch(deleteMultipleList(data)),
      dispatch(deleteSofList(data))
    );
  };

  const showSofsList = (data) => {
    // normal insert, payload data set getted insert,
    // const isEmptyData = false;
    // isEmptyData)
    dispatch(showSoftacton(data));
  };

  const addSof = (index) => {
   
    if (layTimeMultipleInput.layTimeDetails.dteStartTime === "undefined") {
      showToast('error', "Start date can't be blank!")
      return false;
    }
    if (layTimeMultipleInput.layTimeDetails.dteEndTime === "undefined") {
      showToast('error', "End date can't be blank!")
      return false;
    }
    if (layTimeMultipleInput.layTimeDetails.numTimeUsed === null) {
      showToast('error', "Time Used can't be blank!")
      return false;
    }
    if (layTimeMultipleInput.layTimeDetails.numRatio === null) {
      showToast('error', "Ratio can't be blank!")
      return false;
    }
    if (layTimeMultipleInput.layTimeDetails.strRemarks === "undefined") {
      showToast('error', "Remarks can't be blank!")
      return false;
    }

    dispatch(addNewSof(index));
  };

  const addOperation = (index) => {
    dispatch(addNewOperation());
  };

  //Delete SOF DATA

  const deleteSofData = (data) => {
    dispatch(removeSofData(data));
  };

  const deleteOperationData = (data) => {
    dispatch(removeOperationData(data));
  };

  //SOF AND OPERATION FINAL SUBMIT

  const HandleMultipleSubmit = (e) => {
    dispatch(
      multipleSubmitAction(
        layTimeMultipleInput,
        intLayTimeHeaderID,
        intLayTimeRowID
      )
    );
  };
  return (
    <div className="">
      <div className="card card-custom gutter-b">
        <div className="ml-5 react-bootstrap-table table-responsive pr-15">
          <table className="table table table-head-custom table-vertical-center voyageTable mt-3">
            <thead>
              <tr>
                <th>OPERATION</th>
                <th> PORT</th>
                <th> CARGO</th>
                <th> CARGO QTY</th>
                <th> COMMENCED</th>
                <th> COMPLETED</th>
                <th class="text-right pr-3">ACTION</th>
              </tr>
              {laytimeDataList &&
                laytimeDataList.map((item, index) => (
                  <tr>
                    <td>{item.intType}</td>
                    <td>{item.intPortID !== null ? item.intPortID : "#00"}</td>
                    <td>{item.intCargoID}</td>
                    <td>{item.numBLQty}</td>
                    <td>
                      {moment(item.dteLaytimeCommenced).format("MM-DD-YYYY")}
                    </td>
                    <td>
                      {moment(item.dteLaytimeCompleted).format("MM-DD-YYYY")}
                    </td>
                    <td className="text-right pr-3 mt-3">
                      <button
                        type="button"
                        className="btn btn-danger btn-elevate"
                        onClick={() => deleteMultiple(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                      <button
                        type="submit"
                        class="saveButton text-white btn ml-3"
                        onClick={() => showSofsList({ item })}
                      >
                        SOF
                      </button>
                    </td>
                  </tr>
                ))}
            </thead>
          </table>
        </div>
        {softShow && (
          <div className="ml-5 mt-10">
            <form>
              <Tabs defaultActiveKey="SOF" id="uncontrolled-tab-example">
                <Tab eventKey="SOF" title="SOF">
                  <div className="react-bootstrap-table table-responsive pr-10">
                    <table className="table table table-head-custom table-vertical-center voyageTable mt-3">
                      <thead>
                        <tr>
                          <th>START DATE</th>
                          <th> END DATE</th>
                          <th> TIME TO COUNT</th>
                          <th> PERCENT</th>
                          <th> REMARKS</th>
                          <th class="text-right pr-3">ACTION</th>
                        </tr>

                        {layTimeDetailsList &&
                          layTimeDetailsList.map((item, index) => (
                            <tr>
                              <td>
                                <DatePicker
                                  className="date-picker"
                                  name="dteStartTime"
                                  dateFormat="MM-dd-yyyy"
                                  minDate={moment().toDate()}
                                  placeholderText="select commence date"
                                  selected={
                                    item.dteStartTime !== ""
                                      ? moment(item.dteStartTime).toDate()
                                      : null
                                  }
                                  onChange={(date) =>
                                    handleChangeTextInput(
                                      "dteStartTime",
                                      date,
                                      index
                                    )
                                  }
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                />

                                {/*<input type ="text" value={item.dteStartTime}  onChange={(e) => handleChangeTextInput("dteStartTime", e.target.value,index)}/>*/}
                              </td>

                              <td>
                                <DatePicker
                                  className="date-picker"
                                  name="dteEndTime"
                                  dateFormat="MM-dd-yyyy"
                                  minDate={moment().toDate()}
                                  placeholderText="select commence date"
                                  selected={
                                    item.dteEndTime !== ""
                                      ? moment(item.dteEndTime).toDate()
                                      : null
                                  }
                                  onChange={(date) =>
                                    handleChangeTextInput(
                                      "dteEndTime",
                                      date,
                                      index
                                    )
                                  }
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                />
                              </td>
                              <td>
                                <RHFInput
                                  as={<Select options={selectCount} />}
                                  rules={{ required: true }}
                                  name="numTimeUsed"
                                  register={register}
                                  value={item.numTimeUsed}
                                  onChange={(option) => {
                                    handleChangeTextInput(
                                      "strTimeName",
                                      option.label,
                                      index
                                    );
                                    handleChangeTextInput(
                                      "numTimeUsed",
                                      option.value,
                                      index
                                    );
                                  }}
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                  setValue={setValue}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  name="numRatio"
                                  className="fromStyle formHeight"
                                  value={item.numRatio}
                                  onChange={(e) =>
                                    handleChangeTextInput(
                                      "numRatio",
                                      e.target.value,
                                      index
                                    )
                                  }
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                  setValue={setValue}
                                />
                              </td>
                              <td>
                                <RHFInput
                                  as={<Select options={remarkList} />}
                                  rules={{ required: true }}
                                  name="strRemarks"
                                  register={register}
                                  value={item.strOperationRemark}
                                  onChange={(option) => {
                                    handleChangeTextInput(
                                      "strOperationRemark",
                                      option.label,
                                      index
                                    );
                                    handleChangeTextInput(
                                      "intOperationRemarkID",
                                      option.value,
                                      index
                                    );
                                  }}
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                  setValue={setValue}
                                />
                              </td>
                              <td className="text-right pr-3 mt-3">
                                {index === 0 ? (
                                  <a
                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                    onClick={() => addSof(index)}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </a>
                                ) : (
                                  <a
                                    className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm"
                                    onClick={() => deleteSofData(item)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                      </thead>
                    </table>
                  </div>
                </Tab>
                <Tab eventKey="Operations" title="Operations">
                  <div className="react-bootstrap-table table-responsive pr-10">
                    <table className="table table table-head-custom table-vertical-center voyageTable mt-3">
                      <thead>
                        <tr>
                          <th> DATE</th>
                          <th> REMARKS</th>
                          <th class="text-right pr-3">ACTION</th>
                        </tr>

                        {layTimeOperationList &&
                          layTimeOperationList.map((item, index) => (
                            <tr>
                              <td>
                                <DatePicker
                                  className="date-picker"
                                  name=""
                                  dateFormat="MM-dd-yyyy"
                                  minDate={moment().toDate()}
                                  placeholderText="select commence date"
                                  //  selected={item.dteStartTime !== '' ? moment(item.dteStartTime).toDate() : null}
                                  //   onChange={(date) => handleChangeTextInput("dteStartTime", date,index)}
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                />
                              </td>
                              <td>
                                <RHFInput
                                  as={<Select options={remarkList} />}
                                  rules={{ required: true }}
                                  name="strOperationRemark"
                                  register={register}
                                  value={item.strOperationRemark}
                                  onChange={(option) => {
                                    operationhandleChangeTextInput(
                                      "strOperationRemark",
                                      option.label,
                                      index
                                    );
                                    operationhandleChangeTextInput(
                                      "intOperationRemarkID",
                                      option.value,
                                      index
                                    );
                                  }}
                                  ref={register({
                                    required: true,
                                    maxLength: 100,
                                  })}
                                  setValue={setValue}
                                />
                              </td>

                              <td className="text-right pr-3 mt-3">
                                {index === 0 ? (
                                  <a
                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                    onClick={() => addOperation(index)}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </a>
                                ) : (
                                  <a
                                    className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm"
                                    onClick={() => deleteOperationData(item)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                      </thead>
                    </table>
                  </div>
                </Tab>
              </Tabs>
              <div className="row mt-5 mb-5">
                <div className="col-sm-10"></div>
                <div className="col-sm-2 ">
                  {/*<button type="submit" class="saveButton text-white btn ml-13">
                    Save
                      </button>*/}
                  {!loading && (
                    <button
                      type="button"
                      class="saveButton text-white btn ml-6"
                      onClick={(e) => HandleMultipleSubmit(e)}
                    >
                      Save
                    </button>
                  )}
                  {loading && (
                    <button
                      type="button"
                      class="saveButton disabled={true} text-white btn ml-6"
                    >
                      <span className="p-2">Saving...</span>
                      <span className="ml-3 spinner spinner-white "></span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaytimeMultipleAdd;
