import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import { deleteProductImagePreview, handleChangeProductInputAction } from "../../_redux/actions/CertificateMainAction";

const CertificateMasterAdd = withRouter(({ history, props }) => {
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
  const serverErrors = useSelector((state) => state.certificateMainInfo.errors);
  const productData = useSelector((state) => state.certificateMainInfo.productData);
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

  const handleChangeTextInput = (name, value, e=null) => {
    dispatch(handleChangeProductInputAction(name, value, e));
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
              <h3 class="card-label">Certificate Master Create</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row mt-5">

                <div className="col-lg-4">
                  <label className="form-label">Certificate Name</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: true }}
                    name="certificateTypeData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "certificateTypeData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Certificate Category Name</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: true }}
                    name="certificateTypeData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "certificateTypeData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Vessel Name</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: true }}
                    name="certificateTypeData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "certificateTypeData")}
                    setValue={setValue}
                  />

                  {/* <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div> */}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push("/certificates-main/list");
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

export default CertificateMasterAdd;