import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { ChangeBasicInfoInput } from "../_redux/actions/BasicInformationAction"
import DatePicker from "react-datepicker";

const BasicInformation = () => {
  const dispatch = useDispatch()
  const { register, setValue } = useForm();
  const basicInfoInput = useSelector(state => state.basicInformation.basicInfoInput)
  console.log('basicInfoInput :>> ', basicInfoInput);
  const handleChangeText = (name, value) => {
    dispatch(ChangeBasicInfoInput(name, value))
  }
  const courseData = [
    {
      id: 1,
      name: "cse",
    },
    {
      id: 1,
      name: "EEE",
    },
    {
      id: 1,
      name: "MBA",
    },
  ];

  let CourseName = [];
  if (courseData) {
    courseData.forEach((item) => {
      let items = {
        value: item.id,
        label: item.name,
      };
      CourseName.push(items);
    });
  }
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b pl-5 pr-5 mb-1 card-top-border">
              <div className="mt-5">
                <h3 className="mb-0 pb-0">Basic Information</h3>
              </div>
              <hr></hr>
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">SBU Name</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intSBUId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intSBUId", option.value);
                        handleChangeText("strSBUName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Branch</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intBranchId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intBranchId", option.value);
                        handleChangeText("strBranchName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Office/Ship Name</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intShipId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intShipId", option.value);
                        handleChangeText("strShipName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Catalouge</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intCatalougeId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intCatalougeId", option.value);
                        handleChangeText("strCatalougeName", option.label);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Category</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intCategoryId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intCategoryId", option.value);
                        handleChangeText("strCategoryName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Sub Category</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intSubCategoryId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intSubCategoryId", option.value);
                        handleChangeText("strSubCategoryName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Cost Center</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intCostCenterId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intCostCenterId", option.value);
                        handleChangeText("strCostCenterName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Asset Name</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Asset Name"
                        name="strItemName"
                        value={basicInfoInput.strItemName}
                        onChange={(e) => handleChangeText("strItemName", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Asset Type</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="intAssetTypeId"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                      onChange={(option) => {
                        handleChangeText("intAssetTypeId", option.value);
                        handleChangeText("strAssetTypeName", option.label);
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Description</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Description"
                        name="strDescriptions"
                        value={basicInfoInput.strDescriptions}
                        onChange={(e) => handleChangeText("strDescriptions", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Store Issue Date</label>
                    <DatePicker
                      selected={basicInfoInput.dteStoreIssueDate}
                      className="date-picker"
                      name="dteStoreIssueDate"
                      onChange={(date) => handleChangeText("dteStoreIssueDate", date)}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">GRN Date</label>
                    <DatePicker
                      selected={basicInfoInput.dteGRNDate}
                      className="date-picker"
                      name="dteGRNDate"
                      onChange={(date) => handleChangeText("dteGRNDate", date)}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">
                      Date Place In Service Date(DPS Date)
                    </label>
                    <DatePicker
                      selected={basicInfoInput.dteDatePlaceInServiceDate}
                      className="date-picker"
                      name="dteDatePlaceInServiceDate"
                      onChange={(date) => handleChangeText("dteDatePlaceInServiceDate", date)}
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont Asset-Qty">Asset Qty</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="number"
                        placeholder="Enter Asset QTY"
                        name="numAssetQty"
                        value={basicInfoInput.numAssetQty}
                        onChange={(e) => handleChangeText("numAssetQty", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Project Name</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Project Name"
                        name="strProjectName"
                        value={basicInfoInput.strProjectName}
                        onChange={(e) => handleChangeText("strProjectName", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <Form.Group>
                      <Form.Label className="formFont">Remarks</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Remarks"
                        name="strRemarks"
                        value={basicInfoInput.strRemarks}
                        onChange={(e) => handleChangeText("strRemarks", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="mt-5 float-right pb-5">
                  <Button className="saveButton text-white" variant="">
                    Submit
                  </Button>
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

export default BasicInformation;
