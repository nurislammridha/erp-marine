import React, { Component } from "react";
import { Row, Form, Button, Col, Table, ButtonToolbar } from "react-bootstrap";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";

import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default class PurchaseForm extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Purchse">
          <CardHeaderToolbar></CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
            <Container-fluid>
              <Row>
                <Col lg={4}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Type" />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="email" placeholder="Type Address" />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Number of employee</Form.Label>
                    <Form.Control as="select">
                      <option>Arabic</option>
                      <option>English</option>
                      <option>Bangla</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label> Base Currency </Form.Label>
                    <Form.Control type="text" placeholder="Type" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {" "}
                <div className="borderGap"> </div>{" "}
              </Row>

              <Row>
                <Col lg={4}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label> Base Currency </Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Button variant="primary" size="sm" className="ml-1 mt-8">
                    <AddIcon />
                    Add
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col lg={6}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Module Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Sales Order</td>
                        <td>
                          {" "}
                          <HighlightOffIcon />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>Sales Order</td>
                        <td>
                          {" "}
                          <HighlightOffIcon />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>Sales Order</td>
                        <td>
                          {" "}
                          <HighlightOffIcon />{" "}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                {" "}
                <div className="borderGap"> </div>{" "}
              </Row>
              <Row>
                <ButtonToolbar>
                  <Button variant="secondary" size="lg">
                    Cancel
                  </Button>
                  {}
                  <Button variant="primary" size="lg" className="ml-3">
                    Save
                  </Button>
                </ButtonToolbar>
              </Row>
            </Container-fluid>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
