import * as React from "react";
import { Form, Card, Button, Row, Col, InputGroup } from "react-bootstrap";
// import { DateRangePickerWrapper } from "storybook";
// import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";

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
                  <Form.Control className="formSelect" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>

            {/* <Form.Group className="mt-3" controlId="formBasicChecbox">
                <Form.Check type="checkbox" />
              </Form.Group>

              <Form.Check className="mt-3" type="radio" aria-label="radio 1" /> */}
            {/* 
              <div className="col-xl-4 col-lg-4 col-md-6 ">
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
              </div> */}
            {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="formFont pl-1">
                  Example textarea
                </Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group> */}
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6">
                <Form.Group>
                  <Form.Label className="formFont pl-1">Search</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="search"
                    placeholder="Search"
                  />
                </Form.Group>
              </div>
              <div className="">
                <Form.Group as={Col} md="" controlId="">
                  <Form.Label className="formFont">Pic an image</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        id="inputGroupPrepend"
                        className="formHeight"
                      >
                        <p className="chooseFileText">Choose File</p>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      placeholder="No file chosen"
                      aria-describedby="inputGroupPrepend"
                      required
                      className="bg-white fileInput "
                    />
                    <Form.Control.Feedback type="invalid" className="bg-white">
                      No file chosen
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <Form.Check className="mt-3" type="radio" aria-label="radio 1" />
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Checkbox
              // icon={<Icon.FiCheck color="#174A41" size={14} />}
              name="my-input"
              checked={false}
              onChange={(value) => {
                let p = {
                  isTrue: value,
                };
                return alert(value);
              }}
              borderColor="#fff"
              style={{ cursor: "pointer", backgroundColor: "#E5E5E5" }}
              labelStyle={{ marginLeft: 5, userSelect: "none" }}
              label="custome checkbox"
            />

            <div className="mt-5">
              <Button className="mr-4  saveButton text-white" variant="">
                Save
              </Button>
              <Button className=" cancelButton " variant="">
                Cancel
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default BasicForm;
