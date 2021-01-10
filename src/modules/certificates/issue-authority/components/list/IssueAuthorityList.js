import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIssuingAuthorities } from "../../_redux/actions/CertificateIssueAuthorityAction";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import IssueAuthorityEdit from "../edit/IssueAuthorityEdit";

const IssueAuthorityList = (props) => {
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const handleEdit = (editItem) => {
    setEditItem(editItem);
    setShow(true);
  };

  return (
    <div className="react-bootstrap-table table-responsive">
      <SimpleModal
        show={show}
        handleClose={() => handleClose()}
        modalTitle={"Edit Issue Authority"}
      >
                      
        <IssueAuthorityEdit editData={editItem} />
                    
      </SimpleModal>
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
                  {/* <td>
                    {" "}
                    <Link to={`/voyage/list/${""}`}>
                      <i className="far fa-eye mr-3"></i>
                    </Link>
                  </td> */}
                  <td>
                    <a
                      className="btn btn-icon btn-light btn-hover-info btn-sm"
                      onClick={() => {
                        handleEdit(item);
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </a>
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
