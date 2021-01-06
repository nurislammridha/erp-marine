import React, { useEffect, useState } from "react";
import { Form, Button, Image, Col, Row, Table, Dropdown } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import CertificateTypeEdit from "../edit/CertificateTypeEdit";
// import { GetVoyageList } from "../../../_redux/actions/VoyageAction";


const CertificateTypeList = () => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="react-bootstrap-table table-responsive">
            <table className="table mt-2 tbl-standard" id="table-to-xls">
                <thead>
                    <tr>
                        <th scope="col">Certificate Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SSC</td>
                        <td>Active</td>
                        <td>
                            {" "}
                            <Link to={``}>
                                <i className="far fa-eye mr-3"></i>
                            </Link>
                            <Button className="" onClick={handleShow}>
                                <i className="far fa-edit"></i>
                            </Button>

                        </td>
                    </tr>
                    <tr>
                        <td>HSC</td>
                        <td>Active</td>
                        <td>
                            {" "}
                            <Link to={``}>
                                <i className="far fa-eye mr-3"></i>
                            </Link>


                        </td>
                    </tr>
                    <tr>
                        <td>B.Sc</td>
                        <td>Inactive</td>
                        <td>
                            {" "}
                            <Link to={``}>
                                <i className="far fa-eye mr-3"></i>
                            </Link>

                        </td>
                    </tr>

                </tbody>
            </table>

            <Modal size="lg" show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Certificate Type Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>{<CertificateTypeEdit />}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
              </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CertificateTypeList;
