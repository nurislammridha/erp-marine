import React, { useEffect, useState } from "react";

import { Form, Card, Button, Row, Col } from "react-bootstrap";

import TableCircularProgressBar from "../../../master/components/CircularProgressBar/TableCircularProgressBar";

const BasicTable = () => {
  return (
    <Card>
      <Card.Body>
        <div className="container">
          <div className="row">
            <h1 className="tableheading">Voyage List</h1>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select">
                <option>Type</option>
                <option>A</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select">
                <option>Type</option>
                <option>A</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select">
                <option>Vessel</option>
                <option>A</option>
              </Form.Control>
            </Form.Group>
            <i className="fas fa-filter mt-3 mr-2"></i>
            <Button variant="primary">Add New</Button>
          </div>

          <table className="table mt-5 voyageTable">
            <thead>
              <tr>
                <th scope="col">
                  {" "}
                  <Form.Check type="checkbox" />
                </th>

                <th scope="col">Voyage No</th>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Port Name</th>
                <th scope="col">Vessel Name</th>
                <th scope="col">Comencement</th>
                <th scope="col">Diagram</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  {" "}
                  <Form.Check type="checkbox" />
                </th>
                <td>#01</td>
                <td>2021-01-05 00:00</td>
                <td>Container Cargo</td>
                <td>Durres(Durazzo)</td>
                <td>Akij Noor</td>
                <td>Chottogram</td>
                <td>
                  {" "}
                  <TableCircularProgressBar />
                </td>
                <td>
                  <button className="btn approve">Approved</button>
                </td>

                <td className="mt-3">
                  {" "}
                  <i className="far fa-edit editIcon"></i>
                  <i className="fas fa-trash-alt editIcon ml-4"></i>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  {" "}
                  <Form.Check type="checkbox" />
                </th>
                <td>#01</td>
                <td>2021-01-05 00:00</td>
                <td>Container Cargo</td>
                <td>Durres(Durazzo)</td>
                <td>Akij Noor</td>
                <td>Chottogram</td>
                <td>
                  {" "}
                  <TableCircularProgressBar />
                </td>
                <td>
                  <button className="btn approve">Approved</button>
                </td>

                <td className="mt-3">
                  {" "}
                  <i className="far fa-edit editIcon"></i>
                  <i className="fas fa-trash-alt editIcon ml-4"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BasicTable;
