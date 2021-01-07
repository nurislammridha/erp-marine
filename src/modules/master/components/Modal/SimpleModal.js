import React from 'react';
import Modal from 'react-bootstrap/Modal';

const SimpleModal = (props) => {
    const { show, handleClose, handleShow, size, modalTitle } = props;

    return (
        <Modal
            onClose={handleClose}
            size={size}
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                <p className="btn-modal-close" onClick={() => handleClose()}>
                    <i className="fa fa-times text-danger" ></i>
                </p>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}

export default SimpleModal;