import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const SimpleModal = (props) => {
    const { show, showLoadingPortModal, handleClose, handleShow, size, modalTitle, handleCloseLoadingPortModal, status, vesselBookingID } = props;

    return (
        <Modal
            onClose={handleClose ? handleClose : handleCloseLoadingPortModal}
            size={size}
            show={show ? show : showLoadingPortModal}
            onHide={handleClose ? handleClose : handleCloseLoadingPortModal} >
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        status && (
                            <div className="row custom-modal">
                                <div className="col-6">{modalTitle}
                                <Badge className="ml-2" variant="success">Booking ID : #{vesselBookingID}</Badge>
                                </div>
                                <div className="col-6">
                                    <Button className="btn approve booking-list-btn text-warning float-right">Penging</Button>
                                </div>
                            </div>
                        )}
                    {
                        !status && modalTitle
                    }
                </Modal.Title>
                <p className="btn-modal-close" onClick={() => handleClose ? handleClose() : handleCloseLoadingPortModal()}>
                    <i className="fa fa-times text-danger" ></i>
                </p>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}

export default SimpleModal;