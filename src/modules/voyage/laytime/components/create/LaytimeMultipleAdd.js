import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState,useEffect } from "react";
import Select from "react-select";
import { Tab, Tabs } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import { deleteMultipleList } from "../../_redux/actions/LaytimeAction";
import { addNewSof, getRemarkList, handleChangeLaytimeMultiple, showSoftacton } from "../../_redux/actions/LaytimeMultiple";

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
  
  console.log("layTimeOperationList : ",remarkList);

  const dispatch = useDispatch();
  const laytimeDatList = useSelector(
    (state) => state.laytimeDetailInfo.laytimeDatList
  );

  useEffect(() => {
    dispatch(getRemarkList());
  }, []);

  const laytimeOperationData = useSelector((state)=> state.LaytimeMultiple.laytimeOperationData);
  const laytimeDetailsData = useSelector(
    (state) => state.LaytimeMultiple.laytimeDetailsData
  );
  const layTimeMultipleInput = useSelector(
    (state) => state.LaytimeMultiple.layTimeMultipleInput
  );
  const layTimeDetailsList = useSelector(
    (state) => state.LaytimeMultiple.layTimeMultipleInput.layTimeDetails
  );
  console.log("laytimeDetailsData page", layTimeDetailsList);

  const handleChangeTextInput = (name, value,index) => {
    console.log('index', index);
    console.log('name', name);
    console.log('value', value);
    dispatch(handleChangeLaytimeMultiple(name, value,index));
  };
  const softShow = useSelector((state)=> state.LaytimeMultiple.softShow);

  console.log('softShow', softShow);

  const [show, setShow] = useState([]);

  const { register, handleSubmit, errors, setValue } = useForm();

  const deleteMultiple = (data) => {
    alert(
      "Are you sure want to remove data ",
      dispatch(deleteMultipleList(data))
    );
  };

  const showSofsList =()=>{
    dispatch(showSoftacton());
  }

  const addSof =(index)=>{
  
     dispatch(addNewSof());
   
  }

  const addOperation = () => {
    dispatch(addNewOperation());
  }

  

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
                        onClick={() => showSofsList()}
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


                        {
                          layTimeDetailsList && layTimeDetailsList.map((item,index)=>(
                            <tr>
                          <td>

                          <DatePicker
                          className="date-picker"
                          name="dteStartTime"
                          dateFormat="MM-dd-yyyy"
                          minDate={moment().toDate()}
                          placeholderText="select commence date"
                          selected={item.dteStartTime !== '' ? moment(item.dteStartTime).toDate() : null}
                          onChange={(date) => handleChangeTextInput("dteStartTime", date,index)}
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
                          selected={item.dteEndTime !== '' ? moment(item.dteEndTime).toDate() : null}
                          onChange={(date) => handleChangeTextInput("dteEndTime", date,index)}
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
                              // value={laytimeDetailsData.numTimeUsed}
                              onChange={(option) => {
                                handleChangeTextInput(
                                  "strTimeName",
                                  option.label,index
                                );
                                handleChangeTextInput(
                                  "numTimeUsed",
                                  option.value,index
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
                              // value={laytimeDetailsData.numRatio}
                              onChange={(e) =>
                                handleChangeTextInput(
                                  "numRatio",
                                  e.target.value,index
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
                          as={<Select options={remarkList} />}
                          rules={{ required: true }}
                          name="strRemarks"
                          register={register}
                          value={remarkList.strOperationRemark}
                          onChange={(option) => {
                            handleChangeTextInput(
                              "strOperationRemark",
                              option.label,index
                            );
                            handleChangeTextInput(
                              "intOperationRemarkID",
                              option.value,index
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
                            <a className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => addSof(index) }>
                              <i className="fas fa-plus"></i>
                            </a>
                            <a className="ml-3 btn btn-icon btn-light btn-hover-danger btn-sm">
                              <i className="fas fa-trash"></i>
                            </a>
                          </td>
                        </tr>

                          ))
                        }
                        
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
                          <RHFInput
                          as={<Select options={remarkList} />}
                          rules={{ required: true }}
                          name="strOperationRemark"
                          register={register}
                          value={remarkList.strOperationRemark}
                          onChange={(option) => {
                            handleChangeTextInput(
                              "strOperationRemark",
                              option.label
                            );
                            handleChangeTextInput(
                              "intOperationRemarkID",
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

                          <td className="text-right pr-3 mt-3">
                            <a className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => addOperation() }>
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
