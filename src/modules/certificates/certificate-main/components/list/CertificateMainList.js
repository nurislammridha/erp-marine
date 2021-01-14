import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import './style.css';
import { generateStringDateFromDate } from "../../../../../domains/CCO/utils/DateHelper";
import {
  getCertificateCategory,
  getCertificateMainListAction,
} from "../../_redux/actions/CertificateMainAction";
import "./style.css";
import {
  getCertificateChildCategoryData,
  getCertificateParentCategoryData,
} from "../../../certificate-category/_redux/actions/CertificateCategoryAction";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

const CertificateMainList = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [expireInDays, setExpireInDays] = useState(30);

  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const certificates = useSelector(
    (state) => state.certificateMainInfo.certificates
  );
  const certificateExpireDaysList = useSelector(
    (state) => state.certificateMainInfo.certificateExpireDaysList
  );
  const certificatesPaginatedData = useSelector(
    (state) => state.certificateMainInfo.certificatesPaginatedData
  );
  const certificateParentCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateParentCategoryList
  );

  const certificateChildCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateChildCategoryList
  );
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
    dispatch(getCertificateMainListAction(currentPage, searchText, 1, category));
  }

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getCertificateMainListAction(currentPage));
    } else {
      dispatch(getCertificateMainListAction(currentPage, searchText));
    }
  };

  const certificateDelete = () => { };

  const getCertificateColorClass = (difference) => {
    let rowClassName = "";
    if (difference === 0) {
      rowClassName = "bg-row-0-days";
    } else if (difference > 0 && difference <= 30) {
      rowClassName = "bg-row-30-between";
    } else if (difference > 30 && difference <= 60) {
      rowClassName = "bg-row-60-days";
    } else if (difference > 60) {
      rowClassName = "bg-row-60-more";
    }
    return rowClassName;
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="row">
            <h1 className="tableheading">Certificates</h1>

            <Form.Group as={Col} controlId="formGridState">
              <input
                type="search"
                value={searchText}
                className="form-control product-search-input formHeight"
                placeholder="Search"
                onChange={searchProduct}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <RHFInput
                as={<Select options={certificateParentCategoryList} />}
                rules={{ required: true }}
                name="intCategoryID"
                placeholder="Category"
                register={register}
                value={certificateParentCategoryList.intParentCategoryID}
                onChange={(option) => {
                  certificateSelect(
                    option.value
                  );
                  setValue("intCategoryID", "");
                  dispatch(getCertificateChildCategoryData(option.value));
                }}
                setValue={setValue}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <RHFInput
                as={<Select options={certificateChildCategoryList} />}
                rules={{ required: true }}
                placeholder="Sub Category"
                name="intCategoryID"
                register={register}
                value={certificateChildCategoryList.intCategoryID}
                onChange={(option) => {
                  certificateSelect(
                    option.value
                  );
                }}
                setValue={setValue}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <RHFInput
                as={<Select options={certificateExpireDaysList} />}
                rules={{ required: true }}
                placeholder="Expire In"
                name="intCategoryID"
                register={register}
                value={expireInDays}
                onChange={(option) => {
                  setExpireInDays(
                    option.value
                  );
                  dispatch(getCertificateMainListAction(currentPage, searchText, true, certificateChildCategoryList.intCategoryID, option.value));
                }}
                setValue={setValue}
              />
            </Form.Group>

            <i className="fas fa-filter tableFilter mt-3 mr-2"></i>
            <i className="far fa-filter"></i>
            <Link to='/certificates-main/create' className="btn btn-primary text-center text-white">
              Add New
              </Link>
          </div>
          {isLoading && <LoadingSpinner text="Loading Certificates..." />}
          {
            !isLoading && certificates.length > 0 &&
            <table className="table mt-5 certificate-list tbl-standard table-responsive">
              <thead>
                <tr>
                  <th className="td-sl">#</th>
                  {/* <th scope="col">Folder No.</th> */}
                  <th scope="col">Code</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                  <th scope="col">Issued By</th>
                  <th scope="col">Issued Place</th>
                  <th scope="col">Location</th>
                  <th scope="col">Issued Date</th>
                  <th scope="col">Valid Until</th>
                  <th scope="col">Entended Until</th>
                  <th scope="col">Last Endorsement</th>
                  <th scope="col">Not On Board</th>
                  <th scope="col">Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((certificate, index) => (
                  <tr key={index + 1}
                    className={getCertificateColorClass(
                      certificate.differenceDays
                    )}
                  >
                    <td>{index + 1}</td>
                    {/* <td>{certificate.strShipFolderNo}</td> */}
                    <td>{certificate.strCustomeCode}</td>
                    <td>{certificate.strShipRemarks}</td>
                    <td>{certificate.strCertificateTypeName}</td>
                    <td>{certificate.strIssuingAuthorityName}</td>
                    <td>{certificate.strIssuedPlace}</td>
                    <td>{certificate.strLocation}</td>
                    <td>
                      {
                        certificate.dteCertificateIssueDate !== null ? generateStringDateFromDate(
                          certificate.dteCertificateIssueDate
                        ) : ''
                      }
                    </td>
                    <td>
                      {certificate.dteCertificateValidUntil !== null ? generateStringDateFromDate(
                        certificate.dteCertificateValidUntil
                      ) : ''}
                    </td>
                    <td>
                      {certificate.dteExtendedUntil !== null ? generateStringDateFromDate(certificate.dteExtendedUntil) : ''}
                    </td>
                    <td>
                      {certificate.dteLastEndorsementDate !== null ? generateStringDateFromDate(
                        certificate.dteLastEndorsementDate
                      ) : ''}
                    </td>
                    <td>{certificate.intNotOnBoard === "1" ? "Yes" : "No"}</td>
                    <td>{certificate.differenceDays}</td>
                    <td className="">
                      <Link
                        to={`/certificates-main/edit/${certificate.intCertificateDetailsID}`}
                      >
                        <i className="fa fa-edit text-success"></i>
                      </Link>
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
          }

          {!isLoading && certificates.length === 0 && (
            <div className="alert border-1 p-4">
              Sorry ! No Certificates Found.
            </div>
          )}
           
          <PaginationLaravel
            changePage={changePage}
            data={certificatesPaginatedData}
          />

          {
              !isLoading && certificates.length > 0 &&
              <div className="status-list">
                <div className="custome-dots">
                <span className="dot bg-row-0-days ml-5"></span>
                <span className="status-text ml-5">Expired</span>
                <span className="dot bg-row-30-between ml-5"></span>
                <span className="status-text ml-5">Due 30 Days</span>
                <span className="dot bg-row-60-days ml-5"></span>
                <span className="status-text ml-5">Due 60 Days</span>
                <span className="dot bg-row-more-60-days ml-5"></span>
                <span className="status-text ml-5">Due More Than 60 Days</span>
              </div>
              </div>
            }
        </Card.Body>
      </Card>
    </>
  );
}

export default CertificateMainList;
