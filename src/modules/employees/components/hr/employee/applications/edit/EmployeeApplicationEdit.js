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
import logo from "../../../../../images/logo-dark.png";
import {
  handleChangeEmployeeApplicationInput,
  GetVesselList,
  GetSeafarerList,
  GetRankList,
  GetApplicationTypeList,
  employeeApplicationEditAction,
  handleChangeApplicationTypeInput,
  setEmployeeApplicationEditValue,
} from "../../../../../_redux/actions/EmployeeApplicationAction";
// import TextEditor from "../../../../../../master/components/Editor/TextEditor";

const EmployeeApplicationEdit = withRouter(({ history, props }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm();

  const editPropsData = history.location.state.applicationData;

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

  const isLoading = useSelector(
    (state) => state.employeeApplicationReducer.isLoading
  );

  const editStatus = useSelector(
    (state) => state.employeeApplicationReducer.editStatus
  );

  const editData = useSelector(
    (state) => state.employeeApplicationReducer.editData
  );

  const isCRReport = useSelector(
    (state) => state.employeeApplicationReducer.ysnCRReport
  );

  useEffect(() => {
    dispatch(setEmployeeApplicationEditValue(editPropsData));
    dispatch(GetVesselList());
    dispatch(GetSeafarerList());
    dispatch(GetRankList());
    dispatch(GetApplicationTypeList());
    if (editStatus) {
      if (isCRReport === "1") {
        history.push("/employee/employee-cr-report", {
          employeeApplicationTypeId: editData,
        });
      } else {
        history.push("/employee/employee-application-list");
      }
    }
  }, [dispatch, editStatus, editData, isCRReport]);

  const handleChangeInput = (name, value) => {
    dispatch(handleChangeEmployeeApplicationInput(name, value));
  };

  const handleDate = ({ currentTarget: input }) => {
    dispatch(handleChangeEmployeeApplicationInput(input.name, input.value));
  };

  const handleChangeApplicationType = (name, value) => {
    dispatch(handleChangeApplicationTypeInput(name, value));
  };

  const submitEmployeeApplication = () => {
    dispatch(
      employeeApplicationEditAction(
        editPropsData.intID,
        employeeApplicationInput
      )
    );
  };

  return (
    <>
      <div className="card p-5">
        <div className="container pb-5 mb-4 ml-3">
          <div className="row  border-around">
            <div className="col-lg-8">
              <h3 className="card-label a-lebel text-center pt-5">
                AKIJ SHIPPING LINE LTD
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
                          handleChangeApplicationType("intApplicationTypeId", e)
                        }
                        setValue={setValue}
                      />
                    </div>
                    <div className="inputError margin-minus-8">
                      {errors.intApplicationTypeId &&
                        errors.intApplicationTypeId.type === "required" &&
                        "Application type can't be blank"}
                    </div>
                  </th>

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
                    <div className="inputError margin-minus-8">
                      {errors.intVesselId &&
                        errors.intVesselId.type === "required" &&
                        "Vessel can't be blank"}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Name of Seafarer</th>
                  <th>
                    {" "}
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
                    <div className="inputError margin-minus-8">
                      {errors.intEmployeeId &&
                        errors.intEmployeeId.type === "required" &&
                        "Seafarer can't be blank"}
                    </div>
                  </th>
                  <th>Rank</th>
                  <th>
                    {" "}
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
                    <div className="inputError margin-minus-8">
                      {errors.intRankId &&
                        errors.intRankId.type === "required" &&
                        "Rank can't be blank"}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4">
                    <p className="employe-application-text">To</p>
                    <span>
                      The{" "}
                      <Form.Group>
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
                    <div className="inputError margin-minus-8">
                      {errors.strReceiverName &&
                        errors.strReceiverName.type === "required" &&
                        "Receiver name can't be blank"}
                    </div>
                    <p className="employe-application-text pt-2">
                      Akij Shipping Line Ltd.
                    </p>
                    <p className="pb-5 employe-application-text">
                      Dhaka,Bangladesh.
                    </p>
                    {employeeApplicationInput.intApplicationTypeId != 1 && (
                      <p>
                        <span>
                          Subject:{" "}
                          <Form.Group>
                            <Form.Control
                              className="formHeight form-control form-input d-inline input-width"
                              type="text"
                              placeholder="Type"
                              value={
                                employeeApplicationInput.strApplicationSubject
                              }
                              name="strApplicationSubject"
                              ref={register({
                                required: false,
                                maxLength: 100,
                              })}
                              onChange={(e) =>
                                handleChangeInput(
                                  "strApplicationSubject",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </span>
                      </p>
                    )}
                    <p className="pt-5 employe-application-text">Dear Sir,</p>
                    <p className="employe-application-text">
                      Kindly arrange to relieve me
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-bold">From Date/Month</td>
                  <td>
                    <Form.Control
                      type="date"
                      name="dteFromDate"
                      className="form-control form-input"
                      onChange={handleDate}
                      value={employeeApplicationInput.dteFromDate}
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    />
                  </td>
                  <td className="text-bold">At Port</td>
                  <td>
                    <Form.Group>
                      <Form.Control
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
                        <Form.Group>
                          <Form.Control
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
                        <Form.Control
                          type="date"
                          name="dteDateOfCompletion"
                          className="form-control form-input"
                          onChange={handleDate}
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
                        <Form.Control
                          type="date"
                          name="dteExtensionRequested"
                          className="form-control form-input"
                          onChange={handleDate}
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
                        <Form.Control
                          type="date"
                          name="dteRejoiningDate"
                          className="form-control form-input"
                          onChange={handleDate}
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
                          data={employeeApplicationInput.strApplicationBody}
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
                <tr>
                  <td colSpan="4">
                    Remarks from the Master and /or the Chief Engineer :
                  </td>
                </tr>
                <tr>
                  <td colSpan="4 p-5">
                    <CKEditor
                      editor={ClassicEditor}
                      data={employeeApplicationInput.strRemarks}
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
              </tbody>
            </Table>
            {!isLoading && <Button type="submit">Submit </Button>}
            {isLoading && <Button disabled={true}>Submitting... </Button>}
          </form>
        </div>
      </div>
    </>
  );
});

export default EmployeeApplicationEdit;
