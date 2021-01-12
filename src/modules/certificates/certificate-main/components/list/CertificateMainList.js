import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
// import { generateStringDateFromDate } from "../../../../master/utils/DateHelper";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import { getCertificateMainListAction } from "../../_redux/actions/CertificateMainAction";
import './style.css';
import { generateStringDateFromDate } from "../../../../../domains/CCO/utils/DateHelper";

const CertificateMainList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const certificates = useSelector(
    (state) => state.certificateMainInfo.certificates
  );
  const certificatesPaginatedData = useSelector(
    (state) => state.certificateMainInfo.certificatesPaginatedData
  );
  console.log("certificates", certificates);
  useEffect(() => {
    dispatch(getCertificateMainListAction(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateMainListAction(data.page));
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
          <div className="container">
            <div className="row">
              <h1 className="tableheading">Certificates</h1>

              <Form.Group as={Col} controlId="formGridState">
                <input
                  type="search"
                  value={searchText}
                  className="form-control product-search-input"
                  placeholder="Search By Title, Description, Price"
                  onChange={searchProduct}
                />
              </Form.Group>

              <i className="fas fa-filter tableFilter mt-3 mr-2"></i>
              <i className="far fa-filter"></i>
              <Link to='/certificates-main/create' className="btn btn-primary text-center text-white">
                Add New
              </Link>
            </div>
            {isLoading && <LoadingSpinner text="Loading Certificates..." />}
            {!isLoading && certificates.length === 0 && (
              <div className="alert alert-warning">
                Sorry ! No Certificates Found.
              </div>
            )}
            <table className="table mt-5 certificate-list table-responsive">
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
                  <tr className={getCertificateColorClass(certificate.differenceDays)}>
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
                      {certificate.dteCertificateValidUntil !== null ?generateStringDateFromDate(
                        certificate.dteCertificateValidUntil
                      ): ''}
                    </td>
                    <td>
                      {certificate.dteExtendedUntil !== null ? generateStringDateFromDate(certificate.dteExtendedUntil) : ''}
                    </td>
                    <td>
                      {certificate.dteLastEndorsementDate !== null ? generateStringDateFromDate(
                        certificate.dteLastEndorsementDate
                      ): ''}
                    </td>
                    <td>{certificate.intNotOnBoard === "1" ? "Yes" : "No"}</td>
                    <td>{certificate.differenceDays}</td>
                    <td className="">
                      <button className="btn btn-icon btn-light btn-hover-info btn-sm">
                        <Link
                          to={`/certificates-main/edit/${certificate.intCertificateDetailsID}`}
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </button>
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
          <PaginationLaravel
            changePage={changePage}
            data={certificatesPaginatedData}
          />
        </Card.Body>
      </Card>
    </>
  );
});

export default CertificateMainList;
