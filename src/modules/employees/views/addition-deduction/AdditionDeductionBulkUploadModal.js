import React from "react";
import { Modal, Button } from "react-bootstrap";
import DemoAdditionDeductionFile from "./DemoAdditionDeductionFile";

const AdditionDeductionBulkUploadModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Demo Excel File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table table-responsive">
            <table className="table table-bordered">
              <thead className="bg-secondary">
                <tr>
                  <th>Officer's Name</th>
                  <th>Rank</th>
                  <th>P.P.No</th>
                  <th>Wages Month</th>
                  <th>No Days</th>
                  <th>Earning Of The Month </th>
                  <th>Previous Balance</th>
                  <th>Add'I Earning</th>
                  <th>Total Earning</th>
                  <th>Advance on Board</th>
                  <th>F B B Calling Card</th>
                  <th>Bonded Items</th>
                  <th>Joining advance</th>
                  <th>Total Deduction</th>
                  <th>Payable Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sultan Salauddin Aziz</td>
                  <td>Master</td>
                  <td>EE0226324</td>
                  <td> 8,600 </td>
                  <td>30</td>
                  <td> 8,600.00</td>
                  <td>30</td>
                  <td>8,600.00 </td>
                  <td>800.00</td>
                  <td>0.00</td>
                  <td>3.38</td>
                  <td>0</td>
                  <td>803.38 </td>
                  <td> 7,796.62 </td>
                </tr>
                <tr>
                  <td>Sultan Salauddin Aziz</td>
                  <td>Master</td>
                  <td>EE0226324</td>
                  <td> 8,600 </td>
                  <td>30</td>
                  <td> 8,600.00</td>
                  <td>30</td>
                  <td>8,600.00 </td>
                  <td>800.00</td>
                  <td>0.00</td>
                  <td>3.38</td>
                  <td>0</td>
                  <td>803.38 </td>
                  <td> 7,796.62 </td>
                </tr>
              </tbody>
            </table>
          </div>

          <DemoAdditionDeductionFile downloadLink={true} props={props} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdditionDeductionBulkUploadModal;
