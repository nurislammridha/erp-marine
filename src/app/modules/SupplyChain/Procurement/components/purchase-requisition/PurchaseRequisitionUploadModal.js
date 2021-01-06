import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import DemoExampleFileLink from './DemoExampleFileLink';

const PurchaseRequisitionUploadModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Demo Excel File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr>
                                <th>Item ID</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1001</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1002</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>

                    <DemoExampleFileLink downloadLink={true} props={props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PurchaseRequisitionUploadModal;