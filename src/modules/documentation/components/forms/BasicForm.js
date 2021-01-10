import * as React from "react";
import { Form, Card, Button, Row, Col, InputGroup } from "react-bootstrap";
// import { DateRangePickerWrapper } from "storybook";

const BasicForm = () => {
  return (
    <>
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
            <div className="row mt-5">
              <Form.Group className="mt-3" controlId="formBasicChecbox">
                <Form.Check type="checkbox" />
              </Form.Group>

              <Form.Check className="mt-3" type="radio" aria-label="radio 1" />

              <div className="col-lg-3 col-md-6 col-10">
                <Form.Group as={Row} controlId="">
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
                <Form.Label className="formFont pl-1">
                  Example textarea
                </Form.Label>
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
            <Form.Group as={Col} md="4" controlId="">
              <Form.Label>Pic an image</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i class="fas fa-download"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Upload Vessel images"
                  aria-describedby="inputGroupPrepend"
                  required
                  className="bg-white "
                />
                <Form.Control.Feedback type="invalid" className="bg-white">
                  Upload Vessel images
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
        </Card.Body>
      </Card>
    </>
  );
};

export default BasicForm;
