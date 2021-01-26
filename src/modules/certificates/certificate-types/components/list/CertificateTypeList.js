import React, { useEffect, useState } from "react";
import CertificateTypeEdit from "../edit/CertificateTypeEdit";
import {
  EditCertificateTypeList,
  getCertificateTypeList,
} from "../../_redux/actions/CertificateTypeAction";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";

const CertificateTypeList = (props) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(15);
  const certificateTypeData = useSelector(
    (state) => state.certificateTypeInfo.certificateTypeList
  );
  const modalStatus = useSelector(
    (state) => state.certificateTypeInfo.editStatus
  );
  const isLoading = useSelector((state) => state.certificateTypeInfo.isLoading);

  const certificateTypePaginatedData = useSelector(
    (state) => state.certificateTypeInfo.certificateTypePaginatedData
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getCertificateTypeList("", "", currentPage));
    if (modalStatus) {
      setShow(false);
    }
  }, [dispatch, currentPage, modalStatus]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateTypeList("", "", data.page));
  };

  const handlegetEdit = (data) => {
    handleShow();
    dispatch(EditCertificateTypeList(data));
  };

  return (
    <>
      {isLoading && (
        <div className="mt-5">
          <LoadingSpinner text="Loading Certificate Type..." />
        </div>
      )}
      {!isLoading && certificateTypeData.length === 0 && (
        <div className="alert alert-warning mt-5">
          Sorry ! No Certificate Type Found.
        </div>
      )}
      {!isLoading && certificateTypeData.length > 0 && (
        <>
          <div className="react-bootstrap-table table-responsive pr-7">
            <table className="table mt-2 tbl-standard">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Certificate Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {certificateTypeData &&
                  certificateTypeData.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.strCertificateTypeName}</td>
                      <td>{item.isActive === "1" ? "Active" : "Inactive"}</td>
                      <td className="mt-3">
                        <a>
                          <i
                            className="far fa-edit editIcon"
                            onClick={() =>
                              handlegetEdit(item.intCertificateTypeID)
                            }
                          ></i>
                        </a>
                        {/* <i className="fas fa-trash-alt editIcon ml-4"></i> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationLaravel
              isDescription={true}
              changePage={changePage}
              data={certificateTypePaginatedData}
            />
            <SimpleModal
              show={show}
              handleClose={() => handleClose()}
              modalTitle={"Certificate Type Edit"}
            >
              <CertificateTypeEdit />
            </SimpleModal>
          </div>
        </>
      )}
    </>
  );
};

export default CertificateTypeList;


{/* <div className="react-bootstrap-table table-responsive pr-7">
<table className="table mt-2 tbl-standard voyageTable" id="table-to-xls">
    <thead>
        <tr>
            <th scope="col">No</th>
            <th scope="col">Certificate Type</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
        </tr>
    </thead> */}
