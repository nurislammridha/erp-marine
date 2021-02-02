import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from 'moment';
import PurchaseRequestCreateTable from './PurchaseRequestCreateTable';
import { useDispatch, useSelector } from 'react-redux';
import { getShipList } from '../../../master/DropDownData/Ship/_redux/ShipAction/ShipAction';
import { getItemCategory, getItemSubCategory, getItemType } from '../../../item/information/_redux/actions/ItemAction';
import { addMultiplePQ, handlePurchaseInputChage, handlePurchaseRowInputChage } from '../_redux/actions/PurhasesRequestAddAction';
import { getDepartmentData } from '../../../master/DropDownData/Department/_redux/VoyageTypeAction/DepartmentAction';
import { getPRCategoryData } from '../../../master/DropDownData/PurchaseReuestCategory/_redux/PurchaseReuestCategoryAction/PurchaseReuestCategoryAction';
import { getBranchName, getSBUName } from '../../POApproval/_redux/actions/POApprovalAction';

const PurchaseRequestCreate = () => {
  const { register, setValue } = useForm();
  const history = useHistory()
  const dispatch = useDispatch();
  const SBUOptionData = useSelector((state) => state.POApprovalFilter.SBUNameData);
  const branchOptionData = useSelector((state) => state.POApprovalFilter.branchNameData);
  const shipList = useSelector((state) => state.ShipReducer.shipList);
  const itemTypeOptionData = useSelector((state) => state.itemList.itemTypeOptionData);
  const itemCategoryOptionData = useSelector((state) => state.itemList.itemCategoryOptionData);
  const itemSubCategoryOptionData = useSelector((state) => state.itemList.itemSubCategoryOptionData);
  const departmentList = useSelector((state) => state.DepartmentReducer.departmentList);
  const PRCategoryList = useSelector((state) => state.PurchaseReuestCategoryReducer.PRCategoryList);
  //purchase request input data 
  const purchaseRequestData = useSelector((state) => state.purchaseRequest.purchaseRequestData);
  const PQRowData = useSelector((state) => state.purchaseRequest.PQRowData);

  const [searchTeam, setSearchTeam] = useState(true);

  //get data 
  useEffect(() => {
    dispatch(getSBUName());
    dispatch(getBranchName());
    dispatch(getShipList())
    dispatch(getItemType());
    dispatch(getItemCategory());
    dispatch(getItemSubCategory());
    dispatch(getDepartmentData());
    dispatch(getPRCategoryData());
  }, [])

  const handleChangeTextInput = (name, value) => {
    dispatch(handlePurchaseInputChage(name, value))
    // dispatch(handlePurchaseRowInputChage(name, value))
  }
  const handleChangeRowTextInput = (name, value) => {
    dispatch(handlePurchaseRowInputChage(name, value))
  }

  //add multiple purchase request data 
  const addMultiplePRData = (e) => {
    dispatch(addMultiplePQ(purchaseRequestData, PQRowData))
    e.preventDefault()
  }

  return (
    <Card>
      <Card.Body className="pt-5 mt-0">
        <h1 className="tableheading mt-0 pt-0 ">Purchase Request Entry</h1>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="text-bold">BASIC</h6>
          </div>
          <div className="custome-border-design">
          </div>
        </div>
        {/**purchase create form */}
        <form className="form form-label-right voyageEngineerForm" autoComplete="off" >
          {/*****************Basic information ***************/}
          <div className="form-group row mb-1">
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">SBU</label>
              <RHFInput
                as={<Select options={SBUOptionData} />}
                rules={{ required: false }}
                name="intSBUId"
                register={register}
                value={purchaseRequestData.intSBUId}
                onChange={(option) => {
                  handleChangeTextInput('strSBUName', option.label);
                  handleChangeTextInput('intSBUId', option.value)
                }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Branch</label>
              <RHFInput
                as={<Select options={branchOptionData} />}
                rules={{ required: false }}
                name="intBusinessUnitId"
                register={register}
                value={purchaseRequestData.intBusinessUnitId}
                onChange={(option) => {
                  handleChangeTextInput('strBusinessUnitName', option.label);
                  handleChangeTextInput('intBusinessUnitId', option.value)
                }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Ship Name</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intShipID"
                register={register}
                value={purchaseRequestData.intShipID}
                onChange={(option) => {
                  handleChangeTextInput('strShipName', option.label);
                  handleChangeTextInput('intShipID', option.value)
                }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Department</label>
              <RHFInput
                as={<Select options={departmentList} />}
                rules={{ required: false }}
                name="intDepartmentId"
                register={register}
                value={purchaseRequestData.intDepartmentId}
                onChange={(option) => {
                  handleChangeTextInput('strDepartmentName', option.label);
                  handleChangeTextInput('intDepartmentId', option.value)
                }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont"> Due Date</label>
              <DatePicker
                className="date-picker"
                name="dteDueDate"
                dateFormat="MM-dd-yyyy"
                // minDate={moment().toDate()}
                placeholderText="select due date"
                selected={purchaseRequestData.dteDueDate}
                onChange={(date) => handleChangeTextInput("dteDueDate", date)}
                ref={register({
                  required: true,
                  maxLength: 100,
                })}
              />
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Category</label>
              <RHFInput
                as={<Select options={PRCategoryList} />}
                rules={{ required: false }}
                name="intCategoryId"
                register={register}
                value={purchaseRequestData.intCategoryId}
                onChange={(option) => {
                  handleChangeTextInput('strCategoryName', option.label);
                  handleChangeTextInput('intCategoryId', option.value)
                }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Reference</label>
              <Form.Control
                className="formHeight"
                name="strPurchaseReferanceNo"
                type="text"
                value={purchaseRequestData.strPurchaseReferanceNo}
                onChange={(e) => handleChangeTextInput('strPurchaseReferanceNo', e.target.value)}
                placeholder="Reference"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Remarks</label>
              <Form.Control
                className="formHeight"
                name="strRemarks"
                type="text"
                value={purchaseRequestData.strRemarks}
                onChange={(e) => handleChangeTextInput('strRemarks', e.target.value)}
                placeholder="Remarks"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6 mt-2">
              <label htmlFor="">Quality Check</label>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check
                  className="forgotPasswordText  "
                  type="checkbox"
                  name="isQCComplete"
                  onChange={(e) =>
                    handleChangeTextInput("isQCComplete", purchaseRequestData.isQCComplete == "0" ? "1" : "0"
                    )
                  }
                />
              </Form.Group>
            </div>
          </div>
          {/*****************Basic information close***************/}
          {/*****************Details information start***************/}
          <div className="d-flex flex-row">
            <div className="custome-border-left">
              <h6 className="text-bold">Details Information</h6>
            </div>
            <div className="custome-border-design">
            </div>
          </div>

          <div className="form-group row mb-1">
            <div className="col-xl-3 col-lg-3 col-6">
              <Form.Group>
                <label className="formFont">Search by team</label> <br />
                <div class="custom-control custom-switch">
                  <input type="checkbox" className="formHeight" checked={searchTeam} onChange={(e) => setSearchTeam(!searchTeam)} class="custom-control-input" id="customSwitch1" />
                  <label class="custom-control-label bg-secondary custom-switch-design" for="customSwitch1"></label>
                </div>
              </Form.Group>

            </div>
          </div>

          <div className="form-group row mb-1">
            {
              searchTeam === false && (
                <>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Item Type</label>
                    <RHFInput
                      as={<Select options={itemTypeOptionData} />}
                      rules={{ required: false }}
                      name="intShipId"
                      register={register}
                      // onChange={(option) => {
                      //   handleChangeRowTextInput('strShipName', option.label);
                      //   handleChangeRowTextInput('intShipId', option.value)
                      // }}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Item Category</label>
                    <RHFInput
                      as={<Select options={itemCategoryOptionData} />}
                      rules={{ required: false }}
                      // name="intItemCategoryID"
                      register={register}
                      // value={purchaseRequestData.intItemCategoryID}
                      // onChange={(option) => {
                      //   handleChangeRowTextInput('strItemCategoryName', option.label);
                      //   handleChangeRowTextInput('intItemCategoryID', option.value)
                      // }}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Item Sub Category</label>
                    <RHFInput
                      as={<Select options={itemSubCategoryOptionData} />}
                      rules={{ required: false }}
                      name="intItemSubCategoryID"
                      register={register}
                      // onChange={(option) => {
                      //   handleChangeRowTextInput('strShipName', option.label);
                      //   handleChangeRowTextInput('intItemSubCategoryID', option.value)
                      // }}
                      setValue={setValue}
                    />
                  </div>

                  <div className="col-xl-3 col-lg-3 col-6">
                  </div>
                </>
              )
            }
            {/**================== */}

            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Item</label>
              <RHFInput
                as={<Select options={shipList} />}
                rules={{ required: false }}
                name="intitemid"
                register={register}
                value={PQRowData.intitemid}
                onChange={(option) => {
                  handleChangeRowTextInput('strItemName', option.label);
                  handleChangeRowTextInput('intitemid', option.value)
                }}
                setValue={setValue}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Qty</label>
              <Form.Control
                className="formHeight"
                name="numPurchaseRequestQty"
                type="text"
                value={PQRowData.numPurchaseRequestQty}
                onChange={(e) => handleChangeRowTextInput('numPurchaseRequestQty', e.target.value)}
                placeholder="Qty"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <label className="formFont">Remarks</label>
              <Form.Control
                className="formHeight"
                name="strPurchaseRequestPurpose"
                type="text"
                value={PQRowData.strPurchaseRequestPurpose}
                onChange={(e) => handleChangeRowTextInput('strPurchaseRequestPurpose', e.target.value)}
                placeholder="Remarks"
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-6">
              <div className="mt-5">
                <Button className="text-white booking-btn" variant="primary" onClick={(e) => addMultiplePRData(e)}>
                  Add
                </Button>
                <Link >
                  <i class="far fa-file-alt editIcon booking-btn bg-primary text-light ml-3" title="Bulk upload"></i>
                </Link>
              </div>
            </div>

          </div>
          {/*****************Details information closes***************/}
          <hr></hr>
          <PurchaseRequestCreateTable />

          <div className="clearfix"></div>

        </form>
      </Card.Body>
    </Card>
  );
};

export default PurchaseRequestCreate;