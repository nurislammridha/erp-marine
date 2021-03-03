import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import { Form, Card, Button, Row, Col, Accordion, Table, Dropdown } from "react-bootstrap";
import "./style.css";
import { generateStringDateFromDate } from "../../../../../domains/CCO/utils/DateHelper";
import {
  changeColorCode,
  getCertificateCategory,
  getCertificateReportList,
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
import DatePicker from "react-datepicker";
import moment from "moment";
const CertificateReports = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("")
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [diffDay, setDiffDay] = useState("")
  const [expireInDays, setExpireInDays] = useState(30);

  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const reportList = useSelector((state) => state.certificateMainInfo.reportList);
  const certificateExpireDaysList = useSelector((state) => state.certificateMainInfo.certificateExpireDaysList);
  const reportPaginationList = useSelector((state) => state.certificateMainInfo.reportPaginationList);
  const certificateParentCategoryList = useSelector((state) => state.CertificateCategoryReducer.certificateParentCategoryList);
  const certificateChildCategoryList = useSelector((state) => state.CertificateCategoryReducer.certificateChildCategoryList);
  const certificateBackgroundColor = useSelector((state) => state.certificateMainInfo.certificateBackgroundColor);
  const bottomStatus = useSelector((state) => state.certificateMainInfo.bottomStatus);

  console.log('reportList :>> ', reportList);
  useEffect(() => {
    dispatch(getCertificateReportList(currentPage));
    dispatch(getCertificateCategory());
    dispatch(getCertificateParentCategoryData());
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateReportList(data.page));
  };

  const certificateSelect = (category) => {
    if (category.length === 0) {
      dispatch(getCertificateReportList(currentPage));
    } else {
      dispatch(getCertificateReportList(currentPage, "", 1, category, "", "", ""));
    }
  };
  const fromDateSelect = (fromDate) => {
    if (fromDate === null) {
      dispatch(getCertificateReportList(currentPage));
    } else {
      dispatch(getCertificateReportList(currentPage, "", 1, "", fromDate, "", ""));
    }
  };
  const ToDateSelect = (toDate) => {
    if (toDate === null) {
      dispatch(getCertificateReportList(currentPage));
    } else {
      dispatch(getCertificateReportList(currentPage, "", 1, "", "", toDate, ""));
    }
  };
  const differenceDay = (diffDay) => {
    if (diffDay.length === 0) {
      dispatch(getCertificateReportList(currentPage));
    } else {
      dispatch(getCertificateReportList(currentPage, "", 1, "", "", "", diffDay));
    }
  };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getCertificateReportList(currentPage));
    } else {
      dispatch(getCertificateReportList(currentPage, searchText));
    }
  };

  useEffect(() => {
    dispatch(getCertificateReportList(currentPage, "", 1, "", "", "", ""));
  }, [dispatch, currentPage]);

  //filter sttus color code 
  const getColorCode = (difference) => {
    const singleItem = bottomStatus.filter((item, index) => (
      difference >= item.minDate && difference <= item.maxDate
    ))
    return singleItem[0].colorCode;
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
  const filterWithDifferenceDay = [
    { label: "Day-0", value: '0' },
    { label: "Day-(1-30)", value: 30 },
    { label: "Day-(31-60)", value: 60 },
    { label: "Day-more than 60", value: 100000000 },
  ]

  return (
    <>
      <Card>
        <Card.Body className="certificate-card">
          <div className="row justify-content-between">
            <h1 className="headerText pt-2">Certificate Reports</h1>
            <div className="col-md-7">
              <div class="search-box">
                <div class="search">
                  <input
                    type="text"
                    placeholder="Search by certificate"
                    value={searchText}
                    onChange={searchProduct}
                  />
                </div>
                <i className="fas fa-search custome-certificate-search"></i>
              </div>
            </div>

            {/* <div className="col-md-7 d-flex">
              <Form.Group as={Col} controlId="formGridState">
                <input
                  type="search"
                  value={searchText}
                  className="form-control product-search-input formHeight search-box"
                  placeholder="Search"
                  onChange={searchProduct}
                />
              </Form.Group>
              <i className="fas fa-search custome-certificate-search"></i>
            </div> */}

          </div>
          <hr />
          <div className="row mb-5">
            <div className="col-lg-3 col-md-6">
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

            <div className="col-lg-3 col-md-6 ">
              <Form.Group as={Col} controlId="formGridState">
                <DatePicker
                  autoComplete="off"
                  name="dteExtendedUntil"
                  className="form-control fromStyle formHeight custome-date"
                  placeholderText="From Date"
                  selected={fromDate}
                  onChange={(date) => (
                    fromDateSelect(moment(date).format("YYYY-MM-DD")),
                    setFromDate(date)
                  )}
                />
              </Form.Group>
            </div>

            <div className="col-lg-3 col-md-6 ">
              <Form.Group as={Col} controlId="formGridState">
                <DatePicker
                  autoComplete="off"
                  name="dteExtendedUntil"
                  className="form-control fromStyle formHeight custome-date"
                  placeholderText="To Date"
                  selected={toDate}
                  onChange={(date) => (
                    ToDateSelect(moment(date).format("YYYY-MM-DD")),
                    setToDate(date)
                  )}
                />
              </Form.Group>
            </div>

            <div className="col-lg-3 col-md-6 ">
              <Form.Group as={Col} controlId="formGridState">
                <RHFInput
                  as={<Select options={filterWithDifferenceDay} />}
                  rules={{ required: true }}
                  placeholder="Filter with days"
                  name="days"
                  register={register}
                  value={certificateChildCategoryList.days}
                  onChange={(option) => {
                    differenceDay(option.value);
                  }}
                  setValue={setValue}
                />
              </Form.Group>
            </div>
          </div>
          {isLoading && <LoadingSpinner text="Loading Certificates..." />}

          {/**=================Certficate list body start====================== */}
          {!isLoading && reportList.length > 0 && (
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center user-list-table certificate-list-table">
                <thead>
                  <tr>
                    <th className="td-sl">#</th>
                    <th scope="col" className="type">Type</th>
                    <th scope="col" className="issuePlace">Issued Place</th>
                    <th scope="col" className="validUntil">Valid Until</th>
                    <th scope="col" className="extendUntil">Entended Until</th>
                    <th scope="col" className="LastEndorsementDate">Last Endorsement</th>
                    <th scope="col" className="NotOnBoard">Not On Board</th>
                    <th scope="col" className="dueDate">Due Date</th>
                    <th scope="col" className="status">Status</th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.length > 0 && reportList.map((certificate, index) => (
                    <tr key={index + 1}>
                      <td>{reportPaginationList.from + 1}</td>
                      <td className="type">{certificate.strCertificateTypeName}</td>
                      <td className="issuePlace">{certificate.strIssuedPlace}</td>
                      <td className="validUntil">
                        {certificate.dteCertificateValidUntil !== null ? generateStringDateFromDate(certificate.dteCertificateValidUntil) : ""}
                      </td>
                      <td className="extendUntil">
                        {certificate.dteExtendedUntil !== null ? generateStringDateFromDate(certificate.dteExtendedUntil) : ""}
                      </td>
                      <td className="LastEndorsementDate">
                        {certificate.dteLastEndorsementDate !== null ? generateStringDateFromDate(certificate.dteLastEndorsementDate) : ""}
                      </td>
                      <td className="NotOnBoard">{certificate.intNotOnBoard === "1" ? "Yes" : "No"}</td>
                      <td className="dueDate">{certificate.differenceDays}</td>
                      <td className="status">
                        <button
                          className="btn btn-primary btn-sm text-white certificate-lis-btn" style={{ backgroundColor: `${getColorCode(certificate.differenceDays && certificate.differenceDays)}` }}>
                          {certificate.differenceDays === 0 ? "Expired" : "Due"}
                        </button>
                      </td>
                      <td className="action">
                        <div className="mt-5">
                          <Link onClick={() => certificateDetails(certificate)}>
                            <i className="far fa-eye text-success editIcon item-list-icon"></i>
                          </Link>
                          <Link className="ml-2 certificate-icon" to={`/certificates-main/edit/${certificate.intCertificateDetailsID}`}>
                            <i className="fa fa-edit text-success editIcon item-list-icon"></i>
                          </Link>
                        </div>
                            &nbsp;&nbsp;&nbsp;
                         </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
          <PaginationLaravel
            changePage={changePage}
            data={reportPaginationList}
          />

          {!isLoading && reportList.length === 0 && (
            <div className="alert alert-warning mt-5">
              Sorry ! No Certificates Found.
            </div>
          )}


        </Card.Body>
      </Card>

      {!isLoading && reportList.length > 0 && (
        <Card className="p-5 stickeyCard" sticky="bottom" style={stickyFooter}>
          <div className="row justify-content-center">
            {
              bottomStatus && bottomStatus.length > 0 && bottomStatus.map((item, index) => (
                <div className="col-lg-2 col-3">
                  <div className="between-thirty due-days">
                    <input
                      type="color"
                      value={item.colorCode}
                      className="color-picker float-left mr-2"
                      name={item.inputName}
                      onChange={(e) => dataWithColorCodeFilter(item.inputName, e.target.value, index)}
                    />
                    <h6>
                      {item.bottomLabel}
                    </h6>

                  </div>
                </div>
              ))
            }
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

export default CertificateReports;
