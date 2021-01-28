import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

const RolePermissionList = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-custom gutter-b p-5">
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row mt-2">
                  <div className="col-7 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">
                        Role Name
                      </Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="Type"
                        name="strSupplierAddress"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <div className="col-6 ">
                    <p>Permission</p>
                  </div>
                  <div className="col-6 ">
                    <Form.Group controlId="all">
                      <Form.Check type="checkbox" label="All" for="all" />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-6 ">
                    <Form.Group controlId="supplier">
                      <Form.Check
                        type="checkbox"
                        label="Supplier"
                        for="supplier"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6 ">
                    <Form.Group controlId="Create">
                      <Form.Check type="checkbox" label="Create" for="Create" />
                    </Form.Group>
                    <Form.Group controlId="list">
                      <Form.Check type="checkbox" label="List" for="list" />
                    </Form.Group>
                    <Form.Group controlId="edit">
                      <Form.Check type="checkbox" label="Edit" for="Approve" />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-6 ">
                    <Form.Group controlId="purchase">
                      <Form.Check
                        type="checkbox"
                        label="Purchase"
                        for="purchase"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6 ">
                    <Form.Group controlId="Create">
                      <Form.Check type="checkbox" label="Create" for="Create" />
                    </Form.Group>
                    <Form.Group controlId="list">
                      <Form.Check type="checkbox" label="List" for="list" />
                    </Form.Group>
                    <Form.Group controlId="Approve">
                      <Form.Check
                        type="checkbox"
                        label="Approve"
                        for="Approve"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-6 ">
                    <Form.Group controlId="customer">
                      <Form.Check
                        type="checkbox"
                        label="Customer"
                        for="customer"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-6 ">
                    <Form.Group controlId="Create">
                      <Form.Check type="checkbox" label="Create" for="Create" />
                    </Form.Group>
                    <Form.Group controlId="list">
                      <Form.Check type="checkbox" label="List" for="list" />
                    </Form.Group>
                    <Form.Group controlId="edit">
                      <Form.Check type="checkbox" label="Edit" for="edit" />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-6 ">
                    <Form.Group controlId="user">
                      <Form.Check type="checkbox" label="User" for="user" />
                    </Form.Group>
                  </div>
                  <div className="col-6 ">
                    <Form.Group controlId="Create">
                      <Form.Check type="checkbox" label="Create" for="Create" />
                    </Form.Group>
                    <Form.Group controlId="list">
                      <Form.Check type="checkbox" label="List" for="list" />
                    </Form.Group>
                    <Form.Group controlId="edit">
                      <Form.Check type="checkbox" label="Edit" for="edit" />
                    </Form.Group>
                  </div>
                </div>
                <button className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePermissionList;
