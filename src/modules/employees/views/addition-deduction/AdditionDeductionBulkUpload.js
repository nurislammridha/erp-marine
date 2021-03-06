import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { UploadAdditionDeduction } from "../../_redux/actions/AdditionDeductionFileUploadAction";
import AdditionDeductionBulkUploadModal from "./AdditionDeductionBulkUploadModal";
import DemoAdditionDeductionFile from "./DemoAdditionDeductionFile";
import { RHFInput } from "react-hook-form-input";
import moment from "moment";

const AdditionDeductionBulkUpload = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [purchaseRequisitionInfo, setPurchaseRequisitionInfo] = React.useState({
    strVesselName: "",
    file: "",
    departmentData: "",
    warehouseData: "",
    unitData: "",

    yearData:{
      label: moment().format('YYYY'),
      value: parseInt(moment().format('YYYY'))
    },
    monthData: {
      label: moment().format('MMMM'),
      value: moment().format('M'),
    }
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandle = (item,name) => {
    const additionData = { ...purchaseRequisitionInfo };
    additionData[name] = item;
    setPurchaseRequisitionInfo(additionData);
  };

  const year = [
    {
      value: 1,
      label: "2020",
    },

    {
      value: 2,
      label: "2021",
    },
  ];

  const months =  [
    {
      value: 1,
      label: "January",
    },

    {
      value: 2,
      label: "February",
    },

    {
      value: 3,
      label: "March",
    },

    {
      value: 4,
      label: "April",
    },

    {
      value: 5,
      label: "May",
    },

    {
      value: 6,
      label: "June",
    },
    {
      value: 7,
      label: "July",
    },
    {
      value: 8,
      label: "August",
    },
    {
      value: 9,
      label: "September",
    },
    {
      value: 10,
      label: "October",
    },
    {
      value: 11,
      label: "November",
    },
    {
      value: 12,
      label: "December",
    },
  ];


  // const selectHandle = (item, name) => {
  //     const purchaseRequisitionInfoData = { ...purchaseRequisitionInfo };
  //     purchaseRequisitionInfoData[name] = item;
  //     setPurchaseRequisitionInfo(purchaseRequisitionInfoData);

  //     if (name == "unitData") {
  //         purchaseRequisitionInfoData["warehouseData"] = "";
  //         setValue("warehouseData", "");
  //         dispatch(GetWarehouseListAction(purchaseRequisitionInfoData.unitData.value));
  //     }
  //     setPurchaseRequisitionInfo(purchaseRequisitionInfoData);

  // };

  const addStatus = useSelector(
    (state) => state.additionDeductionInfo.addStatus
  );
  const addMessage = useSelector(
    (state) => state.additionDeductionInfo.addMessage
  );
  // const intIndentID = useSelector((state) => state.purchaseRequisition.intIndeID);
  // const warehouseListData = useSelector((state) => state.purchaseRequisition.warehouseList);
  // const departmentListData = useSelector((state) => state.purchaseRequisition.departmentList);
  // const unitListData = useSelector((state) => state.purchaseRequisition.unitList);

  // let warehouseList = [];
  // if (warehouseListData) {
  //     warehouseListData.forEach((item) => {
  //         let items = {
  //             value: item.intWHID,
  //             label: item.strWareHoseName,
  //         };
  //         warehouseList.push(items);
  //     });
  // }

  // let unitList = [];
  // if (unitListData) {
  //     unitListData.forEach((item) => {
  //         let items = {
  //             value: item.intUnitID,
  //             label: item.strUnit,
  //         };
  //         unitList.push(items);
  //     });
  // }

  // let departmentList = [];
  // if (departmentListData) {
  //     departmentListData.forEach((item) => {
  //         let items = {
  //             value: item.intDeptID,
  //             label: item.strDepartmentName,
  //         };
  //         departmentList.push(items);
  //     });
  // }

  const importType = [
    {
      value: 1,
      label: "Local",
    },
    {
      value: 2,
      label: "Import",
    },
    {
      value: 3,
      label: "Fabrication",
    },
  ];

  useEffect(() => {
    // dispatch(GetDepartmentListAction());
    // dispatch(GetUnitListAction());
    const yearData={
      label: moment().format('YYYY'),
      value: parseInt(moment().format('YYYY'))
    }
    const monthData= {
      label: moment().format('MMMM'),
      value: moment().format('M'),
    }
    setValue('monthData',monthData);
    setValue('yearData',yearData);

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
        // dispatch(VesselEmptyMessage());
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
    console.log("e", e.target.files);
    let files = e.target.files || e.dataTransfer.files;
    // if (!files.length)
    //   return;
    // createImage(files[0]);

    const vesselInfoData = { ...purchaseRequisitionInfo };
    vesselInfoData.file = files[0];
    setPurchaseRequisitionInfo(vesselInfoData);
  };

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
  };

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(UploadAdditionDeduction(purchaseRequisitionInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div>
            <div className="card-header">
              <div className="card-title">
                <h3 class="card-label">Addition Deduction File Upload</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              formEncType="multipart/form-data"
            >
              <div className="form-group row"></div>

              <div className="form-group row">
              <div className="col-md-2">
                      <label className="form-label">Month</label>
                      <RHFInput
                        as={<Select options={months} />}
                        rules={{ required: false }}
                        name="monthData"
                        register={register}
                        value={months.label}
                        onChange={(e)=>selectHandle(e,"monthData")}
                        setValue={setValue}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Year</label>
                      <RHFInput
                        as={<Select options={year} />}
                        rules={{ required: false }}
                        name="yearData"
                        register={register}
                        value={year.label}
                        onChange={(e)=>selectHandle(e,"yearData")}
                        setValue={setValue}
                      />
                    </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">
                    Upload Excel/CSV File
                  </label>

                  <input
                    className="form-control"
                    type="file"
                    onChange={onChange}
                    required={true}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.uploadFile &&
                      errors.uploadFile.type === "required" &&
                      "Please select a file to upload"}
                  </div>
                </div>
                {/* <div className="col-lg-4">
                  <DemoAdditionDeductionFile
                    previewModal={true}
                    downloadLink={true}
                    props={props}
                    setShowCreateModal={() => setShowCreateModal(true)}
                  />
                </div> */}
                {/* <div className="col-lg-4">
                  <DemoAdditionDeductionFile />
                </div> */}
                <div className="col-lg-4 mt-5">
                  <p className="mt-4">
                    <a
                      target="_blank"
                      className="btn btn-info"
                      onClick={() => {
                        history.push("/addition-deduction/report");
                      }}
                    >
                      Get Report Copy & Fill
                    </a>
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Upload Now</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Upload Now</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AdditionDeductionBulkUploadModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
    </>
  );
});

export default AdditionDeductionBulkUpload;
