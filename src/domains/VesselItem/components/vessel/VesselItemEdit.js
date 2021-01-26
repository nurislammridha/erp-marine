import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  GetVesselTypeAction,
  GetCountryDataAction,
  UpdateVessel,
  VesselEmptyEditMessage,
  GetVesselDetails,
} from "../../_redux/actions/VesselItemAction";
// import "./css/style.css";
import FileBase64 from "react-file-base64";
import { RHFInput } from "react-hook-form-input";

const VesselItemEdit = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();
  console.log('PropsData',props.location.state.vessel);
  const {
    intID,
    intTotalCrew,
    numDeadWeight,
    numNetWeight,
    numGrossWeight,
    strBuildYear,
    strEngineName,
    strVesselFlag,
    strVesselName,
    intVesselTypeID,
    intYardCountryId,
    strVesselTypeName,
    strYardCountryName,
    ysnOwn,
    strIMONumber,
  } = props.location.state.vessel;
  const [vesselInfo, setVesselInfo] = React.useState({
    intID: intID,
    strVesselName: strVesselName,
    strIMONumber: strIMONumber,
    strVesselFlag: strVesselFlag,
    numDeadWeight: numDeadWeight,
    numNetWeight: numNetWeight,
    numGrossWeight: numGrossWeight,
    strBuildYear: strBuildYear,
    strEngineName: strEngineName,
    intTotalCrew: intTotalCrew,
    vesselTypeData: {
      value: intVesselTypeID,
      label: strVesselTypeName,
    },
    ysnOwn: ysnOwn == "1" ? true : false,

    countryData: {
      value: intYardCountryId,
      label: strYardCountryName,
    },
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  // Callback~
  const getFiles = (files) => {
    const imageFile = { ...vesselInfo };
    imageFile.image = files;
    setVesselInfo(imageFile);
  };

  const handleChange = ({ currentTarget: input }) => {
    const vesselInfoData = { ...vesselInfo };
    vesselInfoData[input.name] = input.value;
    setVesselInfo(vesselInfoData);
  };

  const selectHandle = (item, name) => {
    const vesselInfoData = { ...vesselInfo };
    vesselInfoData[name] = item;
    setVesselInfo(vesselInfoData);
  };

  const editStatus = useSelector((state) => state.vesselInfo.editStatus);
  const editMessage = useSelector((state) => state.vesselInfo.editMessage);
  const vesselTypeList = useSelector(
    (state) => state.vesselInfo.vesselTypeList
  );
  const countryList = useSelector((state) => state.vesselInfo.countryList);
  let vesselType = [];
  if (vesselTypeList.data) {
    vesselTypeList.data.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
      };
      vesselType.push(items);
    });
  }

  let Country = [];
  if (countryList) {
    countryList.data.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
      };
      Country.push(items);
    });
  }

  const handleChecked = (status) => {
    console.log("status", status.currentTarget.value);

    let cloneObj = { ...vesselInfo };
    cloneObj.ysnOwn = !vesselInfo.ysnOwn;
    setVesselInfo(cloneObj);
    console.log("employee", vesselInfo);
    console.log("status checked", status.target.checked);
  };

  useEffect(() => {
    // vesselDetails();
    dispatch(GetVesselTypeAction());
    dispatch(GetCountryDataAction());

    const vesselTypeData = {
      value: intVesselTypeID,
      label: strVesselTypeName,
    };

    const countryData = {
      value: intYardCountryId,
      label: strYardCountryName,
    };
    setValue("vesselTypeData", vesselTypeData);
    setValue("countryData", countryData);

    if (typeof editMessage === null || typeof editMessage === "undefined") {
      disableLoading();
      toast.error("Somthing Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (editStatus && editMessage.length > 0) {
        disableLoading();
        toast.success(editMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(VesselEmptyEditMessage());
        history.push("/vessels/list");
      }

      if (!editStatus && editMessage.length > 0) {
        disableLoading();
        toast.error(editMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(VesselEmptyEditMessage());
      }
    }
  }, [editStatus, editMessage]);

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(UpdateVessel(vesselInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Vessel Update</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="col-lg-2">
                <Form.Check
                  type="checkbox"
                  label="Own Vessel"
                  name="ysnOwn"
                  checked={vesselInfo.ysnOwn}
                  id="ysnOwn"
                  onChange={handleChecked}
                />
              </div>
              <div className="form-group row  mt-5">
                <div className="col-lg-4">
                  <label className="form-label">Vessel Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Vessel Name"
                    name="strVesselName"
                    className="fromStyle"
                    onChange={handleChange}
                    value={vesselInfo.strVesselName}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.strVesselName &&
                      errors.strVesselName.type === "required" &&
                      "Vessel Name can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">IMO</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter IMO Number"
                    name="strIMONumber"
                    className="fromStyle"
                    onChange={handleChange}
                    value={vesselInfo.strIMONumber}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.strIMONumber &&
                      errors.strIMONumber.type === "required" &&
                      "Vessel Name can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Vessel Type</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: false }}
                    name="vesselTypeData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "vesselTypeData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.vesselType &&
                      errors.vesselType.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Flag</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Flag"
                    name="strVesselFlag"
                    className="fromStyle"
                    value={vesselInfo.strVesselFlag}
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strVesselFlag &&
                      errors.strVesselFlag.type === "required" &&
                      "Flag Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">DWT</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter DWT"
                    name="numDeadWeight"
                    className="fromStyle"
                    value={vesselInfo.numDeadWeight}
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.numDeadWeight &&
                      errors.numDeadWeight.type === "required" &&
                      "Deadweight can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">GRT</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter GRT"
                    name="numGrossWeight"
                    className="fromStyle"
                    onChange={handleChange}
                    value={vesselInfo.numGrossWeight}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.numGrossWeight &&
                      errors.numGrossWeight.type === "required" &&
                      "Deadweight can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">NRT</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter NRT"
                    name="numNetWeight"
                    className="fromStyle"
                    onChange={handleChange}
                    value={vesselInfo.numNetWeight}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.numNetWeight &&
                      errors.numNetWeight.type === "required" &&
                      "Deadweight can't be blank"}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Yard Country</label>
                  <RHFInput
                    as={<Select options={Country} />}
                    rules={{ required: false }}
                    name="countryData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "countryData")}
                    setValue={setValue}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Build Year</label>
                  <Form.Control
                    type="text"
                    name="strBuildYear"
                    placeholder="Select Build Year, eg;2018"
                    className="fromStyle"
                    value={vesselInfo.strBuildYear}
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Engine Name/KW</label>
                  <Form.Control
                    type="text"
                    name="strEngineName"
                    placeholder="Type Engine Name/KW"
                    className="fromStyle"
                    value={vesselInfo.strEngineName}
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Total Crew</label>
                  <Form.Control
                    type="text"
                    name="intTotalCrew"
                    placeholder="Type Total Crew, eg; 20"
                    className="fromStyle"
                    value={vesselInfo.intTotalCrew}
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push("/vessels/list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg mr-2">
                      Back
                    </button>
                  </a>
                  {/* <button type="submit" class="btn btn-primary btn-lg">
                                        Update
                                    </button> */}
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Update</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Update</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default VesselItemEdit;
