import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  UploadPurchaseRequisition, GetWarehouseListAction, GetDepartmentListAction, GetUnitListAction
} from "../../_redux/actions/PurchaseRequisitionAction";
import { RHFInput } from "react-hook-form-input";
import PurchaseRequisitionUploadModal from "./PurchaseRequisitionUploadModal";
import DemoExampleFileLink from "./DemoExampleFileLink";

const PurchaseRequisitionUpload = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [purchaseRequisitionInfo, setPurchaseRequisitionInfo] = React.useState({
    strVesselName: '',
    file: '',
    departmentData: '',
    warehouseData: '',
    unitData: '',
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    const vesselInfoData = { ...purchaseRequisitionInfo };
    vesselInfoData[input.name] = input.value;
    setPurchaseRequisitionInfo(vesselInfoData);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandle = (item, name) => {
    const purchaseRequisitionInfoData = { ...purchaseRequisitionInfo };
    purchaseRequisitionInfoData[name] = item;
    setPurchaseRequisitionInfo(purchaseRequisitionInfoData);


    if (name == "unitData") {
      purchaseRequisitionInfoData["warehouseData"] = "";
      setValue("warehouseData", "");
      dispatch(GetWarehouseListAction(purchaseRequisitionInfoData.unitData.value));
    }
    setPurchaseRequisitionInfo(purchaseRequisitionInfoData);

  };

  const addStatus = useSelector((state) => state.purchaseRequisition.addStatus);
  const addMessage = useSelector((state) => state.purchaseRequisition.addMessage);
  const intIndentID = useSelector((state) => state.purchaseRequisition.intIndeID);
  const warehouseListData = useSelector((state) => state.purchaseRequisition.warehouseList);
  const departmentListData = useSelector((state) => state.purchaseRequisition.departmentList);
  const unitListData = useSelector((state) => state.purchaseRequisition.unitList);

  let warehouseList = [];
  if (warehouseListData) {
    warehouseListData.forEach((item) => {
      let items = {
        value: item.intWHID,
        label: item.strWareHoseName,
      };
      warehouseList.push(items);
    });
  }

  let unitList = [];
  if (unitListData) {
    unitListData.forEach((item) => {
      let items = {
        value: item.intUnitID,
        label: item.strUnit,
      };
      unitList.push(items);
    });
  }


  let departmentList = [];
  if (departmentListData) {
    departmentListData.forEach((item) => {
      let items = {
        value: item.intDeptID,
        label: item.strDepartmentName,
      };
      departmentList.push(items);
    });
  }

  const importType = [
    {
      value: 1,
      label: 'Local'
    },
    {
      value: 2,
      label: 'Import'
    },
    {
      value: 3,
      label: 'Fabrication'
    }
  ]

  useEffect(() => {
    console.log('purchaseRequisitionInfo', purchaseRequisitionInfo);
    dispatch(GetDepartmentListAction());
    dispatch(GetUnitListAction());



    if (typeof addMessage === null || typeof addMessage === 'undefined') {
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
        // dispatch(VesselEmptyMessage());
        history.push("/supply-chain/procurement/purchase-requisition");
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        // dispatch(VesselEmptyMessage());
      }
    }
  }, [addStatus, addMessage]);

  const onChange = (e) => {
    console.log('e', e.target.files);
    let files = e.target.files || e.dataTransfer.files;
    // if (!files.length)
    //   return;
    // createImage(files[0]);

    const vesselInfoData = { ...purchaseRequisitionInfo };
    vesselInfoData.file = files[0];
    setPurchaseRequisitionInfo(vesselInfoData);
  }

  const createImage = (file) => {
    // console.log('file', file);
    // let reader = new FileReader();
    // console.log('reader', reader);
    // reader.onload = (e) => {
    //   console.log('e.target.result', e.target.result);
    //   const vesselInfoData = { ...purchaseRequisitionInfo };
    //   vesselInfoData.file = e.target.result;
    //   setPurchaseRequisitionInfo(vesselInfoData);
    // };
    // reader.readAsDataURL(file);


  }

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(UploadPurchaseRequisition(purchaseRequisitionInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div>
            <div className="card-header">
              <div className="card-title">
                <h3 class="card-label">Purchase Requisition Entry</h3>
              </div>
            </div>
            {intIndentID &&
              <div className="card-header ">
                <div className="card-title row">
                  <h3 class="card-label" style={{ color: '#187DE4', fontSize: 30 }}>Purchase Indent Number: </h3>
                  <button class="badge badge-info border-0 h2">{intIndentID}</button>
                </div>
              </div>
            }
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              formEncType="multipart/form-data"
            >
              <div className="form-group row">

                <div className="col-lg-4">
                  <label className="form-label">Unit</label>
                  <RHFInput
                    as={<Select options={unitList} />}
                    rules={{ required: true }}
                    name="unitData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "unitData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.warehouseData &&
                      errors.warehouseData.type === "required" &&
                      "Warehouse Selection Can't be blank"}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Select Warehouse</label>
                  <RHFInput
                    as={<Select options={warehouseList} />}
                    rules={{ required: true }}
                    name="warehouseData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "warehouseData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.warehouseData &&
                      errors.warehouseData.type === "required" &&
                      "Warehouse Selection Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Select Department</label>
                  <RHFInput
                    as={<Select options={departmentList} />}
                    rules={{ required: true }}
                    name="departmentData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "departmentData")}
                    setValue={setValue}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.departmentData &&
                      errors.departmentData.type === "required" &&
                      "Department can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Due Date</label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Deadweight"
                    name="date"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.date &&
                      errors.date.type === "required" &&
                      "Upload date can't be blank"}
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="form-label mt-2">Upload Excel/CSV File</label>
                  {/* <Form.Control
                    type="file"
                    placeholder="Enter Deadweight"
                    name="uploadFile"
                    className="form-control fromStyle"
                    onChange={(handleChange)}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  /> */}

                  <input className="form-control" type="file" onChange={onChange} required={true} />
                  <div className="inputError margin-minus-8">
                    {errors.uploadFile &&
                      errors.uploadFile.type === "required" &&
                      "Please select a file to upload"}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Select Type</label>
                  <RHFInput
                    as={<Select options={importType} />}
                    rules={{ required: true }}
                    name="importType"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "importType")}
                    setValue={setValue}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.importType &&
                      errors.importType.type === "required" &&
                      "Please select Indent Type"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Remarks</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Remarks "
                    name="strAccountRemarks"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strAccountRemarks &&
                      errors.strAccountRemarks.type === "required" &&
                      "Account Remarks Can't be blank"}
                  </div>
                </div>
                <div className="col-lg-4">
                  <DemoExampleFileLink previewModal={true} downloadLink={true} props={props} setShowCreateModal={() => setShowCreateModal(true)} />
                </div>
              </div>


              <div className="form-group row">
                <div className="col-sm-10">
                  {/* <a
                    onClick={() => {
                      history.push("/vessels/list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg mr-2">
                      Back
                    </button>
                  </a> */}
                  {/* <button type="submit" class="btn btn-primary btn-lg">
                    Next
                    </button> */}
                  {loading &&
                    <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                      <span>Upload Now</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  }

                  {!loading &&
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Upload Now</span>
                    </button>
                  }

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <PurchaseRequisitionUploadModal show={showCreateModal} handleClose={() => setShowCreateModal(false)} />
    </>
  );
});

export default PurchaseRequisitionUpload;
