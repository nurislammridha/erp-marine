import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIssuingAuthorities, issueAuthorityDelete } from "../../_redux/actions/CertificateIssueAuthorityAction";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import IssueAuthorityEdit from "../edit/IssueAuthorityEdit";
import CertificateTypeEdit from "../../../certificate-types/components/edit/CertificateTypeEdit";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";
import { confirmAlert } from "react-confirm-alert";

const IssueAuthorityList = (props) => {
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const modalEditStatus = useSelector( (state) => state.certificateIssueAuthorityInfo.editStatus);

  const isLoading = useSelector((state) => state.certificateIssueAuthorityInfo.isLoading);
  const issuingAuthorities = useSelector((state) => state.certificateIssueAuthorityInfo.issuingAuthorities);
  const issuingAuthoritiesData = useSelector((state) => state.certificateIssueAuthorityInfo.issuingAuthoritiesData);

  const issuingAuthoritiesPaginatedData = useSelector((state) =>state.certificateIssueAuthorityInfo.issuingAuthoritiesPaginatedData);

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

  const handleEdit = (editItem) => {
    setEditItem(editItem);
    setShow(true);
  };

  // delete issuing authority list 
  const confirmDelete = (id) => {
    dispatch(issueAuthorityDelete(id));
    dispatch(getIssuingAuthorities("", "", currentPage));
  }
  
  const deleteIssuingAuthority = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete..?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(id),
        },
        {
          label: "No"
        }
      ]
    });
  };
 
  return (
    <>
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
                {issuingAuthorities &&
                  issuingAuthorities.map((item, index) => (
                    <tr>
                      <td>{issuingAuthoritiesPaginatedData.from + index}</td>
                      <td>{item.strIssuingAuthorityName}</td>
                      <td>{item.isActive === "1" ? "Active" : "Inactive"}</td>
                      <td>
                        <i
                          className="far fa-edit pointer editIcon"
                          onClick={() => handleEdit(item)}
                        ></i>
                        <i className="fas fa-trash-alt editIcon ml-2 pointer" onClick={(id) => deleteIssuingAuthority(item.intIssuingAuthorityID)}></i>
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
