import React, { useEffect, useState } from "react";
import { Form, Button, Image, Col, Row, Table, Dropdown } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCertificateMasterList } from "../../_redux/actions/CertificateListAction";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateMasterEdit from "../edit/CertificateMasterEdit";

const CertificateMasterList = () => {

    const [show, setShow] = useState(false);
    const [editItem, setEditItem] = useState({});
    const modalEditStatus = useSelector(
        (state) => state.CertificateListReducer.editStatus
      );

    const dispatch = useDispatch();
    const certificateMasterData = useSelector((state) => state.CertificateListReducer.certificateMasterList);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (editItem) => {
        setEditItem(editItem);
        setShow(true);
      };


    useEffect(() => {
          dispatch(getCertificateMasterList());
          if (modalEditStatus) {
            setShow(false);
          }
      }, [dispatch, modalEditStatus]);

    return (
        <div className="react-bootstrap-table table-responsive">
            <SimpleModal
            show={show}
            handleClose={() => handleClose()}
            modalTitle={"Edit Issue Authority"}
            >         
            <CertificateMasterEdit editData={editItem} />
            </SimpleModal>
            
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
                                <td>{item.strCertificateCategoryName}</td>
                                <td>{item.strVesselName}</td>
                                <td>{item.isActive ? "Active" : "Inactive"}</td>
                                <td>
                                    {" "}
                                    <i className="far fa-edit editIcon ml-2" 
                                    onClick={() => {
                                    handleEdit(item);
                                    }}>
                                    </i>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CertificateMasterList;
