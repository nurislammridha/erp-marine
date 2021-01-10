import React, { useEffect, useState } from "react";
import { Form, Button, Image, Col, Row, Table, Dropdown } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CertificateCategoryEdit from '../edit/CertificateCategoryEdit'
import { getCertificateCategoryListData, setCertificateCategoryEditValue } from "../../_redux/actions/CertificateCategoryAction";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
// import CertificateCategoryEdit from "../edit/CertificateCategoryEdit";



const CertificateCategoryList = () => {

    const dispatch = useDispatch();
    const certificateCategoryData = useSelector((state) => state.CertificateCategoryReducer.certificateCategoryList);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editItem, setEditItem] = useState({});

    useEffect(() => {

        dispatch(getCertificateCategoryListData());
    }, []);

    const handleEdit = (editItem) => {
        console.log('editItem', editItem);
        setEditItem(editItem);
        setShow(true);
        dispatch(setCertificateCategoryEditValue(editItem));
    };

    return (
        <div className="react-bootstrap-table table-responsive">
        <SimpleModal
            show={show}
            handleClose={() => handleClose()}
            modalTitle={"Edit Certificate Category"}
        >
                          
            <CertificateCategoryEdit  />
                    
        </SimpleModal>
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
                            {/*<td>
                                {" "}
                                <Link to={``}>
                                    <i className="far fa-eye mr-3"></i>
                                </Link>
                                <i className="far fa-edit ml-2" onClick={handleShow}></i>

                            </td>*/}
                            <td>
                            <a
                              className="btn btn-icon btn-light btn-hover-info btn-sm"
                              onClick={() => {
                                handleEdit(item);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </a>
                          </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
    );
};

export default CertificateCategoryList;
