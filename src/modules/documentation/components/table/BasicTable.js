import React, { useEffect, useState } from "react";

import { Form, Card, Button, Row, Col } from "react-bootstrap";

const BasicTable = () => {
  return (
    <Card>
      <Card.Body>
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
  );
};

export default BasicTable;
