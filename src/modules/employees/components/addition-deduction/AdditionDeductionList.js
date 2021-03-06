import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./css/style.css";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEmployeeListForDropdown,
  GetEmployeeList,
} from "../../_redux/actions/EmployeeAction";
import FileBase64 from "react-file-base64";
// import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
import { checkAttchmentValidation } from "../../../../modules/master/utils/FileHelper";
import { showToast } from "../../../../modules/master/utils/ToastHelper";
import {
  GetAdditionDeductionTypeList,
  AddAdditionDeductionAction,
  EmptyAdditionDeductionAddMessage,
  GetAdditionDeductionListByEmployee,
  DeleteEmployeeAdditionDeductionData,
  EmptyDeductionDeleteMessage,
  UpdateEmployeeAdditionDeduction,
  GetVesselAccountDetails,
  GetVesselItem,
  GetVesselItemById,
  GetTransactionTypeList,
} from "../../_redux/actions/AdditionDeductionAction";
import { ToastContainer, toast } from "react-toastify";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { getAdditionDeductionType } from "../../dropdowns/AdditionDeductionDropdowns";
import moment from "moment";
import { GetVesselList } from "../../_redux/actions/EmployeeApplicationAction";
// import { GetVesselList } from "../../../../_redux/actions/EmployeeApplicationAction";;

const AdditionDeductionList = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  toast.configure();
  const [addition, setAddition] = useState({
    isShow: false,
    employeeDetails: "",
    multipleList: [],
    strAmount: "",
    AdditionDeductionType: "",
    isBondIssue: true,
    isCashAdvance: false,
    currencyData: {
      value: 1,
      label: "USD",
    },
    vesselData: "",
    images: "",
    decQty: 0,
    // monthData:{
    //   label:''
    // },
    vesselItemData: "",
    yearData: {
      label: moment().format("YYYY"),
      value: parseInt(moment().format("YYYY")),
    },
    monthData: {
      label: moment().format("MMMM"),
      value: moment().format("M"),
    },
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [employeeInfo, setEmployeeInfo] = useState({
    searched_employees_list: [],
    search_employee_text: "",
    searchText: [],
    ysnOwner: false,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  // Example 8
  const useStyles8 = makeStyles({
    root: {
      padding: "2px",
      display: "flex",
      alignItems: "center",
      width: 250,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  });

  const additionDeductionTypeList = useSelector(
    (state) => state.additionDeductionInfo.additionDeductionTypeList
  );
  const additionDeductionByEmployeeList = useSelector(
    (state) => state.additionDeductionInfo.additionDeductionByEmployeeList
  );
  const vesselItemDetails = useSelector(
    (state) => state.additionDeductionInfo.vesselItemDetails
  );


  const deleteStatus = useSelector(
    (state) => state.additionDeductionInfo.deleteStatus
  );
  const deleteMessage = useSelector(
    (state) => state.additionDeductionInfo.deleteMessage
  );
  const editStatus = useSelector(
    (state) => state.additionDeductionInfo.editStatus
  );
  const editMessage = useSelector(
    (state) => state.additionDeductionInfo.editMessage
  );

  const employeeInfoList = useSelector(
    (state) => state.employeeInfo.employeeInfoList
  );
  const addStatus = useSelector((state) => state.additionDeductionInfo.addStatus);
  const addMessage = useSelector((state) => state.additionDeductionInfo.addMessage);
  const VesselList = useSelector((state) => state.vesselInfo.vesselListOptions);
  const vesselAccountDetails = useSelector(
    (state) => state.additionDeductionInfo.vesselAccountDetails
  );
  const transactionTypeList = useSelector(
    (state) => state.additionDeductionInfo.transactionTypeList
  );
  const vesselItemList = useSelector(
    (state) => state.additionDeductionInfo.vesselItemList
  );
  // dropdowns
  const additionDeductionDDL = getAdditionDeductionType(
    additionDeductionTypeList
  );


  let VesselItemList = [];
  if (vesselItemList) {
    vesselItemList.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strVesselItemName,
      };
      VesselItemList.push(items);
    });
  }

  let TransactionType = [];
  if (transactionTypeList) {
    transactionTypeList.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
      };
      TransactionType.push(items);
    });
  }
  useEffect(() => {
    const yearData = {
      label: moment().format("YYYY"),
      value: parseInt(moment().format("YYYY")),
    };
    setValue("yearData", yearData);
    dispatch(GetAdditionDeductionTypeList());
    dispatch(GetAdditionDeductionListByEmployee(selectedEmployeeId));
    dispatch(GetVesselList());
    dispatch(GetEmployeeListForDropdown());
    dispatch(GetTransactionTypeList());
    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (addStatus && addMessage.length > 0) {
        disableLoading();
        // window.location.reload();
        toast.success(addMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyAdditionDeductionAddMessage());
        dispatch(GetAdditionDeductionListByEmployee(selectedEmployeeId));
        // history.push("/addition-deduction");
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyAdditionDeductionAddMessage());
      }

      if (deleteStatus && deleteMessage.length > 0) {
        toast.success(deleteMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyDeductionDeleteMessage());
        dispatch(GetAdditionDeductionListByEmployee(selectedEmployeeId));
      }
    }
  }, [
    addStatus,
    addMessage,
    deleteMessage,
    deleteStatus,
    editStatus,
    editMessage,
  ]);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleChange = ({ currentTarget: input }) => {

    const additionData = { ...addition };
    additionData[input.name] = input.value;
    // if(additionData["isBondIssue"] = true){
    //   if(addition.transactionTypeData.label==='Received'){
    //     additionData.strAmount=vesselItemDetails.decDefaultSalePrice
    //   }else{
    //     additionData.strAmount=vesselItemDetails.decDefaultPurchasePrice
    //   }
     
    // }else{
    //   additionData[input.name] = input.value;
    // }
   
    setAddition(additionData);
  };

  const selectHandle = (item, name) => {
    const additionData = { ...addition };
    additionData[name] = item;
    if (name === "AdditionDeductionType") {
      if (item.label === "Bond Statement") {
        additionData["isBondIssue"] = true;
      } else {
        additionData["isBondIssue"] = false;
        additionData["decQty"] = 1;
      }

      if (item.label === "Cash Statement") {
        additionData["isCashAdvance"] = true;
      } else {
        additionData["isCashAdvance"] = false;
      }
    }
    setAddition(additionData);
  };
  const selectVesselHandle = (item, name) => {
    
    dispatch(GetVesselAccountDetails(item.value));
    dispatch(GetVesselItem(item.value));
    const additionData = { ...addition };
    additionData[name] = item;
    setAddition(additionData);
  };

  const selectItemVesselHandle = (item, name) => {
    dispatch(GetVesselItemById(item.value));
    const additionData = { ...addition };
    additionData[name] = item;
    setAddition(additionData);
  };

  const selectHandleCurrency = (data) => {
    const additionData = { ...addition };
    additionData.currencyData = data;
    setAddition(additionData);
  };

  const handleChecked = (status) => {
    dispatch(GetVesselAccountDetails());
    let cloneObj = { ...employeeInfo };
    cloneObj.ysnOwner = !employeeInfo.ysnOwner;
    cloneObj.isShow = false;
    setEmployeeInfo(cloneObj);
  };

  /**
   * Search Employee Info
   *
   * Search Filter of Employee
   * @param string SearchText
   */
  const searchEmployee = (event) => {
    
    const employeeInfoData = { ...employeeInfo };
    let searchText = event.target.value;

    // let errorMessage = this.state.errorMessage;

    // Search Delivery Points using javascript
    const searched_employees = employeeInfoList.filter(function(item) {
      let strName = item.intID + " " + item.strEmail+ " " + item.strCDCNo;
      strName += item.strName ? item.strName.toUpperCase() : "".toUpperCase();
      const itemData = strName.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (searched_employees.length > 0) {
      //remove error message
      employeeInfoData.searched_employees_list = searched_employees;
      employeeInfoData.searchText = searchText;
      setEmployeeInfo(employeeInfoData);
    } else {
      const employeeInfoData = { ...employeeInfo };
      employeeInfoData.searched_employees = searched_employees;
      employeeInfoData.searchText = searchText;
      setEmployeeInfo(employeeInfoData);
      // setEmployeeInfo({
      //     searched_employees,
      //     intID: '',
      // });
    }
  };

  /**
   * selectShip
   */
  const selectEmployee = async (item) => {
    dispatch(GetVesselItem(item.intVesselID));
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.employeeName = item.strName;
    setEmployeeInfo(employeeInfoData);
    setEmployeeInfo({ searchText: [] });

    const additionData = { ...addition };
    if(!employeeInfo.ysnOwner){
      additionData.employeeDetails = item;
    }
  
    additionData.isShow = true;
    setAddition(additionData);
    setSelectedEmployeeId(item.intID);
    // setAddition({ isShow: true })

    dispatch(GetAdditionDeductionListByEmployee(item.intID));
  };
  // Example 8
  const classes8 = useStyles8();

  const showList = () => {
    setAddition({ isShow: true });
  };

  const getFiles = (files) => {
    handleChangeTextInput("images", files[0]);
  };

  const handleChangeTextInput = (name, value) => {
    const additionData = { ...addition };
    additionData[name] = value;

    if (name === "images") {
      const attachment = value;
      const { type } = attachment;

      const validatedData = checkAttchmentValidation(attachment);
      if (validatedData.isValidated) {
        let reader = new FileReader();
        if (type === "application/pdf") {
          setImagePreviewUrl("/media/default/icons/pdf.png");
        } else if (type === "application/msword") {
          setImagePreviewUrl("/media/default/icons/word.png");
        } else {
          // reader.onloadend = () => {
          //   setImagePreviewUrl(reader.result);
          // };
          // reader.readAsDataURL(value);
          setImagePreviewUrl("/media/default/icons/image.jpg");
        }
      } else {
        showToast("error", validatedData.message);
      }
      setAddition(additionData);
    } else {
      setAddition(additionData);
    }
  };

  const deleteImagePreview = () => {
    setImagePreviewUrl(null);
    const additionData = { ...addition };
    additionData["images"] = null;
    setAddition(additionData);
  };

  const addMultipleValue = (e) => {
    e.preventDefault();
    // console.log('employeeInfo', employeeInfo);
    // return false
    let message = "";
    if (addition.AdditionDeductionType === "") {
      message += "Type Can't be Blank,  ";
    }

    if (addition.strAmount === "") {
      message += "Amount Can't be Blank";
    }
    if (addition.transactionTypeData === "") {
      message += "Transaction Type Can't be Blank";
    }
    // if (addition.isCashAdvance) {
    //   if (addition.images === "") {
    //     message += "Attachment Can't be Blank in Cash Statement";
    //   }
    // }

    if (message.length > 0) {
      toast.error(message, {
        autoClose: 3000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    let multipleList = [];
    const additionData = { ...addition };
    let additionDataObj = {
      strTypeName: additionData.AdditionDeductionType.label,
      intTypeId: additionData.AdditionDeductionType.value,
      decQty: additionData.decQty,
      intVesselItemId:
        additionData.AdditionDeductionType.label == "Bond Statement"
          ? additionData.vesselItemData.value
          : null,
      strVesselItemName:
        additionData.AdditionDeductionType.label == "Bond Statement"
          ? additionData.vesselItemData.label
          : "",
      intMonthId: additionData.monthData.value,
      // intVesselId: additionData.vesselData.value,
      // strVesselName: additionData.vesselData.label,
      intYear: additionData.yearData.label,
      intTransactionTypeId: additionData.transactionTypeData.value,
      strAmount: additionData.strAmount,
      strRemarks: additionData.strRemarks,
      images: additionData.images.base64,
      ysnAddition: additionData.AdditionDeductionType.ysnAddition,
    };

    // if (
    //   !checkObjectInArray(
    //     additionDataObj,
    //     additionData.multipleList,
    //     "intTypeId"
    //   )
    // ) {
    multipleList.push(additionDataObj);

    additionData["AdditionDeductionType"] = "";
    setValue("AdditionDeductionType", "");

    additionData["strAmount"] = "";
    setValue("strAmount", "");

    // additionData["intMonthId"] = "";
    // setValue("intMonthId", "");

    additionData["intYear"] = "";
    setValue("intYear", "");
    if (addition.isCashAdvance) {
      additionData["images"] = "";
      setValue("images", "");
    }
    additionData["strVesselItemName"] = "";
    setValue("strVesselItemName", "");

    additionData["intVesselItemId"] = "";
    setValue("intVesselItemId", "");

    additionData.multipleList.push(additionDataObj);
    setAddition(additionData);
    totalAmount();
    // } else {
    //   alert("Give Unique Data");
    // }
  };
  const currency = [
    {
      value: 1,
      label: "USD",
    },

    {
      value: 2,
      label: "BDT",
    },
  ];

  const year = [
    {
      value: 2020,
      label: "2020",
    },

    {
      value: 2021,
      label: "2021",
    },
  ];

  const months = [
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

  const multipleListDelete = (index) => {
    let additionData = { ...addition };
    addition.multipleList.splice(index, 1);
    setAddition(additionData);
    totalAmount();
  };
  const totalAmount = () => {
    let subTotal = 0;
    for (let i = 0; i < addition.multipleList.length; i++) {
      const element = addition.multipleList[i];
      if (element.ysnAddition == "1") {
        subTotal += parseFloat(element.strAmount) * parseFloat(element.decQty);
      } else {
        subTotal -= parseFloat(element.strAmount) * parseFloat(element.decQty);
      }
    }
    const additionData = { ...addition };
    additionData.strSubtotal = subTotal;
    setAddition(additionData);
  };

  const onSubmit = (data) => {
    if (addition.multipleList.length > 0) {
      enableLoading();
      dispatch(AddAdditionDeductionAction(addition));
    } else {
      toast.error("Click add for multiple listing", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  };

  const deleteData = (intID) => {
    dispatch(DeleteEmployeeAdditionDeductionData(intID));
    // dispatch(GetAdditionDeductionListByEmployee(selectedEmployeeId));
  };

  const updateAmount = (e, item, index) => {
    const amount = e.target.value;
    const intID = item.intID;
    dispatch(UpdateEmployeeAdditionDeduction(intID, amount, false));
    dispatch(UpdateEmployeeAdditionDeduction(intID, amount, true));
    // dispatch(GetAdditionDeductionListByEmployee(selectedEmployeeId));
  };
  //   console.log(
  //     "employeeInfo.searched_employees_list",
  //     employeeInfo.searched_employees_list
  //   );
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Expense Entry</h3>
            </div>
            <small className="form-text text-muted">
              <p>Salary addition/deduction</p>
            </small>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row">
                <div className="col-lg-2 mt-6">
                  <Form.Check
                    type="checkbox"
                    label="Owner"
                    name="ysnOwner"
                    checked={employeeInfo.ysnOwner}
                    id="ysnOwner"
                    onChange={handleChecked}
                  />
                </div>
                {!employeeInfo.ysnOwner && (
                  <div className="col-lg-8 row">
                    <div>
                      <Paper className={classes8.root}>
                        <IconButton
                          className={classes8.iconButton}
                          aria-label="Search"
                        >
                          <i className="flaticon-search"></i>
                        </IconButton>
                        <InputBase
                          className={classes8.input}
                          placeholder="Search Employee Here"
                          inputProps={{ "aria-label": "Search Google Maps" }}
                          onChange={(e) => searchEmployee(e)}
                          value={employeeInfo.employeeName}
                        />
                      </Paper>
                    </div>
                    {/* <div>
                                        <button type="button" className="btn btn-primary btn-lg ml-2 search" onClick={showList}>Search</button>
                                    </div> */}
                  </div>
                )}
                {employeeInfo.ysnOwner && (
                  <div className="col-md-4">
                    <label className="form-label">Vessel</label>
                    <RHFInput
                      as={<Select options={VesselList} />}
                      rules={{ required: false }}
                      name="vesselData"
                      register={register}
                      value={VesselList.label}
                      onChange={(e) => selectVesselHandle(e, "vesselData")}
                      setValue={setValue}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-3 searchlist">
                {employeeInfo.searchText.length > 0 &&
                  employeeInfo.searched_employees_list.length > 0 &&
                  employeeInfo.searched_employees_list.map((item, index) => (
                    <div className="list-group">
                      <a
                        href="#"
                        onClick={() => selectEmployee(item)}
                        className="list-group-item list-group-item-action"
                      >
                        {item.strName + "-" + item.strCDCNo}
                      </a>
                    </div>
                  ))}
              </div>

              { addition.isShow === true || vesselAccountDetails[0] ? (
                <div>
                  {employeeInfo.ysnOwner && vesselAccountDetails[0] != null ? (
                    <div className="react-bootstrap-table table-responsive">
                      <table className="table table table-head-custom table-vertical-center">
                        <thead>
                          <tr>
                            <td>Bond Account Balance</td>
                            <td>Cash Account Balance</td>
                            <td>Vessel Name</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="line">
                              {parseFloat(
                                vesselAccountDetails[0].decBondAccountBalance
                              ).toFixed(2)}
                            </td>
                            <td className="line">
                              {parseFloat(
                                vesselAccountDetails[0].decCashAccountBalance
                              ).toFixed(2)}
                            </td>
                            <td className="line">
                              {vesselAccountDetails[0].strVesselName}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </table>
                      <hr style={{ backgroundColor: "#3699FF" }}></hr>
                    </div>
                  ) : (!employeeInfo.ysnOwner) ?
                    <div className="react-bootstrap-table table-responsive">
                    <table className="table table table-head-custom table-vertical-center">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Rank</td>
                          <td>Vessel</td>
                          <td>Email</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="line">
                            {addition.employeeDetails.strName}
                          </td>
                          <td className="line">
                            {addition.employeeDetails.strRank}
                          </td>
                          <td className="line">
                            {addition.employeeDetails.strEmail}
                          </td>
                          <td className="line">
                            {addition.employeeDetails.strEmail}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                    <hr style={{ backgroundColor: "#3699FF" }}></hr>
                  </div>
                    :null}

                  <div className="float-right col-md-4 row">
                    <div className="col-md-4">
                      <p style={{ fontWeight: "bold" }}>Currency Rate</p>
                      <p>1 USD = 84.00 BDT</p>
                    </div>
                    <div className="col-md-4">
                      <RHFInput
                        as={<Select options={currency} />}
                        rules={{ required: true }}
                        name="currencyData"
                        register={register}
                        defaultValue={addition.currencyData}
                        value={addition.currencyData}
                        onChange={selectHandleCurrency}
                        setValue={setValue}
                      />
                    </div>
                    <div className="inputError margin-minus-10">
                      {errors.currencyData &&
                        errors.currencyData.type === "required" &&
                        "Currency can't be blank"}
                    </div>
                  </div>
                  <div className="col-md-12 row">
                    <div className="col-md-4">
                      <label className="form-label">Addition Deduction Type</label>
                      <RHFInput
                        as={<Select options={additionDeductionDDL} />}
                        rules={{ required: false }}
                        name="AdditionDeductionType"
                        register={register}
                        value={additionDeductionDDL.label}
                        onChange={(e) =>
                          selectHandle(e, "AdditionDeductionType")
                        }
                        setValue={setValue}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Transaction Type</label>
                      <RHFInput
                        as={<Select options={TransactionType} />}
                        rules={{ required: false }}
                        name="transactionTypeData"
                        register={register}
                        value={TransactionType.label}
                        onChange={(e) =>
                          selectHandle(e, "transactionTypeData")
                        }
                        setValue={setValue}
                      />
                    </div>

                    {addition.isBondIssue && (
                      <div className="col-md-4">
                        <label className="form-label">Item</label>
                        <RHFInput
                          as={<Select options={VesselItemList} />}
                          rules={{ required: false }}
                          name="vesselItemData"
                          register={register}
                          value={VesselItemList.label}
                          onChange={(e) =>
                            selectItemVesselHandle(e, "vesselItemData")
                          }
                          setValue={setValue}
                        />
                      </div>
                    )}

                    {addition.isCashAdvance && (
                      <div className="mt-10">
                        <FileBase64
                          name="image"
                          multiple={true}
                          onDone={getFiles.bind(this)}
                        />
                      </div>
                    )}
                    {imagePreviewUrl !== null && (
                      <div className="imgPreview" title="Remove">
                        <div className="preview-delete-icon">
                          <i
                            className="fa fa-times text-danger"
                            onClick={() => deleteImagePreview()}
                          ></i>
                        </div>
                        <img
                          src={imagePreviewUrl}
                          className="img img-thumbnail"
                          alt=""
                        />
                      </div>
                    )}

                    <div className="col-md-2">
                      <label className="form-label">Quantity</label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Employee First Name "
                        name="decQty"
                        className="fromStyle"
                        value={addition.decQty}
                        onChange={handleChange}
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Amount</label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Amount "
                        name="strAmount"
                        className="fromStyle"
                        value={addition.strAmount}
                        onChange={handleChange}
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Remarks</label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Employee First Name "
                        name="strRemarks"
                        className="fromStyle"
                        onChange={handleChange}
                        ref={register({
                          required: false,
                          maxLength: 100,
                        })}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Month</label>
                      <RHFInput
                        as={<Select options={months} />}
                        rules={{ required: false }}
                        name="monthData"
                        register={register}
                        value={addition.monthData}
                        onChange={(e) => selectHandle(e, "monthData")}
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
                        value={addition.yearData}
                        onChange={(e) => selectHandle(e, "yearData")}
                        setValue={setValue}
                      />
                    </div>

                    <div className="col-md-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg mt-6"
                        onClick={(e) => addMultipleValue(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8 row">
                    <table className="table table table-head-custom table-vertical-center">
                      <tbody>
                        {addition.multipleList.length > 0 &&
                          addition.multipleList.map((item, index) => (
                            <tr key={index}>
                              <td className="line">{item.strTypeName}</td>
                              <td className="line">{item.strVesselItemName}</td>
                              <td className="line">{item.decQty}</td>
                              <div className="float-right">
                                <td className="line">
                                  {item.ysnAddition == "0" ? "-" : ""}
                                  {item.strAmount}
                                </td>
                                <td>
                                  <a
                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                    onClick={() => multipleListDelete(index)}
                                  >
                                    <i className="fa fa-times-circle"></i>
                                  </a>
                                </td>
                              </div>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <hr
                    className="col-md-8 float-left"
                    style={{ backgroundColor: "#3699FF" }}
                  ></hr>
                  <div
                    className="col-md-8 row"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p style={{ fontWeight: "bold", fontSize: 20 }}>
                      Payable Amount
                    </p>
                    <p style={{ fontWeight: "bold", fontSize: 20 }}>
                      {addition.strSubtotal}
                    </p>
                  </div>
                  {/* <div className="col-sm-2 float-right">
                                        <button type="submit" className="btn btn-primary btn-lg ">Submit</button>
                                    </div> */}

                  {loading && (
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Submit</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" className="btn btn-primary btn-lg">
                      <span>Submit</span>
                    </button>
                  )}
                </div>
              ) : null}
            </form>
          </div>
        </div>

        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Addition/Deduction Data</h3>
            </div>
            <small className="form-text text-muted">
              <p>Salary addition/deduction</p>
            </small>
          </div>
          <div className="card-body">
            {additionDeductionByEmployeeList.length === 0 && (
              <div className="alert text-danger">
                <p>No Addition/Deduction Found ! Please Search again !!</p>
              </div>
            )}
            {additionDeductionByEmployeeList.length > 0 && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Seaferar</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                  {additionDeductionByEmployeeList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.strAdditionDeductionTypeName}</td>
                      <td>
                        <input
                          type="number"
                          onChange={(e) => updateAmount(e, item)}
                          value={parseFloat(item.amount).toFixed(2)}
                        />
                      </td>
                      <td>{item.strName}</td>
                      <td>
                        {moment(item.created_at).format("Do MMMM YYYY h:mm a")}
                      </td>
                      <td>
                        <a
                          className="btn btn-icon btn-light btn-hover-danger btn-sm"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete details data"
                              )
                            )
                              deleteData(item.intID);
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </thead>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default AdditionDeductionList;
