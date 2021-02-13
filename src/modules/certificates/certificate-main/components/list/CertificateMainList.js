import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import "./style.css";
import { generateStringDateFromDate } from "../../../../../domains/CCO/utils/DateHelper";
import {
  changeColorCode,
  getCertificateCategory,
  getCertificateMainListAction,
  handleColorCode,
} from "../../_redux/actions/CertificateMainAction";
import "./style.css";
import {
  getCertificateChildCategoryData,
  getCertificateParentCategoryData,
} from "../../../certificate-category/_redux/actions/CertificateCategoryAction";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateDetails from "../create/details/CertificateDetails";
// import { CirclePicker, Circle } from 'react-color';

const CertificateMainList = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [expireInDays, setExpireInDays] = useState(30);

  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const certificates = useSelector((state) => state.certificateMainInfo.certificates);
  const certificateExpireDaysList = useSelector((state) => state.certificateMainInfo.certificateExpireDaysList);
  const certificatesPaginatedData = useSelector((state) => state.certificateMainInfo.certificatesPaginatedData);
  const certificateParentCategoryList = useSelector((state) => state.CertificateCategoryReducer.certificateParentCategoryList);
  const certificateChildCategoryList = useSelector((state) => state.CertificateCategoryReducer.certificateChildCategoryList);

  const certificateBackgroundColor = useSelector((state) => state.certificateMainInfo.certificateBackgroundColor);
  const bottomStatus = useSelector((state) => state.certificateMainInfo.bottomStatus);

  console.log('bottomStatus :>> ', bottomStatus);

  useEffect(() => {
    dispatch(getCertificateMainListAction(currentPage));
    dispatch(getCertificateCategory());
    dispatch(getCertificateParentCategoryData());
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateMainListAction(data.page));
  };

  const certificateSelect = (category) => {
    dispatch(
      getCertificateMainListAction(currentPage, searchText, 1, category)
    );
  };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getCertificateMainListAction(currentPage));
    } else {
      dispatch(getCertificateMainListAction(currentPage, searchText));
    }
  };

  const handleClick = (event) => {
    console.log(event);
  };

  const certificateDelete = () => { };

  const getCertificateColorClass = (difference) => {
    let rowClassName = "";
    if (difference === 0) {
      rowClassName = "due-0";
    } else if (difference > 0 && difference <= 30) {
      rowClassName = "due-l-30";
    } else if (difference > 30 && difference < 60) {
      rowClassName = "due-30-60";
    } else if (difference >= 60) {
      rowClassName = "due-g-60";
    }
    return rowClassName;
  };
  const getColorCode = (difference) => {
    let colorCode = "";
    if (difference === 0) {
      colorCode = "red";
    } else if (difference > 0 && difference <= 30) {
      colorCode = "yellow";
    } else if (difference > 30 && difference < 60) {
      colorCode = "green";
    } else if (difference >= 60) {
      colorCode = "gray";
    }
    return colorCode;
  }

  const dataWithColorCodeFilter = (name, value, index) => {
    dispatch(handleColorCode(name, value, index));
  }

  const stickyFooter = {
    padding: "20px",
    position: "fixed",
    left: 40,
    bottom: 0,
    height: 60,
    width: "100%",
    textAlign: "center",
  };
  const [CertificateDetailShow, setCertificateDetailShow] = useState(false);
  const [CertificateID, setCertificateID] = useState(null);
  const certificateDetails = (certificate) => {
    setCertificateID(certificate.intCertificateDetailsID);
    setCertificateDetailShow(true);
  };
  return (
    <>
      <Card>
        <Card.Body className="certificate-card">
          <div className="row mb-5">
            <div className="col-lg-4 ">
              <div className="row">
                <div className="col-lg-3">
                  <h1 className="headerText pt-2">Certificates</h1>
                </div>
                <div className="col-lg-9 ">
                  <Form.Group as={Col} controlId="formGridState">
                    <input
                      type="search"
                      value={searchText}
                      className="form-control product-search-input formHeight"
                      placeholder="Search"
                      onChange={searchProduct}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="col-lg-3 ">
              <Form.Group as={Col} controlId="formGridState">
                <RHFInput
                  as={<Select options={certificateParentCategoryList} />}
                  rules={{ required: true }}
                  name="intCategoryID"
                  placeholder="Category"
                  register={register}
                  value={certificateParentCategoryList.intParentCategoryID}
                  onChange={(option) => {
                    certificateSelect(option.value);
                    setValue("intCategoryID", "");
                    dispatch(getCertificateChildCategoryData(option.value));
                  }}
                  setValue={setValue}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 ">
              <Form.Group as={Col} controlId="formGridState">
                <RHFInput
                  as={<Select options={certificateChildCategoryList} />}
                  rules={{ required: true }}
                  placeholder="Sub Category"
                  name="intCategoryID"
                  register={register}
                  value={certificateChildCategoryList.intCategoryID}
                  onChange={(option) => {
                    certificateSelect(option.value);
                  }}
                  setValue={setValue}
                />
              </Form.Group>
            </div>

            {/* <Form.Group as={Col} controlId="formGridState">
              <RHFInput
                as={<Select options={certificateExpireDaysList} />}
                rules={{ required: true }}
                placeholder="Expire In"
                name="intCategoryID"
                register={register}
                value={expireInDays}
                onChange={(option) => {
                  setExpireInDays(option.value);
                  dispatch(
                    getCertificateMainListAction(
                      currentPage,
                      searchText,
                      true,
                      certificateChildCategoryList.intCategoryID,
                      option.value
                    )
                  );
                }}
                setValue={setValue}
              />
            </Form.Group> */}
            <div className="col-lg-2  certificate-filter">
              <i className="fas fa-filter tableFilter mt-1 mr-2"></i>
              <i className="far fa-filter"></i>
              <Link
                to="/certificates-main/create"
                className="btn btn-primary text-center text-white btn-sm custome-addnew-btn certificate-add-btn"
              >
                Add New
              </Link>
            </div>
          </div>

          {isLoading && <LoadingSpinner text="Loading Certificates..." />}
          {!isLoading && certificates.length > 0 && (
            <div className="react-bootstrap-table table-responsive">

              <table className="table table table-head-custom table-vertical-center user-list-table certificate-list-table">
                <thead>
                  <tr>
                    <th className="td-sl">#</th>
                    {/* <th scope="col">Folder No.</th> */}
                    {/* <th scope="col">Code</th> */}
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    {/* <th scope="col">Issued By</th> */}
                    <th scope="col">Issued Place</th>
                    <th scope="col">Location</th>
                    {/* <th scope="col">Issued Date</th> */}
                    <th scope="col">Valid Until</th>
                    <th scope="col">Entended Until</th>
                    <th scope="col">Last Endorsement</th>
                    <th scope="col">Not On Board</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      {/* <td>{certificate.strShipFolderNo}</td> */}
                      {/* <td>{certificate.strCustomeCode}</td> */}
                      <td>{certificate.strShipRemarks}</td>
                      <td>{certificate.strCertificateTypeName}</td>
                      {/* <td>{certificate.strIssuingAuthorityName}</td> */}
                      <td>{certificate.strIssuedPlace}</td>
                      <td>{certificate.strLocation}</td>
                      {/* <td>
                      {certificate.dteCertificateIssueDate !== null
                        ? generateStringDateFromDate(
                            certificate.dteCertificateIssueDate
                          )
                        : ""}
                    </td> */}
                      <td>
                        {certificate.dteCertificateValidUntil !== null
                          ? generateStringDateFromDate(
                            certificate.dteCertificateValidUntil
                          )
                          : ""}
                      </td>
                      <td>
                        {certificate.dteExtendedUntil !== null
                          ? generateStringDateFromDate(
                            certificate.dteExtendedUntil
                          )
                          : ""}
                      </td>

                      <td>
                        {certificate.dteLastEndorsementDate !== null
                          ? generateStringDateFromDate(
                            certificate.dteLastEndorsementDate
                          )
                          : ""}
                      </td>
                      <td>{certificate.intNotOnBoard === "1" ? "Yes" : "No"}</td>
                      <td>{certificate.differenceDays}</td>
                      <td>
                        <button
                          className={`btn btn-primary btn-sm text-white certificate-lis-btn certificate-${getCertificateColorClass(
                            certificate.differenceDays
                          )}`}>
                          {certificate.differenceDays === 0 ? "Expired" : "Due"}
                        </button>
                        <button
                          className="btn btn-primary btn-sm text-white certificate-lis-btn" style={{backgroundColor: `${getColorCode(certificate.differenceDays)}`}}>
                          {certificate.differenceDays === 0 ? "Expired" : "Due"}
                        </button>
                       
                      </td>
                      <td>
                        <div className="mt-5">
                          <Link onClick={() => certificateDetails(certificate)}>
                            <i className="far fa-eye text-success editIcon item-list-icon"></i>
                          </Link>
                          <Link
                            className="ml-2 certificate-icon"
                            to={`/certificates-main/edit/${certificate.intCertificateDetailsID}`}
                          >
                            <i className="fa fa-edit text-success editIcon item-list-icon"></i>
                          </Link>
                        </div>
                      &nbsp;&nbsp;&nbsp;
                      {/* <button
                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            )
                          )
                            certificateDelete(certificate.intID);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && certificates.length === 0 && (
            <div className="alert border-1 p-4">
              Sorry ! No Certificates Found.
            </div>
          )}

          <PaginationLaravel
            changePage={changePage}
            data={certificatesPaginatedData}
          />
        </Card.Body>
      </Card>

      {!isLoading && certificates.length > 0 && (
        <Card className="p-5 stickeyCard" sticky="bottom" style={stickyFooter}>
          <div className="row justify-content-center">
            {
              bottomStatus && bottomStatus.length > 0 && bottomStatus.map((item, index) => (
                <div className="col-lg-2 col-3">
                  <div className="between-thirty due-days">
                    <input
                      type="color"
                      // value={certificateBackgroundColor.expired_code ? certificateBackgroundColor.expired_code : ((certificateBackgroundColor.due_30_days_code ? certificateBackgroundColor.due_30_days_code) : (certificateBackgroundColor.due_60_days_code ? certificateBackgroundColor.due_60_days_code) : (cetificateBackgroundColor.due_more_60_days_code ? certificateBackgroundColor.due_more_60_days_code) : item.colorCode)}
                      className="color-picker float-left mr-2"
                      name={item.inputName}
                      onChange={(e) => dataWithColorCodeFilter(item.inputName, e.target.value, index)}
                    />
                    <h6>{item.bottomLabel} </h6>
                  </div>
                </div>
              ))
            }
            {/* <div className="col-lg-2 col-3">
              <div className="between-thirty due-days">
                <input
                  type="color"
                  value={certificateBackgroundColor.due_30_days_code ? certificateBackgroundColor.due_30_days_code : "#8ec7ff"}
                  className="color-picker float-left mr-2"
                  name="due_30_days_code"
                  onChange={(e) => dataWithColorCodeFilter('due_30_days_code', e.target.value)}
                />
                <h6>Due between 30 days </h6>
              </div>
            </div>
            <div className="col-lg-2 col-3">
              <div className="between-sixty due-days">
                <input
                  type="color"
                  value={certificateBackgroundColor.due_60_days_code ? certificateBackgroundColor.due_60_days_code : "#678db2"}
                  className="color-picker between-sixty float-left"
                  name="due_60_days_code"
                  onChange={(e) => dataWithColorCodeFilter('due_60_days_code', e.target.value)}
                />
                <h6>Due between 60 days </h6>
              </div>
            </div>
            <div className="col-lg-2 col-3">
              <div className="between-thirty More-than-sixty due-days ">
                <input
                  type="color"
                  value={certificateBackgroundColor.due_more_60_days_code ? certificateBackgroundColor.due_more_60_days_code : "#8af2c0"}
                  className="color-picker more-than-sixty float-left"
                  name="due_more_60_days_code"
                  onChange={(e) => dataWithColorCodeFilter('due_more_60_days_code', e.target.value)}
                />
                <h6 className=" ">Due more than 60 days </h6>
              </div>
            </div>

            <div className="col-lg-2 col-3">
              <div className="expired due-days">
                <input
                  type="color"
                  value={certificateBackgroundColor.expired_code ? certificateBackgroundColor.expired_code : "#ea673e"}
                  className="color-picker float-left mr-2"
                  name="expired_code"
                  onChange={(e) => dataWithColorCodeFilter('expired_code', e.target.value)}
                />
                <h6>Expired </h6>
              </div>
            </div> */}



          </div>
        </Card>
      )}

      <SimpleModal
        size="xl"
        show={CertificateDetailShow}
        handleClose={() => setCertificateDetailShow(false)}
        handleShow={() => setCertificateDetailShow(true)}
        modalTitle={"Certificate Details"}
      >
        <CertificateDetails
          handleClose={() => setCertificateDetailShow(false)}
          CertificateID={CertificateID}
        />
      </SimpleModal>
    </>
  );
};

export default CertificateMainList;
