import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Table,
  Dropdown,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CertificateCategoryEdit from "../edit/CertificateCategoryEdit";
import { getCertificateCategoryListData } from "../../_redux/actions/CertificateCategoryAction";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";
import PaginationLaravel from "../../../../master/pagination/PaginationLaravel";

const CertificateCategoryList = () => {
  const dispatch = useDispatch();
  const certificateCategoryData = useSelector(
    (state) => state.CertificateCategoryReducer.certificateCategoryList
  );
  const isLoading = useSelector(
    (state) => state.CertificateCategoryReducer.isLoading
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const certificatesPaginatedData = useSelector(
    (state) => state.CertificateCategoryReducer.certificatesPaginatedData
  );
  console.log("certificatesPaginatedData", certificatesPaginatedData);
  useEffect(() => {
    dispatch(getCertificateCategoryListData(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCertificateCategoryListData(data.page));
  };

  useEffect(() => {
    dispatch(getCertificateCategoryListData());
  }, []);

  return (
    <div>
      <div>
        <div className="float-right">
          <PaginationLaravel
            isDescription={false}
            changePage={changePage}
            data={certificatesPaginatedData}
          />
        </div>
      </div>
      {isLoading && <LoadingSpinner text="Loading Certificate Categories..." />}
      {!isLoading && certificateCategoryData.length === 0 && (
        <div className="alert alert-warning">
          Sorry ! No Certificate gategories Found.
        </div>
      )}
      {!isLoading && certificateCategoryData.length > 0 && (
        <>
          <div className="react-bootstrap-table table-responsive">
            <table className="table mt-2 tbl-standard" id="table-to-xls">
              <thead>
                <tr>
                  <th scope="col">Certificate Type</th>
                  <th scope="col">Action By</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {certificateCategoryData &&
                  certificateCategoryData.map((item, index) => (
                    <tr>
                      <td>{item.strCertificateCategoriName}</td>
                      <td>{item.intActionBy}</td>
                      <td>{item.isActive ? "Active" : "Inactive"}</td>
                      <td>
                        {" "}
                        <Link to={``}>
                          <i className="far fa-eye mr-3"></i>
                        </Link>
                        <i
                          className="far fa-edit ml-2"
                          onClick={handleShow}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationLaravel
              changePage={changePage}
              data={certificatesPaginatedData}
            />

            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Certificate Category Edit</Modal.Title>
              </Modal.Header>
              <Modal.Body>{<CertificateCategoryEdit />}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateCategoryList;
