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
  AddVessel,
  VesselEmptyMessage,
} from "../../_redux/actions/VesselAction";
// import "./css/style.css";
import FileBase64 from "react-file-base64";
import { RHFInput } from "react-hook-form-input";

const VesselAdd = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();

  const [vesselInfo, setVesselInfo] = React.useState({
    strVesselName: "",
    strIMONumber: "",
    vesselTypeData: "",
    strVesselFlag: "",
    countryData: "",
    numDeadWeight: "",
    strBuildYear: "",
    strEngineName: "",
    intTotalCrew: "",
    ysnOwn: false,
  });

  // Callback~
  const getFiles = (files) => {
    console.log("Files", files);
    const imageFile = { ...vesselInfo };
    imageFile.image = files;
    setVesselInfo(imageFile);
  };

  const handleChange = ({ currentTarget: input }) => {
    const vesselInfoData = { ...vesselInfo };
    vesselInfoData[input.name] = input.value;
    setVesselInfo(vesselInfoData);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandle = (item, name) => {
    const vesselInfoData = { ...vesselInfo };
    vesselInfoData[name] = item;
    setVesselInfo(vesselInfoData);
  };

  const addStatus = useSelector((state) => state.vesselInfo.addStatus);
  const addMessage = useSelector((state) => state.vesselInfo.addMessage);
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
    dispatch(GetVesselTypeAction());
    dispatch(GetCountryDataAction());

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
        dispatch(VesselEmptyMessage());
        history.push("/vessels/list");
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(VesselEmptyMessage());
      }
    }
  }, [addStatus, addMessage]);

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(AddVessel(vesselInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Vessel Entry</h3>
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
              <div className="form-group row mt-5">
                <div className="col-lg-4">
                  <label className="form-label">Vessel Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Vessel Name"
                    name="strVesselName"
                    className="fromStyle"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">DWT</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Deadweight"
                    name="numDeadWeight"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.numDeadWeight &&
                      errors.numDeadWeight.type === "required" &&
                      "DWT can't be blank"}
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
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Engine Name</label>
                  <Form.Control
                    type="text"
                    name="strEngineName"
                    placeholder="Type Engine Name/KW"
                    className="fromStyle"
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
                    Next
                    </button> */}
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Submit</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Submit</span>
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

export default VesselAdd;
