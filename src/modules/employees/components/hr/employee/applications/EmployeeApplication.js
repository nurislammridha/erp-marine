import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Image, Button, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "../../css/custom.css";
// import logo from "../../../../../images/logo-dark.png";
import logo from "../../../../../images/logo-dark.png";
import {
  // EmployeeCrReportCriteria,
  // employeeCrReportSelect,
  // employeeCrReportSubmit,
  // employeeReasonOfAppraisal,
  // selectedReasonOfAppraisal,
  // UpdateEmployeePersonalAction,
  handleChangeEmployeeApplicationInput,
  GetVesselList,
  GetSeafarerList,
  GetRankList,
  GetApplicationTypeList,
  employeeApplicationSubmitAction,
} from "../../../../_redux/actions/EmployeeApplicationAction";
import TextEditor from "../../../../../master/components/Editor/TextEditor";
import {
  generateStringDateFromDate,
  getDateFromUtcDate,
  dateFromUtc,
} from "../../../../../master/utils/DateHelper";

const EmployeeApplication = withRouter(({ history, props }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm();

  const vessel = useSelector(
    (state) => state.employeeApplicationReducer.vesselList
  );

  const seafarer = useSelector(
    (state) => state.employeeApplicationReducer.seafarerList
  );

  const rank = useSelector(
    (state) => state.employeeApplicationReducer.rankList
  );

  const applicationType = useSelector(
    (state) => state.employeeApplicationReducer.employeeApplicationTypeList
  );

  const employeeApplicationInput = useSelector(
    (state) => state.employeeApplicationReducer.employeeApplicationInput
  );

  console.log("Employee Application Input Data: ", employeeApplicationInput);

  const isLoading = useSelector(
    (state) => state.employeeApplicationReducer.isLoading
  );
  // const criteria = useSelector((state) => state.employeeCrReducer.criteriaList);
  // const appraisal = useSelector(
  //   (state) => state.employeeCrReducer.appraisalList
  // );
  // const textBoxShow = useSelector(
  //   (state) => state.employeeCrReducer.textBoxShow
  // );
  // const stateInput = useSelector((state) => state.employeeCrReducer.inputData);

  useEffect(() => {
    dispatch(GetVesselList());
    dispatch(GetSeafarerList());
    dispatch(GetRankList());
    dispatch(GetApplicationTypeList());
    // dispatch(EmployeeCrReportCriteria());
    // dispatch(employeeReasonOfAppraisal());
  }, []);

  // const action = [
  //   {
  //     label: "Casual Leave",
  //     value: "1",
  //   },
  //   {
  //     label: "Medical Leave",
  //     value: "2",
  //   },
  //   {
  //     label: "Earn Leave",
  //     value: "2",
  //   },
  // ];

  const handleChangeInput = (name, value) => {
    console.log("name", name);
    console.log("value", value);
    dispatch(handleChangeEmployeeApplicationInput(name, value));
  };

  const appraisalSubmit = (
    item,
    indexParentCriteria,
    indexChild,
    parentCriteria
  ) => {
    // dispatch(
    //   employeeCrReportSelect(
    //     item,
    //     indexParentCriteria,
    //     indexChild,
    //     parentCriteria
    //   )
    // );
  };

  const getChangeAppraisal = (e) => {
    let data = {
      name: e.target.name,
      value: e.target.value,
    };
    // dispatch(selectedReasonOfAppraisal(data));
  };
  const onSubmit = (data) => {
    alert();
    // dispatch(employeeCrReportSubmit(criteria));
  };

  const submitEmployeeApplication = (data) => {
    if (employeeApplicationInput.intEmployeeId === 0) {
      alert("Please select an employee!");
      return false;
    }
    if (employeeApplicationInput.intRankId === 0) {
      alert("Please select a rank!");
      return false;
    }
    if (employeeApplicationInput.intVesselId === 0) {
      alert("Please select a vessel!");
      return false;
    }
    if (employeeApplicationInput.strReceiverName === "") {
      alert("Please give a receiver name!");
      return false;
    }
    dispatch(employeeApplicationSubmitAction(employeeApplicationInput));
  };

  return (
    <>
      <div className="card p-5">
        <div className="container pb-5 mb-4 ml-3">
          <div className="row  border-around">
            <div className="col-lg-8">
              <h3 className="card-label a-lebel text-center pt-5">
                AKIJ SHIPPING LINE LTD.hbhgh
              </h3>
            </div>

            <div className="col-lg-4 shippingLineLogo">
              <Image src={logo} roundedCircle className="akij-logo-ship" />
            </div>
          </div>
        </div>
        <div className="employee-application-table">
          <form
            onSubmit={handleSubmit(submitEmployeeApplication)}
            method="post"
          >
            <Table striped bordered hover responsive size="sm ">
              <thead>
                <tr>
                  <th>Application Type</th>
                  <th>
                    {" "}
                    <div className="col-12">
                      <RHFInput
                        as={<Select options={applicationType} />}
                        rules={{ required: false }}
                        name="intApplicationTypeId"
                        register={register}
                        value={applicationType.label}
                        onChange={(e) =>
                          handleChangeInput("intApplicationTypeId", e.value)
                        }
                        setValue={setValue}
                      />
                    </div>
                  </th>
                  {/* <th>Date</th>
                  <th>
                    {" "}
                    <input
                      type="date"
                      className="form-control form-input"
                      value={employeeApplicationInput.strApplyDate}
                      name="strApplyDate"
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                      onChange={(e) => handleChangeInput("strApplyDate", e)}
                    />

                    <DatePicker
                      type="date"
                      name="strApplyDate"
                      className="form-control form-input"
                      onChange={(value) =>
                        handleChangeInput("strApplyDate", value)
                      }
                      value={employeeApplicationInput.strApplyDate}
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    />
                  </th> */}

                  <th>Vessel</th>
                  <th>
                    {" "}
                    <div className="col-12">
                      <RHFInput
                        as={<Select options={vessel} />}
                        rules={{ required: false }}
                        name="intVesselId"
                        register={register}
                        value={vessel.label}
                        onChange={(e) =>
                          handleChangeInput("intVesselId", e.value)
                        }
                        setValue={setValue}
                      />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Name of Seafarer </th>
                  <th>
                    {" "}
                    {/* <input
                      type="text"
                      className="form-control form-input"
                      placeholder=""
                    /> */}
                    <div className="col-12">
                      <RHFInput
                        as={<Select options={seafarer} />}
                        rules={{ required: false }}
                        name="intEmployeeId"
                        register={register}
                        value={seafarer.label}
                        onChange={(e) =>
                          handleChangeInput("intEmployeeId", e.value)
                        }
                        setValue={setValue}
                      />
                    </div>
                  </th>
                  <th>Rank</th>
                  <th>
                    {" "}
                    {/* <input type="text" className="form-control form-input" /> */}
                    <div className="col-12">
                      <RHFInput
                        as={<Select options={rank} />}
                        rules={{ required: false }}
                        name="intRankId"
                        register={register}
                        value={rank.label}
                        onChange={(e) =>
                          handleChangeInput("intRankId", e.value)
                        }
                        setValue={setValue}
                      />
                    </div>
                  </th>
                </tr>
                {/* <tr>
                  <th>Vessel</th>
                  <th>
                    {" "}
                    <div className="col-12">
                      <RHFInput
                        as={<Select options={vessel} />}
                        rules={{ required: false }}
                        name="intVesselId"
                        register={register}
                        value={vessel.label}
                        onChange={(e) =>
                          handleChangeInput("intVesselId", e.value)
                        }
                        setValue={setValue}
                      />
                    </div>
                  </th>
                </tr> */}
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4">
                    <p className="employe-application-text pt-5">To </p>
                    <span>
                      The{" "}
                      {/* <input
                        type="text"
                        className="form-control form-input d-inline input-width"
                        placeholder=""
                      /> */}
                      <Form.Group>
                        {/* <Form.Label className="formFont pl-1">Input</Form.Label> */}
                        <Form.Control
                          className="formHeight form-control form-input d-inline input-width"
                          type="text"
                          placeholder="Type"
                          value={employeeApplicationInput.strReceiverName}
                          name="strReceiverName"
                          ref={register({
                            required: false,
                            maxLength: 100,
                          })}
                          onChange={(e) =>
                            handleChangeInput("strReceiverName", e.target.value)
                          }
                        />
                      </Form.Group>
                    </span>
                    <p className="employe-application-text pt-2">
                      Akij Shipping Line Ltd.
                    </p>
                    <p className="pb-5 employe-application-text">
                      Dhaka,Bangladesh.
                    </p>
                    <p className="pt-5 employe-application-text">Dear Sir,</p>
                    <p className="employe-application-text">
                      Kindly arrange to relieve me
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-bold">From Date/Month</td>
                  <td>
                    {/* <input
                      type="date"
                      className="form-control form-input"
                      placeholder=""
                    /> */}

                    <DatePicker
                      type="date"
                      name="dteFromDate"
                      className="form-control form-input"
                      onChange={(value) =>
                        handleChangeInput("dteFromDate", "2021-01-28")
                      }
                      value={employeeApplicationInput.dteFromDate}
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    />
                  </td>
                  <td className="text-bold">At Port</td>
                  <td>
                    {/* <input
                      type="text"
                      className="form-control form-input"
                      placeholder=""
                    /> */}
                    <Form.Group>
                      <Form.Control
                        // className="formHeight form-control form-input d-inline input-width"
                        type="text"
                        placeholder="Type"
                        value={employeeApplicationInput.strPortName}
                        name="strPortName"
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                        onChange={(e) =>
                          handleChangeInput("strPortName", e.target.value)
                        }
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <p className="pb-4 pt-1">
                      The actual date/Port of relief may be arranged as per your
                      convenience.
                    </p>
                  </td>
                </tr>
                {employeeApplicationInput.intApplicationTypeId === 1 && (
                  <>
                    <tr>
                      <td colSpan="1">Commencement of tenure :</td>
                      <td colSpan="3">
                        {/* <input
                          type="text"
                          className="form-control form-input"
                          placeholder=""
                        /> */}

                        <Form.Group>
                          <Form.Control
                            // className="formHeight form-control form-input d-inline input-width"
                            type="text"
                            placeholder="Type"
                            value={
                              employeeApplicationInput.strCommencementTenure
                            }
                            name="strCommencementTenure"
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                            onChange={(e) =>
                              handleChangeInput(
                                "strCommencementTenure",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">Date of completion :</td>
                      <td colSpan="3">
                        {/* <input
                          type="text"
                          className="form-control form-input"
                          placeholder=""
                        /> */}

                        <DatePicker
                          type="date"
                          name="dteDateOfCompletion"
                          className="form-control form-input"
                          onChange={(value) =>
                            handleChangeInput(
                              "dteDateOfCompletion",
                              "2021-01-28"
                            )
                          }
                          value={employeeApplicationInput.dteDateOfCompletion}
                          ref={register({
                            required: false,
                            maxLength: 100,
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">Extension requested up to:</td>
                      <td colSpan="3">
                        {/* <input
                          type="text"
                          className="form-control form-input"
                          placeholder=""
                        /> */}

                        <DatePicker
                          type="date"
                          name="dteExtensionRequested"
                          className="form-control form-input"
                          onChange={(value) =>
                            handleChangeInput(
                              "dteExtensionRequested",
                              "2021-01-28"
                            )
                          }
                          value={employeeApplicationInput.dteExtensionRequested}
                          ref={register({
                            required: false,
                            maxLength: 100,
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">Expecting date of Rejoining :</td>
                      <td colSpan="3">
                        {/* <input
                          type="text"
                          className="form-control form-input"
                          placeholder=""
                        /> */}

                        <DatePicker
                          type="date"
                          name="dteRejoiningDate"
                          className="form-control form-input"
                          onChange={(value) =>
                            handleChangeInput("dteRejoiningDate", "2021-01-28")
                          }
                          value={employeeApplicationInput.dteRejoiningDate}
                          ref={register({
                            required: false,
                            maxLength: 100,
                          })}
                        />
                      </td>
                    </tr>
                  </>
                )}

                {employeeApplicationInput.intApplicationTypeId != 1 && (
                  <>
                    <tr>
                      <td colSpan="4">Body :</td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <CKEditor
                          editor={ClassicEditor}
                          // data="<p>Hello from CKEditor 5!</p>"
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            // console.log("Editor is ready to use!", editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data });
                            handleChangeInput("strApplicationBody", data);
                          }}
                          onBlur={(event, editor) => {
                            // console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            // console.log("Focus.", editor);
                          }}
                        />
                      </td>
                    </tr>
                  </>
                )}

                <tr>
                  <td colSpan="4 p-5">
                    <p className="p-3"></p>
                  </td>
                </tr>
                {/* <tr>
                  <td colSpan="4">Remarks from seafarer:</td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <p className="p-5"></p>
                    <p className="p-3"></p>
                    <CKEditor
                      editor={ClassicEditor}
                      // data="<p>Hello from CKEditor 5!</p>"
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        // console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        handleChangeInput("strSeafarerRemarks", data);
                      }}
                      onBlur={(event, editor) => {
                        // console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        // console.log("Focus.", editor);
                      }}
                    />
                    <TextEditor
                      onChange={(event, editor) => {
                        handleChangeInput("strSeafarerRemarks", props);
                      }}
                    ></TextEditor>
                  </td>
                </tr> */}
                <tr>
                  <td colSpan="4">
                    Remarks from the Master and /or the Chief Engineer :
                  </td>
                </tr>
                <tr>
                  <td colSpan="4 p-5">
                    {/* <p className="p-5"></p>
                    <p className="p-1"></p> */}
                    <CKEditor
                      editor={ClassicEditor}
                      // data="<p>Hello from CKEditor 5!</p>"
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        // console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        handleChangeInput("strRemarks", data);
                      }}
                      onBlur={(event, editor) => {
                        // console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        // console.log("Focus.", editor);
                      }}
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td colSpan="4">
                    <p className="text-center pb-5 pt-1">Yours faithfully</p>
                    <p className="text-center pt-5">Signature of Seafarer</p>
                  </td>
                </tr> */}
                {/* <tr>
                  <td colSpan="2" className="text-bold text-right">
                    Name :
                  </td>
                  <td colSpan="2">
                    <Form.Group>
                      <Form.Control
                        // className="formHeight form-control form-input d-inline input-width"
                        type="text"
                        placeholder="Type"
                        value={employeeApplicationInput.strApplicantName}
                        name="strApplicantName"
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                        onChange={(e) =>
                          handleChangeInput("strApplicantName", e.target.value)
                        }
                      />
                    </Form.Group>
                  </td>
                </tr> */}
                {/* <tr>
                  <td colSpan="2" className="text-bold text-right">
                    Rank :
                  </td>
                  <td colSpan="2">
                    <Form.Group>
                      <Form.Control
                        // className="formHeight form-control form-input d-inline input-width"
                        type="text"
                        placeholder="Type"
                        value={employeeApplicationInput.strApplicantRank}
                        name="strApplicantRank"
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                        onChange={(e) =>
                          handleChangeInput("strApplicantRank", e.target.value)
                        }
                      />
                    </Form.Group>
                  </td>
                </tr> */}
                {/* <tr>
                  <td colSpan="4">
                    <p className="p-5"></p>
                    <p className="p-5"></p>
                    <p className="p-5"></p>
                  </td>
                </tr> */}
                {/* <tr>
                  <td colSpan="2" className="text-center">
                    Master Signature & Date
                  </td>
                  <td colSpan="2" className="text-center">
                    Chief Engineer Signature & Date (if require)
                  </td>
                </tr> */}
                {/* <tr>
                  <td colSpan="2">
                    <p className="pl-2 pt-2 employe-application-text"> Name:</p>
                    <Form.Group>
                      <Form.Control
                        // className="formHeight form-control form-input d-inline input-width"
                        type="text"
                        placeholder="Type"
                        value={employeeApplicationInput.strMasterName}
                        name="strMasterName"
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                        onChange={(e) =>
                          handleChangeInput("strMasterName", e.target.value)
                        }
                      />
                    </Form.Group>
                  </td>
                  <td colSpan="2">
                    <p className="pl-2 pt-2 employe-application-text"> Name:</p>
                    <Form.Group>
                      <Form.Control
                        // className="formHeight form-control form-input d-inline input-width"
                        type="text"
                        placeholder="Type"
                        value={employeeApplicationInput.strChiefEngineerName}
                        name="strChiefEngineerName"
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                        onChange={(e) =>
                          handleChangeInput(
                            "strChiefEngineerName",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </td>
                </tr> */}
              </tbody>
            </Table>
            {/* <Button type="submit">Submit </Button> */}
            {!isLoading && <Button type="submit">Submit </Button>}
            {isLoading && <Button type="submit">Submitting... </Button>}
          </form>
        </div>
      </div>
    </>
  );
});

export default EmployeeApplication;
