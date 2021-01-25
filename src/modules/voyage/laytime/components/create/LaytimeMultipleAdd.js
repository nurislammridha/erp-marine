import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Select from "react-select";
import { Tab, Tabs } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import { deleteMultipleList } from "../../_redux/actions/LaytimeAction";
import { handleChangeLaytimeMultiple } from "../../_redux/actions/LaytimeMultiple";

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

  const dispatch = useDispatch();
  const laytimeDatList = useSelector(
    (state) => state.laytimeDetailInfo.laytimeDatList
  );
  

  const laytimeOperationData = useSelector((state)=> state.LaytimeMultiple.laytimeOperationData);
  const laytimeDetailsData = useSelector(
    (state) => state.LaytimeMultiple.laytimeDetailsData
  );
  const layTimeMultipleInput = useSelector(
    (state) => state.LaytimeMultiple.layTimeMultipleInput
  );
  console.log("laytimeDetailsData", laytimeDetailsData);
  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeLaytimeMultiple(name, value));
  };

  const [show, setShow] = useState([]);
  const [softShow, setSoftShow] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();

  const deleteMultiple = (data) => {
    alert(
      "Are you sure want to remove data ",
      dispatch(deleteMultipleList(data))
    );
  };

  console.log("layTimeRowList data by multiplerow:", laytimeDatList);
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
              {laytimeDatList &&
                laytimeDatList.map((item, index) => (
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
                      {/*<a className="btn btn-icon btn-light btn-hover-danger btn-sm">
                      <i className="fas fa-trash"></i>
              </a>*/}
                      <button
                        type="submit"
                        class="saveButton text-white btn ml-3"
                        onClick={() => setSoftShow(!softShow)}
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
                        <tr>
                          <td>
                            <DatePicker
                              name="dteStartTime"
                              className="date-picker"
                              placeholderText="select issue date"
                              dateFormat="MM-dd-yyyy"
                              selected={
                                laytimeDetailsData.dteStartTime !== ""
                                  ? moment(
                                      laytimeDetailsData.dteStartTime
                                    ).toDate()
                                  : null
                              }
                              onChange={(date) =>
                                handleChangeTextInput("dteStartTime", date)
                              }
                            />
                          </td>
                          <td>
                            <DatePicker
                              name="dteEndTime"
                              className="date-picker"
                              placeholderText="select issue date"
                              dateFormat="MM-dd-yyyy"
                              selected={
                                laytimeDetailsData.dteEndTime !== ""
                                  ? moment(
                                      laytimeDetailsData.dteEndTime
                                    ).toDate()
                                  : null
                              }
                              onChange={(date) =>
                                handleChangeTextInput("dteEndTime", date)
                              }
                            />
                          </td>
                          <td>
                            <RHFInput
                              as={<Select options={selectCount} />}
                              rules={{ required: true }}
                              name="numTimeUsed"
                              register={register}
                              value={laytimeDetailsData.numTimeUsed}
                              onChange={(option) => {
                                handleChangeTextInput(
                                  "strTimeName",
                                  option.label
                                );
                                handleChangeTextInput(
                                  "numTimeUsed",
                                  option.value
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
                              value={laytimeDetailsData.numRatio}
                              onChange={(e) =>
                                handleChangeTextInput(
                                  "numRatio",
                                  e.target.value
                                )
                              }
                              ref={register({
                                required: true,
                                maxLength: 100,
                              })}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              name="strRemarks"
                              className="fromStyle formHeight"
                              value={laytimeDetailsData.strRemarks}
                              onChange={(e) =>
                                handleChangeTextInput(
                                  "strRemarks",
                                  e.target.value
                                )
                              }
                              ref={register({
                                required: true,
                                maxLength: 100,
                              })}
                            />
                          </td>
                          <td className="text-right pr-3 mt-3">
                            <a className="btn btn-icon btn-light btn-hover-danger btn-sm">
                              <i className="fas fa-plus"></i>
                            </a>
                            <a className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm">
                              <i className="fas fa-trash"></i>
                            </a>
                          </td>
                        </tr>
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
                        <tr>
                          <td>
                            <DatePicker
                              name=""
                              className="form-control formHeight"
                              ref={register({
                                required: true,
                                maxLength: 100,
                              })}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              name=""
                              className="fromStyle formHeight"
                              value={laytimeOperationData}
                              ref={register({
                                required: true,
                                maxLength: 100,
                              })}
                            />
                          </td>

                          <td className="text-right pr-3 mt-3">
                            <a className="btn btn-icon btn-light btn-hover-danger btn-sm">
                              <i className="fas fa-plus"></i>
                            </a>
                            <a className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm">
                              <i className="fas fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </Tab>
              </Tabs>
              <div className="row mt-5 mb-5">
                <div className="col-sm-10"></div>
                <div className="col-sm-2 ">
                  <button type="submit" class="saveButton text-white btn ml-13">
                    Save
                  </button>
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
