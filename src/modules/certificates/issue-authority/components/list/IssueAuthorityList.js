import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIssuingAuthorities } from "../../_redux/actions/CertificateIssueAuthorityAction";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import IssueAuthorityEdit from "../edit/IssueAuthorityEdit";
import CertificateTypeEdit from "../../../certificate-types/components/edit/CertificateTypeEdit";

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

  useEffect(() => {
    // dispatch(getIssuingAuthorities(currentPage));
    dispatch(getIssuingAuthorities());

    if (modalEditStatus) {
      setShow(false);
    }
  }, [dispatch, currentPage, modalEditStatus]);

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
    <>
      <table className="table mt-5 voyageTable">
        <thead>
          <tr>
            <th scope="col">
              {" "}
              <Form.Check type="checkbox" />
            </th>

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
                <th scope="row">
                  {" "}
                  <Form.Check type="checkbox" />
                </th>
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
                  <button
                    className="btn"
                    onClick={() => handleEdit(item)}>
                    <i className="far fa-edit editIcon"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <SimpleModal
        show={show}
        handleClose={() => handleClose()}
        modalTitle={"Certificate Type Edit"}
      >
        <IssueAuthorityEdit editData={editItem} />
      </SimpleModal>
    </>
  );
};

export default IssueAuthorityList;
