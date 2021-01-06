import React from "react";
import { Form, Row, Col } from "react-bootstrap";
const AuxEngineOne = (props) => {
  return (
    <form className="form form-label-right voyageEngineerForm" method="post">
      <div className="form-group row">
        <div className="col-lg-5">
          <div>
            <p className="text-uppercase text-bold mt-3">
              Main Engine (Temperature)
            </p>
          </div>
          <div className="border-top mb-3"></div>

          <Form.Group as={Row}>
            <Form.Label column sm="5">
              T/C RPM
            </Form.Label>
            <Col sm="7">
              <Form.Control type="" placeholder="0" />
            </Col>
          </Form.Group>
        </div>
      </div>
    </form>
  );
};

export default AuxEngineOne;
