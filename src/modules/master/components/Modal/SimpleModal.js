import React from 'react';
import Modal from 'react-bootstrap/Modal';

const SimpleModal = (props) => {
    const { show, showLoadingPortModal, handleClose, handleShow, size, modalTitle, handleCloseLoadingPortModal } = props;

    return (
        <Modal
            onClose={handleClose ? handleClose : handleCloseLoadingPortModal }
            size={size}
            show={show ? show : showLoadingPortModal}
            onHide={handleClose ? handleClose : handleCloseLoadingPortModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
                <p className="btn-modal-close" onClick={() => handleClose ? handleClose() : handleCloseLoadingPortModal()}>
                    <i className="fa fa-times text-danger" ></i>
                </p>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}

export default SimpleModal;