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
// import CertificateTypeEdit from "../edit/CertificateTypeEdit";
// import { getCertificateTypeList } from "../../_redux/actions/CertificateTypeAction";
import { useDispatch, useSelector } from "react-redux";
import { getCertificateTypeList } from "../../../certificate-types/_redux/actions/CertificateTypeAction";
import { getCertificateMasterList } from "../../_redux/actions/CertificateListAction";

const CertificateMasterFilterList = () => {
  const dispatch = useDispatch();
  const certificateMasterData = useSelector(
    (state) => state.CertificateListReducer.certificateMasterList
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispatch(getCertificateMasterList());
  }, []);
  console.log("certificateMasterData", certificateMasterData);
  return (
    <div className="react-bootstrap-table table-responsive">
      <table className="table mt-2 tbl-standard" id="table-to-xls">
        <thead>
          <tr>
            <th scope="col">Certificate Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Vessel Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {certificateMasterData &&
            certificateMasterData.map((item, index) => (
              <tr>
                <td>{item.strCertificateName}</td>
                <td>{item.strCertificateCategoriName}</td>
                <td>{item.strVesselName}</td>
                <td>{item.isActive ? "Active" : "Inactive"}</td>
                <td>
                  {" "}
                  <Link to={``}>
                    <i className="far fa-eye mr-3"></i>
                  </Link>
                  <i className="far fa-edit ml-2" onClick={handleShow}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal
        size="lg"
        show={show}
        // onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Certificate Master Edit</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>{<CertificateTypeEdit />}</Modal.Body> */}
        <Modal.Footer>
          <Button
            variant="secondary"
            // onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CertificateMasterFilterList;
