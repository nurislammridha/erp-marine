import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CertificateCategoryEdit from "../edit/CertificateCategoryEdit";
import {
  getCertificateCategoryListData,
  setCertificateCategoryEditValue,
} from "../../_redux/actions/CertificateCategoryAction";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";

const CertificateCategoryList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editItem, setEditItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const certificateCategoryData = useSelector(
    (state) => state.CertificateCategoryReducer.certificateCategoryList
  );
  const modalEditStatus = useSelector(
    (state) => state.CertificateCategoryReducer.editStatus
  );
  const isLoading = useSelector(
    (state) => state.CertificateCategoryReducer.isLoading
  );

  const certificatesCategoryPaginatedData = useSelector(
    (state) =>
      state.CertificateCategoryReducer.certificatesCategoryPaginatedData
  );

  // useEffect(() => {
  //   dispatch(getCertificateCategoryListData(currentPage));
  // }, [dispatch, currentPage]);

  // const changePage = (data) => {
  //   setCurrentPage(data.page);
  //   dispatch(getCertificateCategoryListData(data.page));
  // };
  useEffect(() => {
    dispatch(getCertificateCategoryListData("", "", currentPage));
  }, [dispatch, currentPage]);


  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateCategoryListData("", "", data.page));
  };
  // const status = useSelector(
  //     (state) => state.CertificateCategoryReducer.editStatus
  // );

  // useEffect(() => {
  //     if(status){
  //         handleClose();
  //     }

  // }, []);

  useEffect(() => {
    if (modalEditStatus) {
      setShow(false);
    }
  }, [modalEditStatus]);

  const handleEdit = (editItem) => {
    setEditItem(editItem);
    setShow(true);
  };

  // const handleEdit = (data) => {

  //     setEditItem(data);
  //     setShow(true);
  //     dispatch(setCertificateCategoryEditValue(data));
  // };

  return (
    <>
      {isLoading && (
        <div className="mt-5">
          <LoadingSpinner text="Loading Certificate Category..." />
        </div>
      )}
      {!isLoading && certificateCategoryData.length === 0 && (
        <div className="alert alert-warning mt-5">
          Sorry ! No Certificate category Found.
        </div>
      )}
      {!isLoading && certificateCategoryData.length > 0 && (
        <>
          <div className="react-bootstrap-table table-responsive">
            <table className="table mt-2 tbl-standard" id="table-to-xls">
              <thead>
                <tr>
                  {/* <th scope="col">
                    {" "}
                    <Form.Check type="checkbox" />
                  </th> */}

                  <th scope="col">Category Name</th>
                  <th scope="col">Parent Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {certificateCategoryData &&
                  certificateCategoryData.map((item, index) => (
                    <tr>
                      <td>{item.strCertificateCategoryName}</td>
                      <td>
                        {item.intParentsCategoryID != 0
                          ? item.parentCategoryName
                          : ""}
                      </td>
                      <td>{item.isActive === "1" ? "Active" : "Inactive"}</td>
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
              data={certificatesCategoryPaginatedData}
            />
            <SimpleModal
              show={show}
              handleClose={() => handleClose()}
              modalTitle={"Edit Certificate Category"}
            >
              <CertificateCategoryEdit editData={editItem} />
            </SimpleModal>
          </div>
        </>
      )}
    </>
  );
};

export default CertificateCategoryList;
