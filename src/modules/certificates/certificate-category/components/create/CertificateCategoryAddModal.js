import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CertificateCategoryAdd from './CertificateCategoryAdd';

const CertificateCategoryAddModal = (props) => {
    const { show, handleClose, handleShow } = props;

    return (
        <Modal
            onClose={handleClose}
            size="md"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Certificate Category</Modal.Title>
                <p className="btn-modal-close" onClick={() => handleClose()}>
                    <i className="fa fa-times text-danger" ></i>
                </p>
            </Modal.Header>
            <Modal.Body>{<CertificateCategoryAdd />}</Modal.Body>
        </Modal>
    );
}

export default CertificateCategoryAddModal;