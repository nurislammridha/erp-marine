import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIssuingAuthorities } from "../../_redux/actions/CertificateIssueAuthorityAction";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import IssueAuthorityEdit from "../edit/IssueAuthorityEdit";
import CertificateTypeEdit from "../../../certificate-types/components/edit/CertificateTypeEdit";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";

const IssueAuthorityList = (props) => {
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const modalEditStatus = useSelector(
    (state) => state.certificateIssueAuthorityInfo.editStatus
  );

  const isLoading = useSelector(
    (state) => state.certificateIssueAuthorityInfo.isLoading
  );
  const issuingAuthorities = useSelector(
    (state) => state.certificateIssueAuthorityInfo.issuingAuthorities
  );
  const issuingAuthoritiesData = useSelector(
    (state) => state.certificateIssueAuthorityInfo.issuingAuthoritiesData
  );

  const issuingAuthoritiesPaginatedData = useSelector(
    (state) =>
      state.certificateIssueAuthorityInfo.issuingAuthoritiesPaginatedData
  );

  useEffect(() => {
    dispatch(getIssuingAuthorities("", "", currentPage));

    if (modalEditStatus) {
      setShow(false);
    }
  }, [dispatch, currentPage, modalEditStatus]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getIssuingAuthorities("", "", data.page));
  };

  const searchProduct = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText.length === 0) {
      dispatch(getIssuingAuthorities("", "", currentPage));
    } else {
      dispatch(getIssuingAuthorities(searchText, "1", currentPage));
    }
  };

  const handleEdit = (editItem) => {
    setEditItem(editItem);
    setShow(true);
  };

  return (
    <>
      {/* <div className="float-right">
        <PaginationLaravel
          isDescription={true}
          changePage={changePage}
          data={issuingAuthoritiesPaginatedData}
        />
      </div> */}
      {isLoading && (
        <div className="mt-5">
          <LoadingSpinner text="Loading Issuing Authority..." />
        </div>
      )}
      {!isLoading && issuingAuthorities.length === 0 && (
        <div className="alert alert-warning mt-5">
          Sorry ! No Issuing Authority Found.
        </div>
      )}
      {!isLoading && issuingAuthorities.length > 0 && (
        <>
          <div className="react-bootstrap-table table-responsive">
            <table className="table mt-2 tbl-standard">
              <thead>
                <tr>
                  {/* <th scope="col">
                    {" "}
                    <Form.Check type="checkbox" />
                  </th> */}

                  <th scope="col">SL</th>
                  <th scope="col">Authority Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {issuingAuthorities &&
                  issuingAuthorities.map((item, index) => (
                    <tr>
                      {/* <th scope="row">
                        {" "}
                        <Form.Check type="checkbox" />
                      </th> */}
                      <td>{index + 1}</td>
                      <td>{item.strIssuingAuthorityName}</td>
                      <td>{item.isActive === "1" ? "Active" : "Inactive"}</td>
                      {/* <td>
                    {" "}
                    <Link to={`/voyage/list/${""}`}>
                      <i className="far fa-eye mr-3"></i>
                    </Link>
                  </td> */}
                      <td>
                        <i
                          className="far fa-edit pointer editIcon"
                          onClick={() => handleEdit(item)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationLaravel
              isDescription={true}
              changePage={changePage}
              data={issuingAuthoritiesPaginatedData}
            />
            <SimpleModal
              show={show}
              handleClose={() => handleClose()}
              modalTitle={"Edit Issue Authority"}
            >
              <IssueAuthorityEdit editData={editItem} />
            </SimpleModal>
          </div>
        </>
      )}
    </>
  );
};

export default IssueAuthorityList;
