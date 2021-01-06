import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import FileBase64 from 'react-file-base64';
import { GetCargoTypeList, GetPortList, GetShipperList, GetChartererList, SaveDemandEntry } from "../redux/actions/DemandAction";
import { GetCountryDataAction } from "../../../domains/Vessel/_redux/actions/VesselAction";
import { checkObjectInArray } from '../../../domains/CCO/utils/Helper';
import { showToast } from '../../master/utils/ToastHelper';

const DemandEntry = withRouter(({ history, props }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  toast.configure();

  const [state, setState] = React.useState({
    strType: "",
    cargoType: null,
    fromDate: "",
    toDate: "",
    strCountry: null,
    quantity: "",
    etaDateLoadPort: "",
    etaDateCtgPort: "",
    remarks: "",
    selectedCargo: null,
    multipleList: [],
    attachment: null,
    images: null,
    images: ''
  });

  const handleChange = ({ currentTarget: input }) => {
    const employeeInfoData = { ...state };
    employeeInfoData[input.name] = input.value;
    setState(employeeInfoData);
  };

  const getFiles = (files) => {
    const imageFile = { ...state };
    imageFile.images = files[0];
    setState(imageFile);
console.log('files',files);

    // let data = {
    //   name: name,
    //   value: value,
    // }
    // let cloneObj = { ...state };
    // let reader = new FileReader();
    // const file = files[0];
  
    // reader.onloadend = () => {
    //   if (name === "images") {
    //     data.name = 'bannerPreviewUrl';
    //   }
    //   data.value = reader.result;
    //   setAttachmentPreview(data.value);
    //   cloneObj.images = value;
    //   setState(cloneObj);
    //   // data.value = reader.result;
    // }
    // reader.readAsDataURL(file)
}

const handleChangeTextInput = (name, value, e = null) => {
  let data = {
    name: name,
    value: value,
  }
  let cloneObj = { ...state };
  let reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = () => {
    if (name === "images") {
      data.name = 'bannerPreviewUrl';
    }
    data.value = reader.result;
    setAttachmentPreview(data.value);
    cloneObj.images = value;
    setState(cloneObj);
    // data.value = reader.result;
  }
  reader.readAsDataURL(file)
}

  const selectHandle = (data) => {
    const additionData = { ...state };
    additionData.cargoType = data;
    setState(additionData);
  };
  const selectCountry = (data) => {
    const additionData = { ...state };
    additionData.strCountry = data;
    setState(additionData);
  };
  const selectPortTo = (data) => {
    const additionData = { ...state };
    additionData.portTo = data;
    setState(additionData);
  };
  const selectPortFrom = (data) => {
    const additionData = { ...state };
    additionData.portFrom = data;
    setState(additionData);
  };


  const selectShipper = (data) => {
    const additionData = { ...state };
    additionData.shipper = data;
    setState(additionData);
  };

  const selectCharterer = (data) => {
    const additionData = { ...state };
    additionData.charterer = data;
    setState(additionData);
  };



  const addStatus = useSelector(
    (state) => state.demand.addStatus
  );

  const addMessage = useSelector(
    (state) => state.demand.addMessage
  );

  const cargoListData = useSelector((state) => state.demand.cargoList);
  const countryList = useSelector((state) => state.vesselInfo.countryList);
  const portListData = useSelector((state) => state.demand.portList);
  const shipperlistData = useSelector((state) => state.demand.shipperlist);
  const chartererlistData = useSelector((state) => state.demand.chartererlist);
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  useEffect(() => {
    dispatch(GetCargoTypeList());
    dispatch(GetCountryDataAction());
    dispatch(GetPortList());
    dispatch(GetShipperList());
    dispatch(GetChartererList());


    if (addStatus && addMessage.length > 0) {
      const updatedData = {
        strType: "",
        cargoType: null,
        fromDate: "",
        toDate: "",
        strCountry: null,
        quantity: "",
        etaDateLoadPort: "",
        etaDateCtgPort: "",
        remarks: "",
        selectedCargo: null,
        multipleList: [],
        portFrom: null,

        portTo: null,
        shipper: null,
        charterer: null,
        images: ''
      }
      setState(updatedData);
    }
  }, [addStatus, addMessage]);

  const addMultipleValue = (e) => {
    if (state.cargoType === null) {
      showToast('error', 'Please select an item !');
      return false;
    }
    if (state.strCountry === null) {
      showToast('error', 'Please select a country !');
      return false;
    }
    if (state.quantity === null || state.quantity === "0" || state.quantity === 0) {
      showToast('error', 'Please give a quantity greater than 0');
      return false;
    }
    let multipleList = [];
    const cloneObj = { ...state };
    let demandDataObj = {
      intItemId: state.cargoType.value,
      strItemName: state.cargoType.label,
      intQuantity: state.quantity,
      fromDate: state.fromDate,
      toDate: state.toDate,
      images: state.images.base64,
    };

    if (
      !checkObjectInArray(
        demandDataObj,
        state.multipleList,
        "intItemId"
      )
    ) {
      cloneObj.multipleList.push(demandDataObj);
      setState(cloneObj)
    } else {
      showToast('error', 'select another Item');
      return false;
    }

  };

  let country = [];
  if (countryList) {
    countryList.data.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
      };
      country.push(items);
    });
  }

  let cargoTypes = [];
  if (typeof cargoListData !== 'undefined' && cargoListData !== null) {
    cargoListData.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strItemName,
      };
      cargoTypes.push(items);
    });
  }
  let portFrom = [];
  if (typeof portListData !== 'undefined' && portListData !== null) {
    portListData.forEach((item) => {
      let items = {
        value: item.intPortId,
        label: item.strPortName,
      };
      portFrom.push(items);
    });
  }

  let shipper = [];
  if (typeof shipperlistData !== 'undefined' && shipperlistData !== null) {
    shipperlistData.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strShipperName,
      };
      shipper.push(items);
    });
  }


  let charterer = [];
  if (typeof chartererlistData !== 'undefined' && chartererlistData !== null) {
    chartererlistData.forEach((item) => {
      let items = {
        value: item.intChartererId,
        label: item.strChartererName,
      };
      charterer.push(items);
    });
  }




  const onSubmit = (e) => {
    if (state.cargoType === null) {
      showToast('error', 'Please select an item !');
      return false;
    }
    if (state.strCountry === null) {
      showToast('error', 'Please select a country !');
      return false;
    }
    if (state.quantity === null || state.quantity === "0" || state.quantity === 0) {
      showToast('error', 'Please give a quantity greater than 0');
      return false;
    }

    if (state.multipleList.length > 0) {
      dispatch(SaveDemandEntry(state, attachmentPreview));
    } else {
      showToast('error', 'Please click add Button ');
      return false;
    }

  };

  const deleteMultipleList = (data) => {
    let cloneObj = { ...state };
    let deleteMultiple = state.multipleList.filter(item => item.intItemId !== data.intItemId);
    cloneObj.multipleList = deleteMultiple;
    setState(cloneObj);

  }



  const deleteBrandsImage = () => {
    setAttachmentPreview(null);
  }

  return (
    <form
      className="form form-label-right"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      encType="multipart/form-data"
    >
      <div className="form-group row">
        <div className="col-lg-4">
          <label className="form-label">Material Name</label>
          <div>
            <RHFInput
              as={<Select options={cargoTypes} />}
              rules={{ required: false }}
              name="cargoType"
              register={register}
              value={state.cargoType != null ? state.cargoType.label : ''}
              onChange={selectHandle}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <label className="form-label">Laycan From Date</label>
          <Form.Control
            type="date"
            placeholder="Enter Result "
            name="fromDate"
            className="fromStyle"
            onChange={handleChange}
          // ref={register({
          //   required: false,
          //   maxLength: 100,
          // })}
          />
        </div>
        <div className="col-lg-4">
          <label className="form-label">Laycan To Date</label>
          <Form.Control
            type="date"
            name="toDate"
            className="fromStyle"
            onChange={handleChange}
          // ref={register({
          //   required: false,
          //   maxLength: 100,
          // })}
          />
        </div>
        <div className="col-lg-4">
          <label className="form-label">Country</label>
          <div>
            <RHFInput
              as={<Select options={country} />}
              // rules={{ required: false }}
              name="strCountry"
              register={register}
              value={country.label}
              onChange={selectCountry}
              setValue={setValue}
            />
          </div>
        </div>

        <div className="col-lg-4">
          <label className="form-label">Port From</label>
          <div>
            <RHFInput
              as={<Select options={portFrom} />}
              rules={{ required: false }}
              name="portFrom"
              register={register}
              value={state.portFrom != null ? state.portFrom.label : ''}
              onChange={selectPortFrom}
              setValue={setValue}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <label className="form-label">Port To</label>
          <div>
            <RHFInput
              as={<Select options={portFrom} />}
              rules={{ required: false }}
              name="portTo"
              register={register}
              value={state.portTo != null ? state.portTo.label : ''}
              onChange={selectPortTo}
              setValue={setValue}
            />
          </div>
        </div>

        <div className="col-lg-4">
          <label className="form-label">Quantity</label>
          <Form.Control type="number" placeholder="Quantity "
            name="quantity"
            className="fromStyle"
            onChange={handleChange}
          // ref={register({
          //   required: false,
          //   maxLength: 100,
          // })}
          />
        </div>

        <div className="col-lg-4">
          <label className="form-label">ETA Date(Load Port)</label>
          <Form.Control
            type="date"
            placeholder="Enter Result"
            name="etaDateLoadPort"
            className="fromStyle"
            onChange={handleChange}
          // ref={register({
          //   required: false,
          //   maxLength: 100,
          // })}
          />
        </div>
        <div className="col-lg-4">
          <label className="form-label">ETA Date(Discharge Port)</label>
          <Form.Control
            type="date"
            name="etaDateCtgPort"
            className="fromStyle"
            onChange={handleChange}
          // ref={register({
          //   required: false,
          //   maxLength: 100,
          // })}
          />
        </div>

        <div className="col-lg-4">
          <label className="form-label">Remarks</label>
          <Form.Control
            type="text"
            placeholder="Enter Remarks "
            name="remarks"
            onChange={handleChange}
          // ref={register({
          //   required: false,
          //   maxLength: 100,
          // })}
          />
        </div>
        <div className="col-lg-4">
          <label className="form-label">Shipper Name</label>
          <div>
            <RHFInput
              as={<Select options={shipper} />}
              rules={{ required: false }}
              name="shipper"
              register={register}
              value={state.shipper != null ? state.shipper.label : ''}
              onChange={selectShipper}
              setValue={setValue}
            />
          </div>
        </div>

        <div className="col-lg-4">
          <label className="form-label">Charterer Name</label>
          <div>
            <RHFInput
              as={<Select options={charterer} />}
              rules={{ required: false }}
              name="charterer"
              register={register}
              value={state.charterer != null ? state.charterer.label : ''}
              onChange={selectCharterer}
              setValue={setValue}
            />
          </div>
        </div>




        <div className="col-lg-4">
          <label className="form-label mt-2">
            Attachment
                    <span className="text-info text-sm">(Optional)</span>
          </label>
          {/* <Form.Control
            type="file"
            placeholder="Enter Banner Image"
            name="images"
            className="fromStyle"
            onChange={(e) => handleChangeTextInput('images', e.target.files[0], e)}
            ref={register({
              required: false,
              maxLength: 100,
            })}
          /> */}

          <FileBase64
            name="image"
            multiple={true}
            onDone={getFiles.bind(this)} />

          {
            attachmentPreview !== null &&
            <div className="imgPreview" title="Remove">
              <i className="fa fa-times text-danger text-right" onClick={() => deleteBrandsImage()}></i>
              <img src={attachmentPreview} className="img img-thumbnail" />

            </div>
          }
        </div>

        <div className="mt-4">
          <div className="from-group mt-5">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg "
              onClick={() => addMultipleValue()}
            >
              <i className="fa fa-plus-circle"></i>Add
                    </button>
          </div>
        </div>
      </div>

      <div className="react-bootstrap-table table-responsive mt-3 ">
        <table className="table table table-head-custom table-vertical-center">
          <thead>
            <tr>
              <td>SL</td>
              <td>Material Name</td>
              <td>Quantity</td>
              <td>From Date</td>
              <td>To Date</td>
              <td>Delete</td>
              {/* <td>Country</td>
                     
                      <td>ETA Date(Load Port)</td>
                      <td>ETA Date(CTG Port)</td>
                      <td>Remarks</td> */}
            </tr>
          </thead>
          <tbody>
            {
              state.multipleList.map((item, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{item.strItemName}</td>
                  <td>{item.intQuantity}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-elevate"
                      onClick={() => deleteMultipleList(item)}
                    >
                      Delete
                      </button>
                  </td>
                </tr>

              ))
            }

          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="from-group">
          <button
            type="submit"
            className="btn btn-primary btn-lg demandBtn"
          >
            Submit
                  </button>
        </div>

        <div className="from-group ml-3">
          <button
            type="button"
            className="btn btn-danger btn-lg demandBtn"
          >
            Cancel
                  </button>
        </div>
      </div>
    </form>
  );
});

export default DemandEntry;
