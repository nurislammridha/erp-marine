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

const AdditionDeductionBulkUploadForm = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [purchaseRequisitionInfo, setPurchaseRequisitionInfo] = React.useState({
    strVesselName: "",
    file: "",
    departmentData: "",
    warehouseData: "",
    unitData: "",
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

  const addStatus = useSelector((state) => state.purchaseRequisition.addStatus);
  const addMessage = useSelector(
    (state) => state.purchaseRequisition.addMessage
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
    console.log("purchaseRequisitionInfo", purchaseRequisitionInfo);
    // dispatch(GetDepartmentListAction());
    // dispatch(GetUnitListAction());

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
                <h3 class="card-label">Salary Excel Form Generation</h3>
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
              <div className="form-group row">
                <label className="form-label mt-2">Salary Form</label>
                <br />
                <iframe
                  src="https://report.akij.net/ReportServer/Pages/ReportViewer.aspx?/ASLL/Employee%20vs%20Vessel%20Report&rs:Embed=true&rc:LinkTarget=_self "
                  height="800"
                  width="1200"
                  title="Iframe Example"
                ></iframe>
              </div>

              <div className="form-group row"></div>
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

export default AdditionDeductionBulkUploadForm;
