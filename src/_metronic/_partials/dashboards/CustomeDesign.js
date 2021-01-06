import React, { useEffect, useState } from "react";

import { Form, Card, Button, Row, Col } from "react-bootstrap";

const CustomeDesign = () => {
  return (
    <Card>
      <Card.Body>
        <form
          className="form form-label-right voyageEngineerForm"
          method="post"
        >
          <div className="form-group row">
            <div className="col-xl-3 col-lg-3 col-md-6 ">
              <Form.Group>
                <Form.Label className="formFont pl-1">Input</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="text"
                  placeholder="Type"
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 ">
              <Form.Group>
                <Form.Label className="formFont pl-1">Date</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="date"
                  placeholder="Type"
                />
              </Form.Group>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 ">
              <Form.Group>
                <Form.Label className="formFont pl-1">Time</Form.Label>
                <Form.Control
                  className="formHeight"
                  type="time"
                  placeholder="Type"
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="formFont pl-1">
                  Example select
                </Form.Label>
                <Form.Control className="formHeight" as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>
          <Button className="mr-4 col-1 saveButton" variant="primary">
            Save
          </Button>
          <Button
            className="col-1 saveButton cancelButton text-white"
            variant="secondary"
          >
            Back
          </Button>
        </form>
        <div className="row mt-5">
          <Form.Group className="mt-3" controlId="formBasicChecbox">
            <Form.Check type="checkbox" />
          </Form.Group>

          <Form.Check className="mt-3" type="radio" aria-label="radio 1" />

          <div className="col-lg-3 col-md-6 col-10">
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label className="formFont pl-1" column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  className="formHeight"
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </Form.Group>
          </div>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="formFont pl-1">Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <div className="col-lg-3">
            <Form.Group>
              <Form.Label className="formFont pl-1">Search</Form.Label>
              <Form.Control
                className="formHeight"
                type="text"
                placeholder="Search"
              />
            </Form.Group>
          </div>
        </div>
        <table class="table table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">
                {" "}
                <Form.Check type="checkbox" />
              </th>

              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                {" "}
                <Form.Check type="checkbox" />
              </th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Active</td>
              <td className="mt-3">
                {" "}
                <i className="far fa-eye mr-3"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-edit"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {" "}
                <Form.Check type="checkbox" />
              </th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Active</td>
              <td>
                {" "}
                <i className="far fa-eye mr-3"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-edit"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {" "}
                <Form.Check type="checkbox" />
              </th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
              <td>Active</td>
              <td>
                {" "}
                <i className="far fa-eye mr-3"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-edit"></i>
                <i className="far fa-edit"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>

    // <Card>
    //   <Card.Body>

    //   </Card.Body>
    //   </Card>
  );
};

export default CustomeDesign;
