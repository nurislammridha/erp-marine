import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import { Form, Card, Button, Row, Col, Accordion, Table } from "react-bootstrap";
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
  return (
    <>
      <Card>
        <Card.Body className="certificate-card">
          <h1 className="headerText pt-2">Certificates</h1> <hr />
          <div className="row mb-5">
            <div className="col-lg-4 col-md-6 ">
              <div className="row">
                {/* <div className="col-lg-4 col-md-4">
                  <h1 className="headerText pt-2">Certificates</h1>
                </div> */}
                <div className="col-lg-8 col-md-8">
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

            <div className="col-lg-3 col-md-6 "></div>
            <div className="col-lg-3 col-md-6 "></div>
            {/* <div className="col-lg-3 col-md-6">
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
            </div> */}

            <div className="col-lg-2 col-md-6 certificate-filter">
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
          {/* {isLoading && <LoadingSpinner text="Loading Certificates..." />} */}

          {/**=================Certficate list body start====================== */}
          {!isLoading && certificates.length > 0 && (
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center user-list-table certificate-list-table">
                <thead>
                  <tr>
                    <th className="td-sl">#</th>
                    <th scope="col">Type</th>
                    {/* <th scope="col">Issued By</th> */}
                    <th scope="col">Issued Place</th>
                    {/* <th scope="col">Issued Date</th> */}
                    <th scope="col">Location</th>
                    <th scope="col">Valid Until</th>
                    <th scope="col">Entended Until</th>
                    <th scope="col">Last Endorsement</th>
                    <th scope="col">Not On Board</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
              </table>
              <table className="table table table-head-custom table-vertical-center user-list-table certificate-list-table certificate-table">
                {certificates.map((certificate, index) => (
                  <Accordion defaultActiveKey="0">
                    <Card className="Custome-collapse">
                      <thead>
                        <tr>
                          <th rowspan="12" className="certificate-collapse">
                            <Card.Header className="bg-white certificate-card-header">
                              <Accordion.Toggle className="collapse-btn" eventKey={index.toString()}>
                                <i className="fas fa-angle-down mr-2"></i>
                                {certificate.strCertificateCategoryName !== null && certificate.strCertificateCategoryName !== "" && certificate.strCertificateCategoryName}
                                {' '} ({certificate.certificates.data.length})
                              </Accordion.Toggle>
                            </Card.Header>
                          </th>
                        </tr>
                      </thead>
                      <Accordion.Collapse eventKey={index.toString()}>
                        {/* <Card.Body> */}
                        <tbody>
                          {certificate.certificates.data.length > 0 && certificate.certificates.data.map((certificate, index) => (
                            <tr key={index + 1}>
                              <td>{index + 1}</td>

                              {/* <td className="description">{certificate.strShipFolderNo}</td> */}
                              {/* <td>{certificate.strCustomeCode}</td>
                              <td>{certificate.strShipRemarks}</td> */}
                              <td className="type">{certificate.strCertificateTypeName}</td>
                              {/* <td>{certificate.strIssuingAuthorityName}</td> */}
                              <td className="issuePlace">{certificate.strIssuedPlace}</td>

                              <td className="location">{certificate.strLocation}</td>
                              {/* <td className="">
                                {certificate.dteCertificateIssueDate !== null
                                  ? generateStringDateFromDate(
                                    certificate.dteCertificateIssueDate
                                  )
                                  : ""}
                              </td> */}
                              <td className="validUntil">
                                {certificate.dteCertificateValidUntil !== null
                                  ? generateStringDateFromDate(
                                    certificate.dteCertificateValidUntil
                                  )
                                  : ""}
                              </td>
                              <td className="extendUntil">
                                {certificate.dteExtendedUntil !== null
                                  ? generateStringDateFromDate(
                                    certificate.dteExtendedUntil
                                  )
                                  : ""}
                              </td>

                              <td className="LastEndorsementDate">
                                {certificate.dteLastEndorsementDate !== null
                                  ? generateStringDateFromDate(
                                    certificate.dteLastEndorsementDate
                                  )
                                  : ""}
                              </td>
                              <td className="NotOnBoard">{certificate.intNotOnBoard === "1" ? "Yes" : "No"}</td>
                              <td className="dueDate">{certificate.differenceDays}</td>
                              <td className="status">
                                <button
                                  className="btn btn-primary btn-sm text-white certificate-lis-btn" style={{ backgroundColor: `${getColorCode(certificate.differenceDays)}` }}>
                                  {certificate.differenceDays === 0 ? "Expired" : "Due"}
                                </button>

                              </td>
                              <td className="action">
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
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {/* </Card.Body> */}
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ))}
              </table>
            </div>
          )}


          {!isLoading && certificates.length === 0 && (
            <div className="alert alert-warning mt-5">
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

export default CertificateMainList;
