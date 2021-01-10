import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import { getCertificateMainListAction } from "../../_redux/actions/CertificateMainAction";

const CertificateMainList = withRouter(({history,props}) => {
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

  const certificateDelete=()=>{

  }

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Certificate List</h3>
            </div>
            <div className="card-toolbar">
              <a
                onClick={() => {
                  history.push("/certificates-main/create");
                }}
              >
                <button type="button" class="btn btn-primary">
                  New Certificate
                </button>
              </a>
            </div>
          </div>
          <div className="mb-2 ml-2">
            <div className="float-left">
              <input
                type="search"
                value={searchText}
                className="form-control product-search-input"
                placeholder="Search By Title, Description, Price"
                onChange={searchProduct}
              />
            </div>
            <div className="float-right">
              <PaginationLaravel
                isDescription={false}
                changePage={changePage}
                data={certificatesPaginatedData}
              />
            </div>
            <div className="clearfix"></div>
          </div>
          {isLoading && <LoadingSpinner text="Loading Certificates..." />}
          {!isLoading && certificates.length === 0 && (
            <div className="alert alert-warning">Sorry ! No Certificates Found.</div>
          )}
          {!isLoading && certificates.length > 0 && (
            <>
              <div className="table-responsive ml-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="td-sl">Sl</th>
                      <th className="td-product-title">Product</th>
                      <th>Price</th>
                      <th className="td-description">Description</th>
                      <th className="td-upload-info">Upload Information</th>
                      <th className="td-upload-info">Upload Information</th>
                      <th className="td-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((certificate, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{certificate.strCustomeCode}</td>
                        <td>{certificate.intNotOnBoard}</td>
                        <td>{certificate.dteCertificateValidUntil}</td>
                        <td>{certificate.dteExtendedUntil}</td>
                        <td>{certificate.dteExtendedUntil}</td>
                        <td>
                          <a
                            className="btn btn-icon btn-light btn-hover-info btn-sm"
                            onClick={() => {
                              history.push("/certificates-main/edit");
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </a>
                          &nbsp;&nbsp;&nbsp;
                          <a
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
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <PaginationLaravel
                  changePage={changePage}
                  data={certificatesPaginatedData}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});

export default CertificateMainList;
