import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import {
  Form,
  Card,
  Button,
  Row,
  Col,
  Accordion,
  Table,
  Dropdown,
} from "react-bootstrap";
import "./style.css";
import { generateStringDateFromDate } from "../../../../../domains/CCO/utils/DateHelper";
import {
  changeColorCode,
  getCertificateCategory,
  getCertificateReportList,
  handleChangeCertificateFilterInput,
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
  // const [searchText, setSearchText] = useState("");
  // const [category, setCategory] = useState("")
  // const [fromDate, setFromDate] = useState(null)
  // const [toDate, setToDate] = useState(null)
  // const [diffDay, setDiffDay] = useState("")
  // const [expireInDays, setExpireInDays] = useState(30);

  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const reportList = useSelector(
    (state) => state.certificateMainInfo.reportList
  );
  const certificateExpireDaysList = useSelector(
    (state) => state.certificateMainInfo.certificateExpireDaysList
  );
  const reportPaginationList = useSelector(
    (state) => state.certificateMainInfo.reportPaginationList
  );
  const certificateParentCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateParentCategoryList
  );
  const certificateChildCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateChildCategoryList
  );
  const certificateBackgroundColor = useSelector(
    (state) => state.certificateMainInfo.certificateBackgroundColor
  );
  const CertificateFilterInputChange = useSelector(
    (state) => state.certificateMainInfo.CertificateFilterInputChange
  );
  const bottomStatus = useSelector(
    (state) => state.certificateMainInfo.bottomStatus
  );

  useEffect(() => {
    dispatch(getCertificateReportList(currentPage));
    dispatch(getCertificateCategory());
    dispatch(getCertificateParentCategoryData());
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateReportList(data.page));
  };

  const {
    searchText,
    isPublic,
    category,
    fromDate,
    toDate,
    diffDays,
  } = CertificateFilterInputChange;
  useEffect(() => {
    dispatch(
      getCertificateReportList(
        currentPage,
        searchText,
        isPublic,
        category,
        fromDate,
        toDate,
        diffDays
      )
    );
  }, [
    dispatch,
    currentPage,
    searchText,
    isPublic,
    category,
    fromDate,
    toDate,
    diffDays,
  ]);

  //filter sttus color code
  const getColorCode = (difference) => {
    const singleItem = bottomStatus.filter(
      (item, index) => difference >= item.minDate && difference <= item.maxDate
    );
    return singleItem[0].colorCode;
  };

  const dataWithColorCodeFilter = (name, value, index) => {
    dispatch(handleColorCode(name, value, index));
  };

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
    { label: "Day-0", value: "1" },
    { label: "DUE BETWEEN 30 DAYS", value: "2" },
    { label: "DUE BETWEEN 60 DAYS", value: "3" },
    { label: "DUE MORE THAN 60 DAYS", value: "4" },
  ];
  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeCertificateFilterInput(name, value));
  };
  return (
    <>
      <Card>
        <Card.Body className="certificate-card">
          <div className="row justify-content-between">
            <div className="col-lg-6 col-md-5 col-sm-6">
              <h1 className="headerText  certificate-report-heading">
                Certificate Reports
              </h1>
            </div>

            <div className=" col-lg-6 col-md-7 col-sm-6">
              <div class="search-box">
                <div class="search1">
                  <input
                    type="text"
                    placeholder="Search with certificate type"
                    name="searchText"
                    value={CertificateFilterInputChange.searchText}
                    onChange={(e) =>
                      handleChangeTextInput("searchText", e.target.value)
                    }
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
                  name="category"
                  placeholder="Category"
                  register={register}
                  value={CertificateFilterInputChange.category}
                  onChange={(option) =>
                    handleChangeTextInput("category", option.value)
                  }
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
                  name="fromDate"
                  selected={CertificateFilterInputChange.fromDate}
                  value={CertificateFilterInputChange.fromDate}
                  onChange={(date) => handleChangeTextInput("fromDate", date)}
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
                  minDate={CertificateFilterInputChange.fromDate}
                  disabled={
                    CertificateFilterInputChange.fromDate === null
                      ? true
                      : false
                  }
                  name="toDate"
                  selected={CertificateFilterInputChange.toDate}
                  value={CertificateFilterInputChange.toDate}
                  onChange={(date) => handleChangeTextInput("toDate", date)}
                />
              </Form.Group>
            </div>

            <div className="col-lg-3 col-md-6 ">
              <Form.Group as={Col} controlId="formGridState">
                <RHFInput
                  as={<Select options={filterWithDifferenceDay} />}
                  rules={{ required: true }}
                  placeholder="Filter with days"
                  name="diffDay"
                  register={register}
                  value={CertificateFilterInputChange.diffDay}
                  onChange={(option) =>
                    handleChangeTextInput("diffDay", option.value)
                  }
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
                    <th scope="col" className="type">
                      Type
                    </th>
                    {/* <th scope="col" className="issuePlace">Issued Place</th>
                    <th scope="col" className="validUntil">Issue Date</th>
                    <th scope="col" className="extendUntil">Expiry Date</th>
                    <th scope="col" className="LastEndorsementDate">Last Endorsement</th> */}
                    <th scope="col" className="NotOnBoard">
                      Not On Board
                    </th>
                    <th scope="col" className="dueDate">
                      Due Date
                    </th>
                    <th scope="col" className="status">
                      Status
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.length > 0 &&
                    reportList.map((certificate, index) => (
                      <tr key={index + 1}>
                        <td>{reportPaginationList.from + index}</td>
                        <td className="type">
                          {certificate.strCertificateTypeName}
                        </td>
                        {/* <td className="issuePlace">{certificate.strIssuedPlace}</td>
                      <td className="">
                        {certificate.dteCertificateIssueDate !== null ? moment(certificate.dteCertificateIssueDate).format("YYYY-MM-DD") : ""}
                      </td>
                      <td className="">
                        {certificate.dteCertificateExpiryDate !== null ? moment(certificate.dteCertificateExpiryDate).format("YYYY-MM-DD") : ""}
                      </td>
                      <td className="LastEndorsementDate">
                        {certificate.dteLastEndorsementDate !== null ? generateStringDateFromDate(certificate.dteLastEndorsementDate) : ""}
                      </td> */}
                        <td className="NotOnBoard">
                          {certificate.intNotOnBoard === "1" ? "Yes" : "No"}
                        </td>
                        <td className="dueDate">
                          {certificate.differenceDays}
                        </td>
                        <td className="status">
                          <button
                            className="btn btn-primary btn-sm text-white certificate-lis-btn"
                            style={{
                              backgroundColor: `${getColorCode(
                                certificate.differenceDays &&
                                  certificate.differenceDays
                              )}`,
                            }}
                          >
                            {certificate.differenceDays === 0
                              ? "Expired"
                              : "Due"}
                          </button>
                        </td>
                        <td className="action">
                          <div className="mt-5">
                            <Link
                              onClick={() => certificateDetails(certificate)}
                            >
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
            {bottomStatus &&
              bottomStatus.length > 0 &&
              bottomStatus.map((item, index) => (
                <div className="col-lg-2 col-3">
                  <div className="between-thirty due-days">
                    <input
                      type="color"
                      value={item.colorCode}
                      className="color-picker float-left mr-2"
                      name={item.inputName}
                      onChange={(e) =>
                        dataWithColorCodeFilter(
                          item.inputName,
                          e.target.value,
                          index
                        )
                      }
                    />
                    <h6>{item.bottomLabel}</h6>
                  </div>
                </div>
              ))}
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
