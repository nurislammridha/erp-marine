import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIssuingAuthorities } from "../../_redux/actions/CertificateIssueAuthorityAction";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const IssueAuthorityList = (props) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const isLoading = useSelector(
    (state) => state.certificateIssueAuthorityInfo.isLoading
  );
  const issuingAuthorities = useSelector(
    (state) => state.certificateIssueAuthorityInfo.issuingAuthorities
  );
  const issuingAuthoritiesData = useSelector(
    (state) => state.certificateIssueAuthorityInfo.issuingAuthoritiesData
  );

  useEffect(() => {
    dispatch(getIssuingAuthorities(currentPage));
    console.log("issuingAuthorities", issuingAuthorities);
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getIssuingAuthorities(data.page));
  };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getIssuingAuthorities(currentPage));
    } else {
      dispatch(getIssuingAuthorities(currentPage, searchText));
    }
  };

  return (
    <div className="react-bootstrap-table table-responsive">
      <table className="table mt-2 tbl-standard" id="table-to-xls">
        <thead>
          <tr>
            <th scope="col">SL</th>
            <th scope="col">Authority Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {issuingAuthorities.length > 0 && (
            <>
              {issuingAuthorities.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.strIssuingAuthorityName}</td>
                  <td>{item.isActive === 1 ? "Active" : "Inactive"}</td>
                  <td>
                    {" "}
                    <Link to={`/voyage/list/${""}`}>
                      <i className="far fa-eye mr-3"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          )}
          {/* <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>In Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <td>Mr. MA. Example</td>
            <td>In Active</td>
            <td>
              {" "}
              <Link to={`/voyage/list/${""}`}>
                <i className="far fa-eye mr-3"></i>
              </Link>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default IssueAuthorityList;
