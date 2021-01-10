import React, { useEffect, useState } from "react";
import { Form, Button, Image, Col, Row, Table, Dropdown } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import CertificateTypeEdit from "../edit/CertificateTypeEdit";
import { getCertificateTypeList } from "../../_redux/actions/CertificateTypeAction";
import { useDispatch, useSelector } from "react-redux";

const CertificateTypeList = () => {


    const dispatch = useDispatch();
    const certificateTypeData = useSelector((state) => state.certificateTypeInfo.certificateTypeList);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        dispatch(getCertificateTypeList());
    }, []);

    return (
        <div className="react-bootstrap-table table-responsive">
            <table className="table mt-2 tbl-standard" id="table-to-xls">
                <thead>
                    <tr>
                        <th scope="col">Certificate Type</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Created Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {certificateTypeData &&
                        certificateTypeData.map((item, index) => (
                            <tr>
                                <td>{item.strCertificateTypeName}</td>
                                <td>{item.intActionBy}</td>
                                <td>{item.dteLastActionDateTime}</td>
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
