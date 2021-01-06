import React, { Component } from "react";
import { Row, Form, Button, Col, Table, ButtonToolbar } from "react-bootstrap";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";

export default class employeInfoForm extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Employee Information">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              // onClick={productsUIProps.newProductButtonClick}
            >
              Add New
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
            <Container-fluid>
              <Row>
                <Col lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="search" placeholder="Search" />
                  </Form.Group>
                </Col>

                <Col lg={3}>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                      Status
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Col>

                <Col lg={3}>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                      Type
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Button variant="secondary" size="lg">
                    Search
                  </Button>
                </Col>
              </Row>

              <Row>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        <Checkbox />
                      </th>
                      <th>SL</th>
                      <th>Employee Name</th>
                      <th>Business Unit</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Joining Date</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {" "}
                        <Checkbox />{" "}
                      </td>
                      <td>01</td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>
                        <Button variant="success" size="sm">
                          Approved
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <VisibilityIcon /> <EditIcon />{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <Checkbox />{" "}
                      </td>
                      <td>01</td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>
                        <Button variant="success" size="sm">
                          Approved
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <VisibilityIcon /> <EditIcon />{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <Checkbox />{" "}
                      </td>
                      <td>01</td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>
                        <Button variant="success" size="sm">
                          Approved
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <VisibilityIcon /> <EditIcon />{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <Checkbox />{" "}
                      </td>
                      <td>01</td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>
                        <Button variant="success" size="sm">
                          Approved
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <VisibilityIcon /> <EditIcon />{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <Checkbox />{" "}
                      </td>
                      <td>01</td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>
                        <Button variant="success" size="sm">
                          Approved
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <VisibilityIcon /> <EditIcon />{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <Checkbox />{" "}
                      </td>
                      <td>01</td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>Lorem ipsum </td>
                      <td>
                        <Button variant="success" size="sm">
                          Approved
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <VisibilityIcon /> <EditIcon />{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Container-fluid>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
