import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const NewUser = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <h1>Create New User </h1>
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Admin Name
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Admin Email
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Password
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Username"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Password"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Assign Roles
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Admin Username
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Enter Username"
                      />
                    </Form.Group>
                  </div>
                </div>
                <Button className="mr-4  saveButton text-white" variant="">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
