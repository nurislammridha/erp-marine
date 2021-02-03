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
  AddVesselItem,
  VesselEmptyMessage,
} from "../../../VesselItem/_redux/actions/VesselItemAction";
// import "./css/style.css";
import FileBase64 from "react-file-base64";
import { RHFInput } from "react-hook-form-input";
import { GetVesselList } from "../../../Vessel/_redux/actions/VesselAction";

const CurrencyConversionEntry = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();

  const [vesselInfo, setVesselInfo] = React.useState({
    strVesselItemName: "",
    itemTypeData: "",
    vesselData: "",
    decDefaultPurchasePrice: "",
    decDefaultSalePrice: "",
    decQtyAvailable: "",
  });


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

  const addStatus = useSelector((state) => state.vesselItemInfo.addStatus);
  const addMessage = useSelector((state) => state.vesselItemInfo.addMessage);
  const vesselList = useSelector((state) => state.vesselInfo.vesselList);
  const countryList = useSelector((state) => state.vesselInfo.countryList);
  console.log('addStatus',addStatus,'addMessage',addMessage);
  let vessel = [];
  if (vesselList) {
    vesselList.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strVesselName,
      };
      vessel.push(items);
    });
  }


const ItemType=[
  {
    value:1,
    label:"Soft Drink"
  },
  {
    value:2,
    label:"Smoke"
  },
  {
    value:3,
    label:"Fast Food"
  },
] 

  useEffect(() => {
    dispatch(GetVesselTypeAction());
    dispatch(GetCountryDataAction());
    dispatch(GetVesselList());

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
        history.push("/vessel-items/list");
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
    dispatch(AddVesselItem(vesselInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b card-top-border">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Currency Conversion</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row ">
                <div className="col-lg-4">
                  <label className="form-label">Vessel Name</label>
                  <RHFInput
                    as={<Select options={vessel} />}
                    rules={{ required: true }}
                    name="vesselData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "vesselData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.vesselData &&
                      errors.vesselData.type === "required" &&
                      "Vessel Can't be blank"}
                  </div>
                </div>
               
                <div className="col-lg-4">
                  <label className="form-label">Avaiable Quantity</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Quantity Available"
                    name="decQtyAvailable"
                    className="formHeight"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.decQtyAvailable &&
                      errors.decQtyAvailable.type === "required" &&
                      "Vessel Name can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Default Purchase Price</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Purchase Price"
                    name="decDefaultPurchasePrice"
                    className="formHeight"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.decDefaultPurchasePrice &&
                      errors.decDefaultPurchasePrice.type === "required" &&
                      "Purchase Price can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Default Sale Price</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Sale Price"
                    name="decDefaultSalePrice"
                    className="formHeight"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.decDefaultSalePrice &&
                      errors.decDefaultSalePrice.type === "required" &&
                      "Sale Price can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Item Type</label>
                  <RHFInput
                    as={<Select options={ItemType} />}
                    rules={{ required: true }}
                    name="itemTypeData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "itemTypeData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.itemTypeData &&
                      errors.itemTypeData.type === "required" &&
                      "Item Type Can't be blank"}
                  </div>
                </div>
              </div>

              <div className="form-group row mt-3">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push("/vessels/list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-sm mr-2">
                      Back
                    </button>
                  </a>
                  {/* <button type="submit" class="btn btn-primary btn-lg">
                    Next
                    </button> */}
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-sm"
                      disabled={true}
                    >
                      <span>Submit</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-sm">
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

export default CurrencyConversionEntry;
