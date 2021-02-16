import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertificateMasterList } from "../../_redux/actions/CertificateListAction";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateMasterEdit from "../edit/CertificateMasterEdit";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";

const CertificateMasterList = () => {
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const modalEditStatus = useSelector(
    (state) => state.CertificateListReducer.editStatus
  );
  const isLoading = useSelector(
    (state) => state.CertificateListReducer.isLoading
  );

  const dispatch = useDispatch();
  const certificateMasterData = useSelector(
    (state) => state.CertificateListReducer.certificateMasterList
  );

  const certificateMasterPaginatedData = useSelector(
    (state) => state.CertificateListReducer.certificateMasterPaginatedData
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (editItem) => {
    setEditItem(editItem);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getCertificateMasterList("", "", currentPage));
    if (modalEditStatus) {
      setShow(false);
    }
  }, [dispatch, currentPage, modalEditStatus]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateMasterList("", "", data.page));
  };

  return (
    <>
      {isLoading && (
        <div className="mt-5">
          <LoadingSpinner text="Loading Master Certificate..." />
        </div>
      )}
      {!isLoading && certificateMasterData.length === 0 && (
        <div className="alert alert-warning mt-5">
          Sorry ! No Master Certificate Found.
        </div>
      )}
      {!isLoading && certificateMasterData.length > 0 && (
        <>
          <div className="react-bootstrap-table table-responsive">
            <table className="table mt-4 tbl-standard" id="table-to-xls">
              <thead>
                <tr>
                  <th scope="col">Certificate Name</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {certificateMasterData &&
                  certificateMasterData.map((item, index) => (
                    <tr>
                      <td>{item.strCertificateName}</td>
                      <td>{item.strCertificateCategoryName}</td>
                      <td>{item.isActive ? "Active" : "Inactive"}</td>
                      <td>
                        {" "}
                        <a>
                          <i
                            className="far fa-edit editIcon ml-2"
                            onClick={() => handleEdit(item)}
                          ></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationLaravel
              isDescription={true}
              changePage={changePage}
              data={certificateMasterPaginatedData}
            />

            <SimpleModal
              show={show}
              size="lg"
              handleClose={() => handleClose()}
              modalTitle={"Certificate Master Edit"}
            >
              <CertificateMasterEdit editData={editItem}/>
            </SimpleModal>
          </div>
        </>
      )}
    </>
  );
};

export default CertificateMasterList;
